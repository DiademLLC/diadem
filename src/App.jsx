import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PageTop from './components/PageTop'
import Modal from './components/reuseables/Modal';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import OrderCompletionPage from './pages/OrderComplete';
import Footer from './components/Footer'

function App() {

  return (
    <CartProvider>
      <ModalProvider>
        <div className='app-container'>
          <Router>            
              <ToastContainer />
              <PageTop />
              <Navbar />

              {/* Main content */}
              <div className='content'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/checkout' element={<Checkout />} />
                  <Route path='/order-complete' element={<OrderCompletionPage />} />
                </Routes>
              </div>
              
              <Modal />             
              <Footer />                          
          </Router>
        </div>
      </ModalProvider>
    </CartProvider>
  )
}

export default App
