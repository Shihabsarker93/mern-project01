// components/AdminManagement.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function AdminManagement() {
  const [users, setUsers] = useState([]);
  const { currentAdmin } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (currentAdmin?.role === 'super_admin') {
      fetchUsers();
    }
  }, [currentAdmin]);

  const makeAdmin = async (userId) => {
    try {
      const res = await fetch(`/api/admin/promote/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        // Refresh user list
        const updatedUsers = users.map(user => 
          user._id === userId ? { ...user, role: 'admin' } : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error promoting user:', error);
    }
  };

  if (currentAdmin?.role !== 'super_admin') {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Administrators</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {!user.role && (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
