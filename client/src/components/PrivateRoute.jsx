import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'; //header->app->privateRoute accessing the children
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}   