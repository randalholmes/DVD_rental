
import { Link } from 'react-router-dom'
import './css/navlink.css'

const Navlink = ({linkTo, title}) => {
    return (
        <p className="link">
            <Link to={linkTo}>{title}</Link>
        </p>
    )
}

export default Navlink
