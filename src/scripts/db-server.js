// A server for handling database API calls from DVD-Rental App

import DataBase from './Database.js'
import express from 'express'


// Setup database connection
const db = new DataBase()

try {
    db.connect()
} catch (err) {
    console.log('Error occured connecting to database.', err)
    process.exit(-1)
}


// On kill signals, try to shut down nicely.
async function shutdown(signal) {
    await db.disconnect() 
    console.log(`  Database server, "db-server.js" shut down after receiving signal: ${signal}.`)
    process.exit(0)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)


// Just a little test to see if things are working on startup.
;(async () => {
    try {
        const now = await db.getTime()
        console.log('the time is:', now)
    } catch (err) {
        console.log(err)
    }
})()



// Setup server
const app = express();
const port = 4000;

app.use(express.json()); //Used to parse JSON bodies


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
  });
  
  

// Setup GET Routes  //

app.get('/api/movies/category/:category', async (req, res) => {
    const filmList = await db.getMoviesCategory(req.params)
    res.send(filmList)
});

app.get('/api/movies/title/:title', async (req, res) => {
    const filmList = await db.getMoviesTitle(req.params)
    res.send(filmList)
});

app.get('/api/movies/actor/:actor', async (req, res) => {
    const filmList = await db.getMoviesActor(req.params)
    res.send(filmList)
});

app.get('/api/category/all', async (req, res) => {
    const categories = await db.getAllCategories()
    res.send(categories)
});

app.get('/api/actor/all', async (req, res) => {
    const actors = await db.getAllActors()
    res.send(actors)
});



// Setup POST Routes  //

app.post('/api/movies', async (req, res) => {
    const movie = await db.updateMovie(req.body)
    res.json(movie[0])
});

