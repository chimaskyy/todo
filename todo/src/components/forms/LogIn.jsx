import { useState } from "react";

function LogIn() {
  const [isLogin, setIsLogin] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    setIsLogin(true);
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to Todo App
        </h1>
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-lg text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="text-lg text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
