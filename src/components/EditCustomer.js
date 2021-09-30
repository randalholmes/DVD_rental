

import './css/editCustomer.css'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCustomer } from '../state/actionCreators/actionCreators'

const EditCustomer = () => {
    const { customer: cus, curCustomerId: id} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        id ? console.log("id changed") : console.log("Id null")
        
    }, [id, dispatch])



    const updateCustomer = async () => {
        const formData = Array.from(document.getElementsByClassName('input'))
            .map( elm => [elm.getAttribute('name'), elm.innerText])

        console.log(formData)

        const changedVals = formData.filter( ([name, value]) => value !== cus[name])
        console.log("changed values: ", changedVals)

        // If no customer data has changed, then don't make call to server.
        if (changedVals.length === 0) {
            return
        }

        // Create data object to send to server
        const newData = {customer_id: id, changedVals}

        console.log("newData", newData)





    }


    const submitHandler = (e) => {
        e.preventDefault()
        updateCustomer()
    }


    return (
        <div className='edit-customer' autoComplete='off'>
            <h2>Edit Customer Info</h2>
            <hr />
            <div>
                <form className='form-customer' >
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <span className='input' contenteditable="true" name='first_name'>{cus ? cus.first_name : ''}</span>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <span className='input' contenteditable="true" name='last_name'>{cus ? cus.last_name : ''}</span>
                    </div>
                    <br />

                    <div>
                        <label htmlFor="email">Email</label>
                        <span className='input' contenteditable="true" name='email'>{cus ? cus.email : ''}</span>
                    </div>
                    <br />

                    <div>
                        <label htmlFor="phone">Phone</label>
                        <span className='input' contenteditable="true" name='phone'>{cus ? cus.phone : ''}</span>
                    </div>
                    <br />
                    
                    <div>
                        <label htmlFor="address">Address</label>
                        <span className='input' contenteditable="true" name='address'>{cus ? cus.address : ''}</span>
                    </div>
                    <br />
                    
                    <div>
                        <label htmlFor="district">District</label>
                        <span className='input' contenteditable="true" name='district'>{cus ? cus.district : ''}</span>
                    </div>
                    <br />
                   
                   <div>
                        <label htmlFor="city">City</label>
                        <span className='input' contenteditable="true" name='city'>{cus ? cus.city : ''}</span>
                   </div>
                    <br />
                   
                   <div>
                        <label htmlFor="postalcode">Postal Code</label>
                        <span className='input' contenteditable="true" name='postal_code'>{cus ? cus.postal_code : ''}</span>
                   </div>
                   <br />
                   <br />
                   <button onClick={(e) => submitHandler(e)} >Submit Changes</button>
                </form>
            </div>
        </div>
    )
}

export default EditCustomer
