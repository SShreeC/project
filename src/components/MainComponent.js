
// import React, { useState } from 'react'; 
// import SubjectInputCard from './SubjectInputCard';
// import TaskForm from './TaskForm';
// import CalendarView from './CalendarView'; 
// import TaskList from './TaskList';
// import LoggedInNavBar from './LoggedInNavBar';
// import './CV.css'; 
// import SubjectEndTimeList from './SubjectEndTimeList';

// const MainComponent = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [tasks, setTasks] = useState([]);

//   const handleAddSubject = (subject) => {
//     setSubjects([...subjects, subject]);
//   };

//   const handleDone = () => {
//     setShowTaskForm(true);
//   };

//   const handleTaskSubmit = (task) => {
//     setTasks([...tasks, task]);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Optional Navbar */}
//       <LoggedInNavBar />
      
//       <div className="flex flex-col lg:flex-row flex-grow gap-4 p-4 overflow-y-auto">
//         {/* Left Column: Task List */}
//         <div className="card bg-base-300 rounded-box flex-grow max-w-full lg:max-w-md">
//           <h2 className="text-lg font-bold mb-4">Task List</h2>
//           <TaskList tasks={tasks} />
//         </div>

//         {/* Center Column: Subject Input or Task Form */}
//         <div className="card bg-base-300 rounded-box flex-grow max-w-full lg:max-w-md">
//           {!showTaskForm ? (
//             <SubjectInputCard onAddSubject={handleAddSubject} onDone={handleDone} />
//           ) : (
//             <TaskForm subjects={subjects} onSubmit={handleTaskSubmit} />
//           )}
//         </div>

//         {/* Right Column: Calendar View */}
//         {showTaskForm && (
//           <div className="card bg-base-300 rounded-box flex-grow max-w-full lg:max-w-md">
//             <CalendarView tasks={tasks} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MainComponent;
import React, { useState } from 'react'; 
import SubjectInputCard from './SubjectInputCard';
import TaskForm from './TaskForm';
import CalendarView from './CalendarView'; 
import TaskList from './TaskList';
import LoggedInNavBar from './LoggedInNavBar';
import './CV.css'; 
import SubjectEndTimeList from './SubjectEndTimeList';

const MainComponent = () => {
  const [subjects, setSubjects] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  const handleDone = () => {
    setShowTaskForm(true);
  };

  const handleTaskSubmit = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Optional Navbar */}
      <LoggedInNavBar />
      
      <div className="flex flex-col lg:flex-row flex-grow gap-6 p-6 overflow-y-auto">
        {/* Left Column: Task List */}
        <div className="card bg-base-300 rounded-box flex-grow max-w-full lg:max-w-lg">
          <h2 className="text-lg font-bold mb-4">Task List</h2>
          <TaskList tasks={tasks} />
        </div>

        {/* Center Column: Subject Input or Task Form */}
        <div className="card bg-base-300 rounded-box flex-grow max-w-full lg:max-w-lg">
          {!showTaskForm ? (
            <SubjectInputCard onAddSubject={handleAddSubject} onDone={handleDone} />
          ) : (
            <TaskForm subjects={subjects} onSubmit={handleTaskSubmit} />
          )}
        </div>

        {/* Right Column: Calendar View */}
        {showTaskForm && (
          <div className="card bg-base-300 rounded-box flex-grow max-w-full lg:max-w-lg">
            <CalendarView tasks={tasks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
