function UserList({ users, onDelete, onEdit, currentUser }) {
  return (
    <div>
      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id} style={{ marginBottom: "10px" }}>
              <input
                value={user.name}
                onChange={(e) =>
                  onEdit(user._id, { ...user, name: e.target.value })
                }
              />

              <input
                value={user.email}
                onChange={(e) =>
                  onEdit(user._id, { ...user, email: e.target.value })
                }
              />

              <input
                value={user.role}
                onChange={(e) =>
                  onEdit(user._id, { ...user, role: e.target.value })
                }
              />

              {currentUser?.role === "admin" && (
                <button onClick={() => onDelete(user._id)}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
