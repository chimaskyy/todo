import { useState, } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/firbase";
import { toast, Toaster } from "react-hot-toast";
import {createUserWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth"

/**
 * SignUpForm component renders a sign-up form with fields for username, email, and password.
 * It also provides options to sign up with Google and displays loading states and error messages.
 *
 * State Variables:
 * - showPassword: Boolean to toggle the visibility of the password.
 * - username: String to store the entered username.
 * - email: String to store the entered email.
 * - password: String to store the entered password.
 * - loading: Boolean to indicate the loading state during sign-up.
 * - error: String to store any error messages during sign-up.
 *
 * Functions:
 * - signUp: Asynchronous function to handle sign-up using email and password.
 * - signUpWithGoogle: Asynchronous function to handle sign-up using Google authentication.
 * - handleSubmit: Function to handle form submission and trigger the sign-up process.
 *
 * UI Elements:
 * - Input fields for username, email, and password.
 * - Toggle button to show/hide password.
 * - Submit button to sign up.
 * - Button to sign up with Google.
 * - Error message display.
 * - Link to navigate to the login page.
 *
 * Dependencies:
 * - useState: React hook to manage state variables.
 * - useNavigate: React hook to navigate between routes.
 * - createUserWithEmailAndPassword: Firebase function to create a user with email and password.
 * - updateProfile: Firebase function to update the user's profile.
 * - signInWithPopup: Firebase function to sign in with a popup (Google authentication).
 * - toast: Function to display success or error messages.
 * - EyeIcon, EyeOffIcon: Icons to show/hide password.
 * - Toaster: Component to display toast messages.
 * - Link: React Router component to navigate to the login page.
 *
 * @component
 */
function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const signUp = async () => {
    try{
      setLoading(true);
      setError("");

     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     await updateProfile(userCredential.user, {displayName: username});
      setLoading(false);
      console.log(userCredential)
      toast.success("Sign up Succesfull")
      navigate("/login");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
      setLoading(false);
    }
  }

  const signUpWithGoogle = async () => {
    try {
      setLoading(true);
      setError("");

      const userCredential = await signInWithPopup(
        auth, googleProvider
      );
      const user = userCredential.user;
      const displayName = user.displayName
        ? user.displayName.split(" ")[0]
        : "User";
      console.log("User's first name:", displayName);

      toast.success(`Welcome, ${displayName}!`);
      setLoading(false);
      toast.success("Sign up Succesfull");
      navigate("/todo");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(); 
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Toaster/>
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          {error && (
            <p className="mt-2 text-center text-red-600 text-sm">{error}</p>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="pt-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div className="pt-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="relative pt-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="mt-3 absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={signUpWithGoogle}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
