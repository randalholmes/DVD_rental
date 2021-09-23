

import { useState } from "react"


const Customers = () => {

    const [customers, setCustomers] = useState([])



    return (
        <div className='customers'>
            <div>
                Button area
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}

export default Customers
