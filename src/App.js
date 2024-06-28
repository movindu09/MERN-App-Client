import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoutes from './ProtectedRoutes';
import FrontPage from './pages/FrontPage';
import VerifyLogin from './components/VerifyLogin';
import { AuthProvider } from './AuthContext';
import { NotificationProvider } from './NotificationContext';
import { TableProvider } from './TableContext';
import Dashboard from './pages/Dashboard';

function App() {
	return (
		<AuthProvider>
			<NotificationProvider>
				<TableProvider>
					<Routes>
						<Route path="/" element={<FrontPage />} />
						<Route element={<ProtectedRoutes />}>
							<Route path="/home" element={<Home />} />
						</Route>
						<Route path="/register" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/verify/:userId"
							element={<VerifyLogin />}
						/>
						<Route path="/dashboard" element={<Dashboard/>} />
					</Routes>
				</TableProvider>
			</NotificationProvider>
		</AuthProvider>
	);
}

export default App;
