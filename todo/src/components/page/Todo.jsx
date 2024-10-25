import { toast, Toaster } from "react-hot-toast";
import AddTodoForm from "../forms/AddTodoForm";
import TodoItem from "./TodoItem";
import { LogOut, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import {getAuth, signOut} from "firebase/auth"
import { useNavigate } from "react-router-dom";
function Todo() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const  logOut = async () =>{
    try{
      await signOut(auth);
      console.log("User loged out");
      navigate("/login")
    } catch (error) {
      console.error("Error loging out");
      
    }
  }
  const handleAddTodo = (todo) => {
    setTodos([...todos, todo]);
    toast.success("Todo added successfully");
    setIsAddTodoOpen(false);
  };

  const handleCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
    toast.success("Todo completed successfully");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted successfully");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-32 ">
      <Toaster />
      <nav className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">My Todo App</h1>
        <button
          onClick={logOut}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
          // onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </button>
      </nav>

      <main className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {" "}
            {user
              ? `${user.displayName}'s Todos`
              : "User's Todos"}
          </h2>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            onClick={() => setIsAddTodoOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Todo
          </button>
        </div>

        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onComplete={() => handleCompleteTodo(todo.id)}
              onDelete={() => handleDeleteTodo(todo.id)}
            />
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-8 lg:p-8">
            No todos yet. Add one to get started!
          </p>
        )}

        {todos.every((todo) => todo.completed) && todos.length > 0 && (
          <div className="mt-8 p-4 bg-green-100 rounded-lg text-green-700 text-center">
            <p className="font-semibold">
              Congratulations! You&apos;ve completed all your todos.
            </p>
            <p>Keep up the great work!</p>
          </div>
        )}
      </main>

      {isAddTodoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Todo</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsAddTodoOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <AddTodoForm onAddTodo={handleAddTodo} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
