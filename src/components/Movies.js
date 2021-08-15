
import { useState, useEffect } from 'react'
import SearchMovies from './SearchMovies';
import SearchResults from './SearchResults';
import DragBox from './DragBox';
import Details from './Details';
import Edit from './Edit';
import './css/movies.css'




const Movies = () => {

    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({})
    const [selectedMovieId, setSelectedMovieId] = useState(0)
    const [showDetails, setShowDetails] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const closeDetailsBox = () => {
        setShowDetails(false)
    }

    const closeEditBox = () => {
        setShowEdit(false)
    }

    useEffect(() => {
        const tmpMovie = movies.find((movie) => movie.film_id.toString() === selectedMovieId)
        const movie = ( tmpMovie === undefined ) ? {} : tmpMovie
        console.log(movie)
        setSelectedMovie(movie)
    }, [movies, selectedMovieId])


    return (
        <div className='movies'>
            <SearchMovies setMovies={setMovies} setSelectedMovieId={setSelectedMovieId} />
            {movies.length ? <SearchResults movies={movies} selectedMovieId={selectedMovieId} 
                            setSelectedMovieId={setSelectedMovieId} setShowDetails={setShowDetails}
                            setShowEdit={setShowEdit} /> : ''}
            {showDetails ? <DragBox closeAction={closeDetailsBox} title={"Details"} ><Details movie={selectedMovie} /></DragBox> : ''}
            {showEdit ? <DragBox closeAction={closeEditBox} title={"Edit"} ><Edit movie={selectedMovie} /></DragBox> : ''}

        </div>
    )
}


export default Movies