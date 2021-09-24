
import StoreList from './StoreList'
import Customers from './Customers'
// import { useDispatch } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as actionCreators from '../state/actionCreators/actionCreators'


import './css/stores.css'

const Stores = () => {
    // const dispatch = useDispatch()
    // const { selectStore, changeCustomerList } = bindActionCreators(actionCreators, dispatch)

    // console.log("action creators: ", actionCreators)

    return (

        <div className="stores">
            <StoreList />
            <Customers />
        </div>

    )
}

export default Stores
