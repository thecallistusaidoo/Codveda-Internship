import { useEffect, useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Login from "./components/Login";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
  );
  
  // Logout after edit for security
  const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setUsers([]);
  };
  
  // Fetch users on page load
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    
  if (!token) return; // do not fetch if not logged in

  const res = await fetch("http://localhost:3000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    setUsers([]); // prevent crash
    return;
  }
  
  const data = await res.json();
  setUsers(Array.isArray(data) ? data : []);
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers()
    }
  }, [isLoggedIn]);
  

  // Handle user deletion
  const handleDelete = async (id) => {
  await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "DELETE",
  });

  setUsers((prev) => prev.filter((user) => user._id !== id));
};

// Handle user editing
const handleEdit = async (id, updatedUser) => {
  const response = await fetch(
    `http://localhost:3000/api/users/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    }
  );

  const data = await response.json();

  setUsers((prev) =>
    prev.map((user) => (user._id === id ? data : user))
  );
  
  
};

// Main render
return (
  <div className="container">
    <h1>Codveda Internship – User Management</h1>

    {isLoggedIn && (
      <button onClick={handleLogout}>
        Logout
      </button>
    )}

    {!isLoggedIn ? (
      <Login onLogin={() => setIsLoggedIn(true)} />
    ) : users.length === 0 ? (
      <p>Loading users or none available...</p>
    ) : (
      <>
        <UserForm
          onUserAdded={(newUser) =>
            setUsers((prev) => [...prev, newUser])
          }
        />
        <UserList
          users={users}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </>
    )}
  </div>
);

}

export default App;
