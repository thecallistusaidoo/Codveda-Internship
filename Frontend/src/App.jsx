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

  return (
    <div className="container">
      <h1>Codveda Internship – User Management</h1>

      <UserForm onUserAdded={(newUser) => setUsers((prev) => [...prev, newUser])} />
      <UserList users={users} />
    </div>
  );
}

export default App;
