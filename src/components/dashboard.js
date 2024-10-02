import React from 'react';
import LoggedInNavBar from './LoggedInNavBar';
import MainComponent from './MainComponent';
const dashboard=()=> {
  return (
    <div>
      <LoggedInNavBar />
     {/* <MainComponent/>  */}
    </div>
  );
}

export default dashboard;
// import React from 'react';
// import LoggedInNavBar from './LoggedInNavBar';

// const dashboard = () => {
//   return (
//     <div>
//       <LoggedInNavBar />
//       <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Card 1 */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h2 className="text-xl font-bold">Card Title 1</h2>
//           <p className="mt-2">This is a description for Card 1.</p>
//         </div>

//         {/* Card 2 */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h2 className="text-xl font-bold">Card Title 2</h2>
//           <p className="mt-2">This is a description for Card 2.</p>
//         </div>

//         {/* Card 3 */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h2 className="text-xl font-bold">Card Title 3</h2>
//           <p className="mt-2">This is a description for Card 3.</p>
//         </div>

//         {/* Card 4 */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h2 className="text-xl font-bold">Card Title 4</h2>
//           <p className="mt-2">This is a description for Card 4.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default dashboard;
// import React, { useState } from 'react';
// import LoggedInSidebar from './LoggedInNavBar';
// import MainComponent from './MainComponent';
// const Dashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('tasks'); // Default component to render

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'tasks':
//         return <MainComponent />;
//       case 'water-intake':
//         return <WaterIntake />;
//       case 'meets':
//         return <Meets />;
//       // default:
//       //   return <Tasks />; // Fallback to tasks if nothing matches
//     }
//   };

//   return (
//     <div className="flex">
//       <LoggedInSidebar onSelect={setActiveComponent} />
//       {/* Content Area */}
//       <div className="flex-grow p-6 bg-gray-100">
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
