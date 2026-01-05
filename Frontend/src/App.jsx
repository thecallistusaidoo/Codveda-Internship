import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="container">
      <h1>Codveda Internship – User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
