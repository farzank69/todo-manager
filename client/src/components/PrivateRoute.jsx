import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser && !currentUser.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify Your Email</h2>
          <p className="text-gray-600 mb-4">
            Please check your email inbox and verify your email address to access the dashboard.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            I've Verified My Email
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
