import { useEffect, useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Login from "./components/Login";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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
  

 // Handle user deletion (ADMIN ONLY)
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
    `http://localhost:3000/api/users/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    alert(error.message || "Not authorized");
    return;
  }

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
      <Login onLogin={(user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      }} />
    ) : users.length === 0 ? (
      <p>Loading users or none available...</p>
    ) : (
      <>
        {currentUser?.role === "admin" && (
          <UserForm
            onUserAdded={(newUser) =>
              setUsers((prev) => [...prev, newUser])
            }
          />
        )}
        <UserList
          users={users}
          onDelete={handleDelete}
          onEdit={handleEdit}
          currentUser={currentUser}
        />
      </>
    )}
  </div>
);

}

export default App;
