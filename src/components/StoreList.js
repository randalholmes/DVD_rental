
import { useState, useEffect } from 'react'


import './css/storeList.css'


const StoreList = () => {


    const [ storeIds, setStoreIds] = useState([1, 2])

    useEffect(() => {
         const getStoreIds = async () => {
            try {
                const res = await fetch('/api/stores/ids')
                const data = await res.json()

                console.log(data.map( ({store_id: id}) => id ))
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


    return (
        <div className='store-list'>
            <ul>
                {storeIds.map( id => <li key={id} >{`Store ${id}`}</li>)}
            </ul>
        </div>
    )
}

export default StoreList
