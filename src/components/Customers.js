

import './css/scrollBox.css'

import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { changeCustomerList } from '../state/actionCreators/actionCreators'
import { setCustomerId } from '../state/actionCreators/actionCreators'


const Customers = () => {
    const { customerList, curStoreId, curCustomerId } = useSelector( state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if (curStoreId === null) {
            return
        }

        const getCustomers = async () => {
            try {
                const res = await fetch(`./api/customers/stores/id/${curStoreId}`)
                const data = await res.json()

                if (res.ok) {
                    const newCustomerList = data.map(({first_name: f, last_name: l, customer_id: id}) => [`${f} ${l}`, id])
                    dispatch(changeCustomerList(newCustomerList))
                } else {
                    throw new Error(data.cause)
                }

            } catch(err) {
                console.log(`Database Error: ${err.message}`)
            }
        }

        getCustomers();

    }, [curStoreId, dispatch])


    const onClickCustomer = cusId => {
        dispatch(setCustomerId(cusId))
    }

    console.log("customer id: ", curCustomerId)

    
    return (
        <div className='scroll-box'>
            <div>
                <h2>Customers</h2>
                <button>Edit Customer</button>
                <button>View Info</button>
            </div>
            <div className="scroll_table">
                <table>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList.map( ([name, id]) => 
                            <tr key={id}><td onClick={() => onClickCustomer(id)}>{name}</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customers
