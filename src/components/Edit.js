// Component for editing information about movies and 
// submitting the changes to the database.

import './css/edit.css'
import { useState, useEffect } from 'react'

const Edit = ({ movie, setUpdated }) => {

    const [ratings, setRatings] = useState([])

    useEffect(() => {
        const getRatings = async () => {
            try {
                const res = await fetch('/api/ratings')
                const data = await res.json()
                
                if (res.ok) {
                    const ratings = data.map(({ rating }) => rating)
                    setRatings(ratings)
                } else {    
                    throw new Error(data.cause)
                }

            } catch(err) {
                console.log("Database Error: ", err.message)
            }
        }

        getRatings()
    }, [])


    // Clear the message box when the form is clicked anywhere but the submit button.
    const formClick = (e) => {
        if (e.target.type === 'button') return
        document.getElementById('message-box').innerText = ""
        setUpdated(false)
    }

    // Form submit-button handler
    const onSubmit = () => {
        // Create array of name/value pairs from the form input elements.
        const form = document.querySelector(".movie-edit-form")
        const formVals = Array.from(form).filter(elm => elm.type !== 'button').map(({ name, value }) => [name, value])
        
        // Determine what values if any have changed
        const changedVals = formVals.filter( ([name, value]) => value !== movie[name])

        const messageElm = document.getElementById('message-box')

        if (changedVals.length === 0) {
            messageElm.innerText = "No values have changed."
            return
        }

        // Create value object to post to the database.
        const newData = {}
        newData.changedVals = changedVals
        newData.film_id = movie.film_id

        // Post new values to the database.
        async function updateMovie() {
            try {
                const res = await fetch( "/api/movies/", 
                  {
                    method:'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                  })

                const data =  await res.json()

                if (res.ok) {
                    // The server will return the new values for the movie.
                    // Use those values to update 'movie' object.
                    changedVals.forEach(([ name ]) => movie[name] = data[name])

                    document.getElementById('message-box').innerText = "Update successful."
                    setUpdated(true) // Force page redraw with new movie data
                } else {
                    console.log("Error: ", data.cause)
                    throw new Error("Database error.")
                }
            } catch (err) {
                document.getElementById('message-box').innerText = "A problem occured. No database update."
            }
        }   
 
        updateMovie()  
    }


    return (
       <form className='movie-edit-form' onClick={(e) => formClick(e)} >
            <input type="button" id='submit' value='Submit' onClick={onSubmit} />
            <span id='message-box'></span>
            <br />  
            <br />
            <div>
                <label htmlFor="title"> Title:</label>
                <input type="text" defaultValue={movie.title} id="title" name="title" />
            </div>
            <div>
                <label htmlFor="description"> Description:</label>
                <textarea defaultValue={movie.description} name="description" id="description" cols="50" rows="6"></textarea>
            </div>
            <div>
                <label htmlFor="rental_rate"> Rental Rate:</label>
                <input type="text" defaultValue={movie.rental_rate} id="rentalRate" name="rental_rate" />
            </div>
            <div>
                <label htmlFor="rating">Rating:</label>
                <select name="rating" id="rating" defaultValue={movie.rating}>
                    {ratings.map((rating, index) => 
                        (rating === movie.rating) ? 
                        <option value={rating}  key={index} selected>{rating}</option>
                        : <option value={rating} key={index}>{rating} </option>
                    )}
                </select>
            </div>
       </form>
    )
}

export default Edit

