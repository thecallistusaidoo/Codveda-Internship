import { useEffect,useState } from "react";


function UserList({users}) {
  return (
    <div>
      <h2>User List</h2>
      
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} ({user.role})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
