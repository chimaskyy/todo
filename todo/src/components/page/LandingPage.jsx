import { CheckCircle, Clock, Bell, ListTodo } from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600">
            Welcome to TodoMaster
          </div>
          <div className="text-xl mt-2">
            Your personal productivity companion
          </div>
        </div>
        <div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <FeatureCard
              icon={<ListTodo className="h-6 w-6 text-blue-500" />}
              title="Organize Your Tasks"
              description="Easily add, update, and delete todos to keep your life organized."
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-blue-500" />}
              title="Set Time Limits"
              description="Add time limits to your tasks and track remaining time effortlessly."
            />
            <FeatureCard
              icon={<Bell className="h-6 w-6 text-blue-500" />}
              title="Smart Reminders"
              description="Get timely reminders for upcoming tasks and daily planning."
            />
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-blue-500" />}
              title="Track Completion"
              description="Mark tasks as complete and celebrate your productivity."
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out w-full sm:w-auto"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out w-full sm:w-auto"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
 return (
   <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
     <div className="p-6">
       <div className="flex items-center gap-3 mb-4">
         <div className="text-blue-500 bg-blue-100 p-2 rounded-full">
           {icon}
         </div>
         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
       </div>
       <div>
         <p className="text-gray-600 leading-relaxed">{description}</p>
       </div>
     </div>
   </div>
 );
}

export default LandingPage;
