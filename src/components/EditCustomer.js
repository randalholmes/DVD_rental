

import './css/editCustomer.css'

const EditCustomer = () => {
    return (
        <div className='edit-customer'>
            <h2>Edit Customer Info</h2>
            <hr />
            <div>
                <form className='form-customer'>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name='firstName' />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name='lastName' />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name='phone' />
                    </div>
                    <br />
                    
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" name='address' />
                    </div>
                    <br />
                    
                    <div>
                        <label htmlFor="district">District</label>
                        <input type="text" name='district' />
                    </div>
                    <br />
                   
                   <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name='city' />
                   </div>
                    <br />
                   
                   <div>
                        <label htmlFor="postalcode">Postal Code</label>
                        <input type="text" name='postalcode' />
                   </div>
                </form>
            </div>
        </div>
    )
}

export default EditCustomer
