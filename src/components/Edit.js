
import './css/edit.css'

const Edit = ({ movie }) => {
    
    const onSubmit = () => {
    
    }

    return (
       <form class='movie-edit' >
            <input type="button" value='Submit' onClick={onSubmit} />
            <br />  
            <div>
                <label htmlFor="title"> Title:</label>
                <input type="text" value={movie.title} name="title" />
            </div>
            <div>
                <label htmlFor="Description"> Description:</label>
                <input type="text" value={movie.description} name="Description" />
            </div>
            <div>
                <label htmlFor="rentalRate"> Rental Rate:</label>
                <input type="number" value={movie.rental_rate} name="rentalRate" />
            </div>
            <div>
                <label htmlFor="runTime"> Running Time:</label>
                <input type="number" value={movie.length} name="runTime" />
            </div>
       </form>
    )
}

export default Edit
