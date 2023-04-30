import './App.css';
import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/cart/cart';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Categories from './pages/Categories/Categories';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Routes>
      <Footer/>

      </div>
  );
}

export default App;
