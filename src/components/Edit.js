
import './css/edit.css'

const Edit = ({ movie }) => {
    
    const onSubmit = () => {
        const form = document.querySelector(".movie-edit-form")
         
        console.log("form: ", Array.from(form))
        
        const formVals = Array.from(form).filter(elm => elm.type !== 'button').map(({ value, name }) => [name, value])
        

        console.log("form vals:", formVals)

        // Determine what values if any have changed
        const changedVals = formVals.filter( ([name, value]) => value !== movie[name])

        if (changedVals.length === 0) {
            alert("No values have changed.")
            return
        }

        console.log("changed Vals: ", changedVals)

        // Post new values to the database.
        async function updateMovie() {
            try {
                const res = await fetch( "/api/movies/", 
                {
                    method:'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify(changedVals)
                  })

                const data =  await res.json()
                console.log(data)
            } catch (err) {
                console.log(err.message)
                alert("A problem occured ????.")
            }
        }   
 
        updateMovie()


        // The server will return the new values for the movie.
        // Use those values to update 'movie' object.

        
    }

    return (
       <form className='movie-edit-form' >
            <input type="button" value='Submit' onClick={onSubmit} />
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
                <input type="text" defaultValue={movie.rating} id="rating"  name="rating" />
            </div>
       </form>
    )
}

export default Edit
