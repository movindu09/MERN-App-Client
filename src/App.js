import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoutes from './ProtectedRoutes';




function App() {
	return (
		<Routes>
			<Route element={<ProtectedRoutes />}>
				<Route path="/home" element={<Home />} />
			</Route>
			<Route path="/register" element={<Signup />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
