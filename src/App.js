import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import Navbar from './Components/Header/Navbar';
import Home from './Components/Home/Home';
import RequireAuth from './Components/Shared/RequireAuth';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
