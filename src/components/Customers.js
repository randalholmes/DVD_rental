
import './css/customers.css'

import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { changeCustomerList } from '../state/actionCreators/actionCreators'

const Customers = () => {
    const { customerList, curStoreId } = useSelector( state => state)
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


    return (
        <div className='customers'>
            <div>
                <h2>Customers</h2>
                <button>Edit Customer</button>
                <button>View Info</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map( ([name, id]) => 
                        <tr key={id}><td>{name}</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Customers
