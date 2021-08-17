// Class for running queries on postgres DVD database

import pkg from 'pg'   // note: pkg could be any name
const { Pool } = pkg

class Database {
    constructor() {
        this.pool = null;
    }

    // Create a connection pool with the database
    connect() {
        try {
            this.pool = new Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'dvdrental',
                password: 'password',
                port: 5432,
            });

            // the pool will emit an error on behalf of any idle clients
            // it contains if a backend error or network partition happens
            this.pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err)
                process.exit(-1)
            });
            
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    // Wait for all checked-out clients to be returned and 
    // then shut down all the clients and the pool timers.
    async disconnect() {
        if (this.pool !== null) {
            await this.pool.end()
            this.pool = null
        }
    }


    async get(text, values=[]) {
        try {
            const client = await this.pool.connect()
            try {
                const { rows } = await client.query(text, values)
                return rows
            } catch (err) {
                console.log(err.stack)
                throw err
            
            } finally {
                client.release()
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    }


    async getTime() {
        const rows = await this.get('SELECT NOW()')
        return rows[0].now
    }

    
    async getFilmInfo(id = 1) {
        const query = `
        SELECT title, description 
        FROM film
        WHERE film_id < $1`;

        const value = [id];

        return await this.get(query, value);
    }

    async getMoviesTitle({ title }) {
        // Create list of single words with no white space and percent signs to indicate zero or more characters.
        const values = title.split(' ').filter(str => str !== '').map(str => `%${str.trim()}%`)

        // Create 'ILIKE' comparison strings for each word in values
        let likes = 'f.title ILIKE $1'
        for (let i=2; i<=values.length; ++i) {
            likes += ` OR f.title ILIKE $${i}`
        }

        const query = `
        SELECT  f.film_id, f.title, f.description, f.release_year, f.rating, 
                f.rental_rate, f.length, c.name category 

        FROM    film f 

        INNER JOIN film_category fc
            ON f.film_id = fc.film_id 

        INNER JOIN category c 
            ON fc.category_id = c.category_id

        WHERE
            ${likes}
        `

        // console.log(likes)
        // console.log('values: ', values)

        return await this.get(query, values)
    }


    async getMoviesActor({ actor }) {
        const query = `
        SELECT  f.film_id, f.title, f.description, f.release_year, f.rating, 
                f.rental_rate, f.length, c.name category 

        FROM    film f 

        INNER JOIN film_actor fa
            ON f.film_id = fa.film_id

        INNER JOIN actor a
            ON fa.actor_id = a.actor_id

        INNER JOIN film_category fc
            ON f.film_id = fc.film_id 

        INNER JOIN category c 
            ON fc.category_id = c.category_id

        WHERE a.first_name = $1 AND a.last_name = $2`

        const values = actor.split(' ')

        return await this.get(query, values)
    }


    async getMoviesCategory({ category }) {
        const query = `
        SELECT  f.film_id, f.title, f.description, f.release_year, f.rating, 
                f.rental_rate, f.length, c.name category 

        FROM    film f 

        INNER JOIN film_category fc
            ON f.film_id = fc.film_id 

        INNER JOIN category c 
            ON fc.category_id = c.category_id
        
        WHERE   fc.category_id = (
                    SELECT category_id 
                    FROM category 
                    WHERE name = $1 )`

        const value = [category]

        return await this.get(query, value)
    }


    async getAllCategories() {
        const query = 'SELECT category_id, name FROM category'
        return this.get(query)
    }


    async getAllActors() {
        const query = 'SELECT actor_id, first_name, last_name FROM actor'
        return this.get(query)
    }


}

export default Database