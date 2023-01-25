import './Header.css';
import { Link } from "react-router-dom"


const Header = () => {
    
	return (
			<div className='header'>
				<Link className='navLink' to="/"> HOME </Link>
				<Link className='navLink' to="/search"> SEARCH </Link>
			</div>
	)
}

export default Header
