// Component displays partial movie information in a table.
// It has buttons for a Details popup box and an Edit box.
// These buttons are enabled after selecting a movie in the table.

import './css/scrollBox.css'

const SearchResults = ({ movies, selectedMovieId, setSelectedMovieId, setShowDetails, setShowEdit }) => {

    const selectRow = (e) => {
        const selectedId = e.target.parentElement.id 
        setSelectedMovieId(selectedId)
    }

    const showDetailsBox = () => {
        setShowDetails(true)
    }

    const showEditBox = () => {
        setShowEdit(true)
    }


    const columnTitles = ['Title', 'Rating', 'Description']

    return (    
        <div className='scroll-box'>
            <div>
                <h2>Search Results</h2>
                {selectedMovieId ? <button onClick={showDetailsBox} >View Details</button> : <button disabled >View Details</button>}
                {selectedMovieId ? <button onClick={showEditBox} >Edit</button> : <button disabled >Edit</button>}
                <span>Select a Movie Row to View Details or Edit information.</span>
            </div>
            <div className='scroll_table'>
                <table onClick={selectRow}>
                    <thead>
                        <tr>
                            {columnTitles ? columnTitles.map((colTitle, index) => 
                                (<th key={index}>{colTitle}</th>)
                            ) : (<th>Waiting for search.</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {movies.length ? movies.map(({film_id, title, description, rating}) => 
                            (<tr key={film_id} id={film_id} className={selectedMovieId === film_id.toString() ? 'selected' : ''} >
                                <td>{title}</td>
                                <td>{rating}</td>
                                <td>{description}</td>
                                </tr>)
                            ) : (<tr><td>Waiting for search.</td></tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchResults
