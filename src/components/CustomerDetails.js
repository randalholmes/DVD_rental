
import './css/customerDetails.css'

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'

import { setCustomer, clearCustomer } from "../state/actionCreators/actionCreators"

const CustomerDetails = () => {

    const { customer: cus, curCustomerId: id } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        const getCustomerInfo = async () => {
            try {
                const res = await fetch(`./api/customer/id/${id}`)
                const data = await res.json()
               
                if (res.ok) {
                    dispatch(setCustomer(data[0]))
                } else {
                    throw new Error(data.cause)
                }
               
            } catch (err) {
                console.log("Database error: ", err.message)
            }
        }

        id ? getCustomerInfo() : dispatch(clearCustomer())

    }, [id, dispatch])


    return (
        <div className="customer-details">
            <div>
                <h2>Customer Details</h2>
                <hr />
                <div className='customer_addresses'>
                    <div>
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Phone:</p>
                        <p>Address:</p>
                        
                    </div>
                    <div>
                        <p>{cus ? `${cus.first_name} ${cus.last_name}` : ''}</p>
                        <p>{cus ? `${cus.email}` : ''}</p>
                        <p>{cus ? `${cus.phone}` : ''}</p>
                        <p>{cus ? `${cus.address}` : ''}</p>
                        <p>{cus ? `${cus.district}, ${cus.city}, ${cus.postal_code}` : ''}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetails 


// return (
//     <div className="customer-details">
//         <div>
//             <h2>Customer Details</h2>
//             <hr />
//             <p>{cus ? `Name: ${cus.first_name} ${cus.last_name}` : 'Name: '}</p>
//             <p>{cus ? `Email: ${cus.email}` : 'Email:'}</p>
//             <p>{cus ? `Phone: ${cus.phone}` : 'Phone:'}</p>
//             <p>{cus ? `Address: ${cus.address}` : 'Address:'}</p>
//             <p>{cus ? `${cus.district}, ${cus.city}, ${cus.postal_code}` : ''}</p>
//         </div>
//     </div>
// )

