
import './css/details.css'

const Details = ({ movie }) => {
    return (

            <table className='details'>
                <tbody>
                    <tr>
                        <td>Title: {movie.title}</td>
                        <td>Rating:  {movie.rating}</td>
                        <td>Release Date: {movie.release_year}</td>
                    </tr>
                    <tr>
                        <td>Description: {movie.description}</td>
                    </tr>
                    <tr>
                        <td>Run Time: {movie.length}</td>
                        <td>Rental Rate: ${movie.rental_rate}</td>
                        <td>Category: {movie.category}</td>
                    </tr>
                </tbody>
            </table>

    )
}

export default Details
