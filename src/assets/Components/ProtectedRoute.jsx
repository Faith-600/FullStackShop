// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// function ProtectedRoute({ children }) {
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//   const location = useLocation();

//   // Save the current location before redirecting to the login page if not authenticated
//   if (!isAuthenticated) {
//     localStorage.setItem('previousPage', location.pathname); // Save the previous page
//     return <Navigate to="/" />;
//   }

//   return children;
// }

// export default ProtectedRoute;
