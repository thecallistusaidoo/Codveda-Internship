import { useState } from "react";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, role }),
    });

    const savedUser = await response.json();

    if (response.ok){
      //Clear inputs
      setName("");
      setEmail("");
      setRole("");

      //After successful save
      setSuccess(true);
      setTimeout(() => setSuccess(false),2000)

      //Tell parent to refresh
      onUserAdded(savedUser);
    }else{
      alert("Failed to add user!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <button type="submit">Add User</button>
      *Please refresh after adding user
    </form>
  );
}

export default UserForm;
