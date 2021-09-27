
import StoreList from './StoreList'
import Customers from './Customers'
import CustomerDetails from './CustomerDetails'


import './css/stores.css'

const Stores = () => {

    return (

        <div className="stores">
            <StoreList />
            <Customers />
            <CustomerDetails />
        </div>

    )
}

export default Stores
