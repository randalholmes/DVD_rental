// Class for running queries on postgres DVD database

import pkg from 'pg'   
const { Pool } = pkg

class Database {
    constructor() {
        this.pool = null;
    }

    // Create a connection pool with the database.
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
            // it contains if a backend error or network partition happens.
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


    // Single access point for executing database queries.
    // Eliminates redundant code.
    async execute(query, values=[]) {
        try {
            const client = await this.pool.connect()
            try {
                const { rows } = await client.query(query, values)
                return rows
            } catch (err) {
                //console.log(err.stack)
                throw err
            
            } finally {
                client.release()
            }
        } catch (err) {
            console.log("Database Error: ", err.message)
            throw err
        }
    }


    async getTime() {
        const rows = await this.execute('SELECT NOW()')
        return rows[0].now
    }

    
    async getFilmInfo(id = 1) {
        const query = `
            SELECT title, description 
            FROM film
            WHERE film_id < $1`;

        const value = [id];

        return await this.execute(query, value);
    }


    async getMoviesTitle({ title }) {
        // Create list of single words with no white space and 
        // with percent signs to indicate zero or more characters.
        const values = title.split(' ').filter(str => str !== '').map(str => `%${str.trim()}%`)

        // Create 'ILIKE' comparison strings for each word in values.
        // Used in 'WHERE' clause in query below.
        const likes = values.map((value, index) => index ? ` OR f.title ILIKE $${index + 1}` : "f.title ILIKE $1").join("")

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
        
        return await this.execute(query, values)
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

        return await this.execute(query, values)
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

        return await this.execute(query, value)
    }


    async getAllCategories() {
        const query = 'SELECT category_id, name FROM category'
        return this.execute(query)
    }


    async getAllActors() {
        const query = 'SELECT actor_id, first_name, last_name FROM actor'
        return this.execute(query)
    }

    async getAllRatings() {
        const query = `
        SELECT 
            DISTINCT rating
        FROM film` 

        return this.execute(query)
    }

    
    async getStoreIds() {
        const query = 'SELECT store_id FROM store'
        return this.execute(query)
    }

    async getCustomersAtStore({ id }) {
        const query = `
            SELECT first_name, last_name, customer_id 
            FROM customer 
            WHERE store_id = $1 
            ORDER BY last_name, first_name
        `

        const values = [id]

        return await this.execute(query, values)
    }


    async getCustomer({ id }) {
        const query = `
            SELECT c.first_name, c.last_name, c.email, 
                   a.address, a.district, a.postal_code, a.phone, 
                   ci.city 


            FROM customer c 

            INNER JOIN address a 
                ON c.address_id = a.address_id 

            INNER JOIN city ci
                ON a.city_id = ci.city_id

            WHERE customer_id = $1 
        `

        const values = [id]

        return await this.execute(query, values)
    }

//****      DATABASE UPDATE METHODS         ****/


    async updateMovie(data) {
        const updateData = data.changedVals  // List of name/value pairs

        // Values to pass with the query
        const values = updateData.map(([ , value]) => value)

        // Create a 'SET' statement for use in the query.
        const colSet = updateData.map(([name], index) => index ? `, ${name} = $${index+1}` : `SET ${name} = $1`).join("")

        // Include movie id with values
        values.push(data.film_id)

        const query = `
        UPDATE film

        ${colSet}

        WHERE film_id = $${updateData.length + 1}

        RETURNING * 
        `
        return this.execute(query, values)
    }


}

export default Database