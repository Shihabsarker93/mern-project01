// components/admin/AdminNav.jsx
import { Link } from 'react-router-dom';

export default function AdminNav() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex gap-4">
        <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
      </div>
    </nav>
  );
}