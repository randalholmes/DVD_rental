
import './css/customers.css'

import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { changeCustomerList } from '../state/actionCreators/actionCreators'

const Customers = () => {

    const dispatch = useDispatch()

    const { customerList, curId } = useSelector( state => state)

    useEffect(() => {
        if (curId === null) {
      
            return
        }

        const getCustomers = async () => {
            try {
                const res = await fetch(`./api/customers/id/${curId}`)
                const data = await res.json()

                if (res.ok) {
                    console.log("customer names:", data)
                    dispatch(changeCustomerList(["Howdy Duddy"]))
                } else {
                    throw new Error(data.cause)
                }

            } catch(err) {
                console.log(`Database Error: ${err.message}`)
            }
        }

        getCustomers();

    }, [curId, dispatch])


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
                    {customerList.map( (name, index) => 
                        <tr key={index}><td>{name}</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Customers
