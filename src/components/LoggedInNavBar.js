import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userImage from "../media/user.png";
import { useAuth } from "../context/authContext"; // Import the hook

const LoggedInNavBar = () => {
  const { user } = useAuth(); // Get user from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("Guest");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Update the username based on the user object from context
    if (user) {
      setUsername("Hello"); // Assuming user has a username property
    } else {
      setUsername("Guest");
    }
  }, [user]); // Runs whenever the user object changes

  return (
    <>
      {/* Navbar Component */}
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
            {/* <li>
              <Link to="/relaxation" className="btn btn-outline">
                Relaxation Corner
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Navbar End with Avatar */}
        <div className="navbar-end flex items-center space-x-4">
          <div className="relative">
            <div className="avatar cursor-pointer" onClick={toggleDropdown}>
              <div className="w-12 rounded-full">
                <img src={userImage} alt="Avatar" />
              </div>
            </div>
            {/* User Info Card */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                {/* <p className="text-sm font-medium">{username}</p> */}
                {/* Additional user info can be added here, e.g. links to profile or settings */}
                {/* <Link to="/profile" className="block text-sm text-blue-600 hover:underline">Profile</Link> */}
                <Link
                  to="/"
                  className="block text-sm text-red-600 hover:underline"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggedInNavBar;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import userImage from '../media/user.png';
// import { useAuth } from '../context/authContext'; // Import the hook

// const LoggedInSidebar = ({ onSelect }) => {
//   const { user } = useAuth(); // Get user from context
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [username, setUsername] = useState('Guest');

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     if (user) {
//       setUsername("Hello"); // Assuming user has a username property
//     } else {
//       setUsername('Guest');
//     }
//   }, [user]); // Runs whenever the user object changes

//   return (
//     <div className="w-64 h-screen bg-white text-gray-800 shadow-lg relative"> {/* Sidebar Component */}
//       <div className="flex items-center p-4 border-b border-gray-300">
//         <div className="avatar cursor-pointer" onClick={toggleDropdown}>
//           <div className="w-12 h-12 rounded-full overflow-hidden">
//             <img src={userImage} alt="Avatar" className="object-cover" />
//           </div>
//         </div>
//         <div className="ml-3">
//           <p className="text-lg font-semibold">{username}</p>
//         </div>
//       </div>

//       {/* User Info Dropdown */}
//       {isDropdownOpen && (
//         <div className="absolute left-64 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
//           <Link to="/profile" className="block text-sm text-blue-600 hover:underline">Profile</Link>
//           <Link to="/" className="block text-sm text-red-600 hover:underline">Logout</Link>
//         </div>
//       )}

//       {/* Navigation Links with space between buttons */}
//       <ul className="menu p-4 space-y-4"> {/* Added space between buttons */}
//         <li>
//           <Link to="/tasks" className="btn w-full" onClick={() => onSelect('tasks')}>
//             Tasks
//           </Link>
//         </li>
//         <li>
//           <Link to="/water-intake" className="btn w-full" onClick={() => onSelect('water-intake')}>
//             Water Intake
//           </Link>
//         </li>
//         <li>
//           <Link to="/meets" className="btn w-full" onClick={() => onSelect('meets')}>
//             Meets
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default LoggedInSidebar;
