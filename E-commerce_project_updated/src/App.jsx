import Product from './pages/Product'
import Cart from './pages/Cart'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Header from './Components/Header'
import CheckOut from './pages/checkout/CheckOut'



function App() {
  
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/cart' element={<Cart />}></Route>
          <Route exact path='/' element={<Product />}></Route>
          <Route exact path='/checkout' element={<CheckOut />}></Route>
          
        </Routes>
      </Router>
      
     
    </>
  )
}

export default App
