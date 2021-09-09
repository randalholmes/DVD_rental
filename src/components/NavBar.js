
import  Navlink from './NavLink'
import PropTypes from 'prop-types';
import './css/navbar.css'

const NavBar = ({links, message}) => {
    const linkLen = links.length
    return (
        <div className='NavBar' style={{gridTemplateColumns: `${new Array(linkLen).fill('1fr').join(' ')} 2fr`}}>
            {links.map((link, index) => 
                (<Navlink key={index} linkTo={link.linkTo} title={link.title} />)
            )}
            <span>{message}</span>
        </div>
    )
}

export default NavBar

NavBar.defaultProps = {
    message: 'Some other content for header'
}

NavBar.propTypes = {
    message: PropTypes.string,
}