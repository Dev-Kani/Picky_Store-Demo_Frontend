import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer_section'>
      <Container>
        <div className='footer'>
          <div className='footer_left'>
            <div className='navbar_logo'>
              <Link to="/"><h1 className='pb-3'>Picky</h1></Link>
            </div>
            <div>
              <p className='footer__left-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sunt fuga iste velit ex nisi laudantium sequi fugit ullam culpa!</p>
            </div>
            <div className='social__icons'>
              <a href='https://dev-kani.netlify.app/' target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-square" />
              </a>
              <a href='https://dev-kani.netlify.app/' target="_blank" rel="noreferrer">
                <i className="fab fa-instagram-square" />
              </a>
              <a href='https://dev-kani.netlify.app/' target="_blank" rel="noreferrer">
                <i className="fab fa-twitter-square" />
              </a>
            </div>
          </div>
          <div className='footer_center'>
            <div>
              <h3 className='pb-2'>Useful Links</h3>
              <p><Link to='/'>Home</Link></p>
              <p><Link to='/'>Electronic</Link></p>
              <p><Link to='/'>Accessories</Link></p>
              <p><Link to='/profile'>Order Tracking</Link></p>
              <p><Link to='/cart'>Wishlist</Link></p>
            </div>
          </div>
          <address className='footer_right'>
            <h3 className='pb-2'>Contact</h3>
            <a href="mailto:picky@example.com">Email Us</a><br />
            <p>34 St, Luxembourg</p>
            <p>Phone :</p>
            <p>+352 621 123 456</p>
          </address>
        </div>
      </Container>
      <div className='copyright'><span>Copyright © 2023 Picky. All rights reserved.</span></div>
    </footer>
  )
}
export default Footer