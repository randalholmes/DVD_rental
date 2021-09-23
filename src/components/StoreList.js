
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../state/actionCreators/actionCreators'


import './css/storeList.css'


const StoreList = () => {

    const curId = useSelector(state => state.curId)
    const dispatch = useDispatch()
    const { selectStore } = bindActionCreators(actionCreators, dispatch)


    console.log("curId at start", curId)
    console.log("selectStore: ", selectStore)

    const [ storeIds, setStoreIds] = useState([])

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
        selectStore(id)
        console.log("Current Store id: ", curId)
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
