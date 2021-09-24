
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectStore } from '../state/actionCreators/actionCreators'

import './css/storeList.css'


const StoreList = () => {
    const st = useSelector( state => state)
    console.log("state: ", st)

    const { curStoreId } = useSelector(state => state)
    const [ storeIds, setStoreIds] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
         const getStoreIds = async () => {
            try {
                const res = await fetch('/api/stores/ids')
                const data = await res.json()

                if (res.ok) {
                    setStoreIds(data.map( ({store_id: id}) => id ))
                } else {
                    throw new Error(data.cause)
                }
            } catch(err) {
                console.log(err.message)
                alert('Error retrieving store Ids from database.')
            }
         }

         getStoreIds();
    }, [])

    
    const onStoreClick = (id) => {
        dispatch(selectStore(id))
        console.log("Last Store id: ", curStoreId)
    }

    
    return (
        <div className='store-list'>
            <ul>
                {storeIds.map( id => <li key={id} onClick={() => onStoreClick(id)}>{`Store ${id}`}</li>)}
            </ul>
        </div>
    )
}

export default StoreList
