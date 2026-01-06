import { useEffect, useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users on page load
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
  await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "DELETE",
  });

  setUsers((prev) => prev.filter((user) => user._id !== id));
};

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


  return (
    <div className="container">
      <h1>Codveda Internship – User Management</h1>

      <UserForm onUserAdded={(newUser) => setUsers((prev) => [...prev, newUser])} />
      <UserList 
      users={users} onDelete={handleDelete} onEdit={handleEdit} 
      />
    </div>
  );
}

export default App;
