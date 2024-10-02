
import React from 'react';
import { Link } from 'react-router-dom';
import userImage from '../media/user.png';
import { useAuth } from '../context/authContext'; // Import the hook

const NavBar = () => {
  const { user } = useAuth(); // Get user from context

  return (
    <div className="navbar bg-base-100 shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Dropdown for mobile view */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Mobile Links */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/water-intake">Water Intake</Link>
            </li>
            <li>
              <Link to="/meets">Meets</Link>
            </li>
            {user ? (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            ) : (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            )}
          </ul>
        </div>
        {/* Brand Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Task Manager
        </Link>
      </div>

      {/* Navbar Center for Desktop Links */}
      <div className="navbar-center hidden lg:flex justify-end">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link to="/tasks" className="btn btn-outline">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/water-intake" className="btn btn-outline">
              Water Intake
            </Link>
          </li>
          <li>
            <Link to="/meets" className="btn btn-outline">
              Meets
            </Link>
          </li>
          {user ? (
            <li>
              <Link to="/profile" className="btn btn-outline">
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/auth" className="btn btn-outline">
                ChatBox
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End with Avatar and Username */}
      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={userImage} alt="Avatar" />
              </div>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{user.username}</p> {/* Display username */}
            </div>
          </div>
        ) : (
          <Link to="/auth" className="btn btn-outline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import userImage from '../media/user.png';
// import { useAuth } from '../context/authContext'; // Import the hook
// import { FaBars, FaTimes, FaTasks, FaWater, FaUser, FaSignInAlt, FaVideo } from 'react-icons/fa'; // Import icons

// const SideNav = () => {
//   const { user } = useAuth(); // Get user from context
//   const [isOpen, setIsOpen] = useState(false); // State to toggle the sidenav

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg transition-transform ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0 w-64 lg:w-72 p-5 z-50`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold tracking-wide">Task Manager</h2>
//           <button className="lg:hidden text-2xl focus:outline-none" onClick={toggleSidebar}>
//             <FaTimes />
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <ul className="menu p-0 space-y-4">
//           <li>
//             <Link to="/tasks" className="flex items-center p-3 space-x-3 rounded-md hover:bg-blue-700 transition duration-300">
//               <FaTasks className="text-xl" />
//               <span className="font-medium text-lg">Tasks</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/water-intake" className="flex items-center p-3 space-x-3 rounded-md hover:bg-blue-700 transition duration-300">
//               <FaWater className="text-xl" />
//               <span className="font-medium text-lg">Water Intake</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/meets" className="flex items-center p-3 space-x-3 rounded-md hover:bg-blue-700 transition duration-300">
//               <FaVideo className="text-xl" />
//               <span className="font-medium text-lg">Meets</span>
//             </Link>
//           </li>
//           {user ? (
//             <li>
//               <Link to="/profile" className="flex items-center p-3 space-x-3 rounded-md hover:bg-blue-700 transition duration-300">
//                 <FaUser className="text-xl" />
//                 <span className="font-medium text-lg">Profile</span>
//               </Link>
//             </li>
//           ) : (
//             <li>
//               <Link to="/auth" className="flex items-center p-3 space-x-3 rounded-md hover:bg-blue-700 transition duration-300">
//                 <FaSignInAlt className="text-xl" />
//                 <span className="font-medium text-lg">Login</span>
//               </Link>
//             </li>
//           )}
//         </ul>

//         {/* User Info */}
//         {user && (
//           <div className="absolute bottom-6 left-6 flex items-center space-x-3 p-3 bg-blue-700 rounded-lg">
//             <div className="avatar">
//               <div className="w-10 rounded-full border-2 border-white">
//                 <img src={userImage} alt="Avatar" />
//               </div>
//             </div>
//             <div>
//               <p className="text-sm font-medium">{user.username}</p>
//               <p className="text-xs text-gray-200">Active User</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content Overlay */}
//       <div className={`flex-1 bg-gray-100 transition-all ${isOpen ? 'ml-64 lg:ml-72' : 'ml-0 lg:ml-72'}`}>
//         <div className="h-full p-6">
//           {/* Toggle Button for Small Screens */}
//           <button
//             className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
//             onClick={toggleSidebar}
//           >
//             <FaBars />
//           </button>

//           {/* Main Content */}
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard!</h1>
//           {/* Add your main dashboard content here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideNav;
