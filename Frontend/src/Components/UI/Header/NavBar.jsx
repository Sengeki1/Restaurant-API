import HomeIcon from '@mui/icons-material/Home';
import './Header.css'

export default function NavBar () {
    return (
        <div className='header'>
            <HomeIcon className='icon'/>
            <h3>
                Dashboard
            </h3>
        </div>
    )
}