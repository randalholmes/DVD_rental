
import { useState, useEffect} from 'react'
import './css/searchMovies.css'

const SearchMovies = ({ setMovies, setSelectedMovieId }) => {

    const [categories, setCategories] = useState([])
    const [actors, setActors] = useState([])

    // Get Categories
    useEffect(() => {
        async function getCategories() {
            const res = await fetch('/api/category/all')
            const data = await res.json()
            setCategories(data)
        }

        getCategories()
    }, [])


    // Get Actors
    useEffect(() => {
        async function getActors() {
            const res = await fetch('/api/actor/all')
            const data = await res.json()
            setActors(data)
        }

        getActors()
    }, [])


    const getUrl = ([ title, category, actor ], index) => { 

        switch (index) {
            case 0:
                if (title === "null") {
                    alert("Please enter one or more words to \nsearch for a movie Title.")
                    return 'null'
                }
                return `/api/movies/title/${title}`

            case 1:
                return `/api/movies/category/${category}`

            case 2:
                if (actor === "null") {
                    alert("Please enter a name for an Actor.")
                    return 'null'
                }
                return `/api/movies/actor/${actor}`

            default:
                alert("There are no search parameters.")
                return 'null'
        }
    }


    const onSubmit = (e, index) => {
        const form = document.querySelector(".movies-search-form")
        const searchList = Array.from(form).filter(elm => elm.type !== 'button').map(({ value }) => value.trim() ? value : 'null')

        const url = getUrl(searchList, index)
        if (url === 'null') return

        async function getMovies() {
            try {
                const res = await fetch(url)
                const data =  await res.json()
                console.log(data)
                setMovies(data)
                setSelectedMovieId(0) 
            } catch (err) {
                console.log(err.message)
                alert("A problem occured retrieving data from the database.")
            }
        }   
 
        getMovies()
    }



    return (
        <form className='movies-search-form'>
            <h2>Search</h2>
            <input type="button" value="Search" onClick={(e) => onSubmit(e, 0)} />
            <br/> 
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" />
            </div>
            
            <hr />
            <br />
            <input type="button" value="Search" onClick={(e) => onSubmit(e, 1)} />
                <br />
            <div>

                <label htmlFor="category">Category</label>
                <select name="category" id="category" >
                    {categories.map(({ name }, index) => 
                        <option value={name} key={index}>{name}</option>
                    )}
                </select>
            </div>
            
            <hr />
            <br />
            <input type="button" value="Search" onClick={(e) => onSubmit(e, 2)} />
                <br />
           <div>
                <label htmlFor="actor">Actor</label>
                <input list="actors" name="actor" id="actor" />
                <datalist id='actors'>
                    {actors.map(({ first_name, last_name }, index) => 
                        <option value={`${first_name} ${last_name}`} key={index}>{`${first_name} ${last_name}`}</option>
                    )}
                </datalist>
           </div>
        </form>
    )
}

export default SearchMovies


SearchMovies.defaultProps = {
  categories: [{name:'Loading.......'}],
  actors: [{first_name: 'Loading.....', last_name: ''}]
}