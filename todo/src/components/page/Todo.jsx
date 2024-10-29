import { toast, Toaster } from "react-hot-toast";
import AddTodoForm from "../forms/AddTodoForm";
import TodoItem from "./TodoItem";
import { CheckCircle, Circle, LogOut, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import {getAuth, signOut} from "firebase/auth"
import { db, auth } from "../../config/firbase";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, addDoc, query, where, doc, updateDoc, deleteDoc, Timestamp} from "firebase/firestore";
function Todo() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;
  const todoList = collection(db, "todos");

  const logOut = async () => {
    try {
      await signOut(auth);
      toast("Successfully logged out");
      navigate("/login");
    } catch (error) {
      console.error("Error loging out, try again");
    }
  };
  //add todo to firebase
  const handleAddTodo = async (todo) => {
    try {
      if (!user) {
        toast.error("Please log in to add a todo.");
        return;
      }

      const docRef = await addDoc(collection(db, "todos"), {
        ...todo,
        userId: user.uid, // Associate todo with the logged-in user
      });

      setTodos([...todos, { ...todo, id: docRef.id }]);
      toast.success("Todo added successfully");
      setIsAddTodoOpen(false);
    } catch (err) {
      toast.error("Failed to add todo. Please try again.");
    }
  };

  // read user's todos from firebase
  useEffect(() => {
    const getTodos = async () => {
      try {
        if (!user) return; // Ensure user is available

        // Query only todos where userId matches the logged-in user
        const q = query(todoList, where("userId", "==", user.uid));
        const data = await getDocs(q);

        const todosData = data.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            dueDate: docData.dueDate instanceof Timestamp ? docData.dueDate.toDate() : null, // Convert Firestore timestamp to Date if it exists
          };
        });

        setTodos(todosData); // Update state with the retrieved data
      } catch (err) {
        console.error("Error fetching todos:", err);
        toast.error("Failed to fetch todos. Please try again.");
      }
    };

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        getTodos(); // Fetch todos once user is set
      } else {
        setTodos([]); // Clear todos if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [user]);

  //update users todo in firbase
  const handleCompleteTodo = async (id) => {
    try {
      // Get a reference to the specific document in the "todos" collection
      const todoRef = doc(db, "todos", id);

      await updateDoc(todoRef, { completed: true });

      toast.success("Todo completed successfully");
    } catch (err) {
      console.error("Error updating todo:", err);
      toast.error("Failed to complete todo. Please try again.");
    }
  };

  // Delete todo in Firebase
  const handleDeleteTodo = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      await deleteDoc(todoRef);

      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully");
    } catch (err) {
      console.error("Error deleting todo:", err);
      toast.error("Failed to delete todo. Please try again.");
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const uncompletedCount = todos.length - completedCount;

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
              ? `${user.displayName.split(" ")[0]}'s Todos`
              : "User's Todos"}
          </h2>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            onClick={() => setIsAddTodoOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Todo
          </button>
        </div>

        {todos.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Todo Summary
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Circle className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-600">
                  {uncompletedCount} task{uncompletedCount !== 1 ? "s" : ""}{" "}
                  remaining
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">
                  {completedCount} task{completedCount !== 1 ? "s" : ""}{" "}
                  completed
                </span>
              </div>
            </div>
          </div>
        )}
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

        {todos.length === 0 ? (
          <p className="text-center text-gray-500 mt-8 lg:p-8">
            No todos yet. Add one to get started!
          </p>
        ) : todos.every((todo) => todo.completed) ? (
          <div className="mt-8 p-4 bg-green-100 rounded-lg text-green-700 text-center">
            <p className="font-semibold">
              Congratulations! You&apos;ve completed all your tasks for today.
            </p>
            <p>Keep up the great work!</p>
          </div>
        ) : null}
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
