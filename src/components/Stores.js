
import StoreList from './StoreList'
import { Provider } from 'react-redux'
import dataStore from '../state/dataStore'

import './css/stores.css'

const Stores = () => {
    return (
        <Provider store={dataStore}>
            <div className="stores">
                <StoreList />
            </div>
        </Provider>
    )
}

export default Stores
