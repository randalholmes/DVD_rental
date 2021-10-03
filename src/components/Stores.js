// Top level component for the Video Stores screen.

import StoreList from './StoreList'
import Customers from './Customers'
import CustomerDetails from './CustomerDetails'
import EditCustomer from './EditCustomer'


import './css/stores.css'

const Stores = () => {

    return (

        <div className="stores">
            <StoreList />
            <Customers />
            <CustomerDetails />
            <EditCustomer />
        </div>

    )
}

export default Stores
