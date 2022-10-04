import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Homepage from './pages/Homepage';
import PosPage from './pages/PosPage';
import Register from './pages/Register';
import Contact from './pages/Contact';
import PosPage2 from './pages/PosPage2';
import HomeSuperAdmin from './pages/HomeSuperAdmin';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Users from './pages/Users';
import About from './pages/About';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/AddProduct' element={<AddProduct />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/EditProduct/:id' element={<EditProduct />} />
        <Route path='/HomeSuperAdmin' element={<HomeSuperAdmin />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/About' element={<About />} />
        <Route path='/pos' element={<PosPage />} />
        <Route path='/pos2' element={<PosPage2 />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;