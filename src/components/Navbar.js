import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../context/authForm/authContext"


export const Navbar = () => {
const {token, logout} = useContext(AuthContext)
    return (
        
        <nav className='navbar navbar-dark bg-primary navbar-expand-lg'>
            <div className = 'navbar-brand'>
                Github Search
            </div>
            <ul className = 'navbar-nav'>
                <li className = 'nav-item'>
                    <NavLink exact = 'true' to='/' className='nav-link'>{token?'General':'Login-Form'}</NavLink>
                </li>
                <li className = 'nav-item'>
                    <NavLink to='/about' className='nav-link'>Information</NavLink>
                </li>
            </ul>
            {/* <Link to='/' onClick={logout} className='btn btn-secondary'>Log out</Link> */}
            {token? <Link to='/' onClick={logout} className='btn btn-secondary'>Log out</Link>:null}
            {/* {token?<button onClick={logout} className='btn btn-secondary'>Log out</button>:null} */}
        </nav>
    )
}