import { useState } from 'react'
import { Outlet } from 'react-router-dom'
// import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Layout.css'


const Layout = () => {
  // keywords, description

  var storedValue = localStorage.getItem('welAlert')

  const [welcomeMessage, setWelcomeMessage] = useState(() => {
    if (storedValue === null) {
      return true
    }

    if (storedValue === false) {
      return false
    }
  })

  const handleWelcomeAlert = () => {
    setWelcomeMessage(false)
    localStorage.setItem('welAlert', JSON.stringify(false))
  }

  return (
    <>
      {welcomeMessage && (
        <div className='welcome__message'>
          <div className='container welcome__container'>
            <div>
              <h2 className='text-center pb-3'>Hi, thank your for visiting my e-commerce demo app</h2>
              <ul>
                <li>This is a <span>MERN</span> stack web application. Meaning, <span>React</span> was used for the frontend, <span>Express</span>, <span>Node.js</span> for the backend and <span>MongoDB</span> as the database.</li>
                <li>I used <span>Redux toolkit</span> for state management and <span>createAsyncThunk</span> along with <span>Axios</span> for HTTP requests.</li>
                <li><span>React Bootstrap</span> and <span>Font Awesome</span> were my choices for styling.</li>
                <li>There are two roles available. <span>Admin</span> and <span>Customer</span>. However, only the admin can select another admin.</li>
                <li>I have provided an admin login by default here. But you can use your own email to register as a customer just to test functionalities. (no email confirmation needed)</li>
                <li>Almost all the features are functioning but I won't say that the app is 100% bug-free. </li>
                <li>You can buy things here using <span>Paypal</span> or <span>Credit Card</span>. But you <span>won't</span> get the item or items because this is a demo app. Hence, I will accept your payment as a donation.</li>
                <li>Again, thank you for visiting. Feel free to follow me on social media. Links are on the footer section. You can close this alert now.</li>
              </ul>
              <div className='delay'>
                <p>I use Render.com free tier for Web Services. On free instance, servers are automatically shut down after 15 minutes of inactivity. Render.com restarts them when a new request comes in, so this can cause a delay of up to 30 seconds for the first request after a period of inactivity.</p>
              </div>
            </div>
            <div className='welcome__btn'><button onClick={handleWelcomeAlert}><i className="fas fa-times" /></button></div>
          </div>
        </div>
      )}
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default Layout