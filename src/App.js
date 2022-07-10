import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateOutlet from './components/PrivateOutlet';
import PublicOutlet from './components/PublicOutlet';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';
import './styles/App.css';

export default function App() {
  return (

    <Router>
      <AuthProvider>
        <Layout >
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/*" element={<PublicOutlet />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            <Route path="/result/:id" element={<Result />} />

            <Route path="/*" element={<PrivateOutlet />}>
              <Route path="quiz/:id" element={<Quiz />} />
            </Route>

          </Routes>
        </Layout>
      </AuthProvider>
    </Router>

  );
}