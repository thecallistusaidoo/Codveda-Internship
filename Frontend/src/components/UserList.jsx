import { useState } from "react";

function UserList({ users, onDelete, onEdit, currentUserRole }) {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setEditedUser(user);
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const saveEdit = () => {
    onEdit(editingUserId, editedUser);
    cancelEdit();
  };

  return (
    <div className="user-list">
      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => {
            const isEditing = editingUserId === user._id;

            return (
              <li key={user._id}>
                <input
                  value={isEditing ? editedUser.name : user.name}
                  disabled={currentUserRole !== "admin"}
                  onChange={(e) => {
                    if (!isEditing) return;
                    setEditedUser({ ...editedUser, name: e.target.value });
                  }}
                />

                <input
                  value={isEditing ? editedUser.email : user.email}
                  disabled={currentUserRole !== "admin"}
                  onChange={(e) => {
                    if (!isEditing) return;
                    setEditedUser({ ...editedUser, email: e.target.value });
                  }}
                />

                <input
                  value={isEditing ? editedUser.role : user.role}
                  disabled={currentUserRole !== "admin"}
                  onChange={(e) => {
                    if (!isEditing) return;
                    setEditedUser({ ...editedUser, role: e.target.value });
                  }}
                />

                {currentUserRole === "admin" && (
                  <>
                    {isEditing ? (
                      <>
                        <button className="save-btn" onClick={saveEdit}>Save</button>
                        <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="edit-btn" onClick={() => startEdit(user)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDelete(user._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default UserList;
