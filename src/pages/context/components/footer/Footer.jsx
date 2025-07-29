import './footer.css'
import LOGO from '../header/logo.png'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='footer-logo'>
                    <img src={LOGO} alt='Hope Health Logo' />
                    <span>Hope Health</span>
                </div>
                <div className='footer-links'>
                    <a href='/'>Home</a>
                    <a href='/context/appointment'>Appointments</a>
                    <a href='/context/reviews'>Reviews</a>
                    <a href='/context/contact'>Contact</a>
                </div>
                <div className='footer-social'>
                    <a href='#' aria-label='Facebook'><i className='fab fa-facebook-f'></i></a>
                    <a href='#' aria-label='Twitter'><i className='fab fa-twitter'></i></a>
                    <a href='#' aria-label='Instagram'><i className='fab fa-instagram'></i></a>
                </div>
            </div>
            <div className='footer-bottom'>
                <span>© {new Date().getFullYear()} Hope Health. All rights reserved.</span>
            </div>
        </footer>
    )
}
export default Footer;