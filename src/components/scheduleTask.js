

// //trial3
// import React, { useState, useEffect } from 'react';
// import './CV.css';
// import { toast } from 'react-toastify';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import TaskListProgress from './TaskListProgress';
// import LoggedInNavBar from './LoggedInNavBar';
// import ScheduleTasksList from './ScheduleTaskList';
// const ScheduleTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [endTimes, setEndTimes] = useState({});
//   const [date, setDate] = useState(new Date());
//   const [scheduledTasks, setScheduledTasks] = useState({});
//   const [daysBefore, setDaysBefore] = useState(1);
 
//   useEffect(() => {
//     const fetchEndTimes = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/end/getEndTime', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setEndTimes(data.endTimes);
//         } else {
//           toast.error('Error fetching end times. Please try again.');
//         }
//       } catch (error) {
//         toast.error('Failed to fetch end times. Server error.');
//       }
//     };

//     const fetchTasks = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/task/myTasks', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (response.ok) {
//           const tasksData = await response.json();
//           setTasks(tasksData);
//         } else {
//           toast.error('Error fetching tasks. Please try again.');
//         }
//       } catch (error) {
//         toast.error('Failed to fetch tasks. Server error.');
//       }
//     };

//     fetchEndTimes();
//     fetchTasks();
//   }, []);

//   const dayMapping = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//   const scheduleTasks = () => {
//     if (tasks.length === 0 || Object.keys(endTimes).length === 0) {
//       toast.error('No tasks or end times available for scheduling');
//       return;
//     }

//     const scheduledTasksMap = {};
//     // const scheduledTasks = tasks.map((task) => {
//     //   const dueDate = new Date(task.dueDate);
//     //   const dayOfWeek = dueDate.getDay();
//     //   let dayString = dayMapping[dayOfWeek];
//     //   let userEndTime = endTimes[dayString];

//     //   if (!userEndTime) {
//     //     toast.error(`No end time specified for ${dayString}`);
//     //     return task;
//     //   }

//     //   const [hours, minutes] = userEndTime.split(':').map(Number);
//     //   const userEndDateTime = new Date(dueDate);
//     //   userEndDateTime.setHours(hours, minutes, 0, 0);

//     //   const scheduledDate = new Date(dueDate);
//     //   scheduledDate.setDate(dueDate.getDate() - daysBefore);

//     //   let startTime = new Date(userEndDateTime);
//     //   startTime.setHours(startTime.getHours() + 2);

//     //   const workDuration = 1.5 * 60 * 60 * 1000;
//     //   const breakDuration = 25 * 60 * 1000;

//     //   task.scheduledStartTime = new Date(scheduledDate.getTime() + 2 * 60 * 60 * 1000);
//     //   task.scheduledEndTime = new Date(task.scheduledStartTime.getTime() + workDuration);
//     //   task.scheduledBreakStartTime = task.scheduledEndTime;
//     //   task.scheduledBreakEndTime = new Date(task.scheduledBreakStartTime.getTime() + breakDuration);

//     //   const taskDateString = scheduledDate.toISOString().split('T')[0];
//     //   if (!scheduledTasksMap[taskDateString]) {
//     //     scheduledTasksMap[taskDateString] = [];
//     //   }
//     //   scheduledTasksMap[taskDateString].push(task);

//     //   return task;
//     // });
//     const scheduledTasks = tasks.map((task) => {
//       const dueDate = new Date(task.dueDate);
    
//       // Skip tasks that are overdue
//       if (dueDate < new Date()) {
//         return task; // Return the original task if it's overdue
//       }
    
//       const dayOfWeek = dueDate.getDay();
//       let dayString = dayMapping[dayOfWeek];
//       let userEndTime = endTimes[dayString];
    
//       if (!userEndTime) {
//         toast.error(`No end time specified for ${dayString}`);
//         return task;
//       }
    
//       const [hours, minutes] = userEndTime.split(':').map(Number);
//       const userEndDateTime = new Date(dueDate);
//       userEndDateTime.setHours(hours, minutes, 0, 0);
    
//       const scheduledDate = new Date(dueDate);
//       scheduledDate.setDate(dueDate.getDate() - daysBefore);
    
//       // Calculate start time as 2 hours after the user's end time
//       const workDuration = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds
//       const breakDuration = 25 * 60 * 1000; // 25 minutes in milliseconds
    
//       // Schedule times
//       task.scheduledStartTime = new Date(scheduledDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
//       task.scheduledEndTime = new Date(task.scheduledStartTime.getTime() + workDuration);
//       task.scheduledBreakStartTime = task.scheduledEndTime;
//       task.scheduledBreakEndTime = new Date(task.scheduledBreakStartTime.getTime() + breakDuration);
    
//       // Create a mapping for scheduled tasks based on the date
//       const taskDateString = scheduledDate.toISOString().split('T')[0];
//       if (!scheduledTasksMap[taskDateString]) {
//         scheduledTasksMap[taskDateString] = [];
//       }
//       scheduledTasksMap[taskDateString].push(task);
    
//       return task;
//     });
    
//     setScheduledTasks(scheduledTasksMap);
//     setTasks(scheduledTasks);
//     toast.success('Tasks scheduled successfully!');
//   };


// //frontend api
//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//   };
// const updateScheduledDateOnServer = async (taskId, updatedData) => {
//   try {
//     const response = await fetch(`http://localhost:5000/task/updateScheduledDate/${taskId}`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData), // Send updated scheduled start time
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update scheduled date');
//     }

//     const updatedTask = await response.json();
//     return updatedTask; // Return the updated task data
//   } catch (error) {
//     console.error('Error updating scheduled date:', error);
//     throw error; // Rethrow the error for further handling
//   }
// };


//   return (
//   <div>
//     <LoggedInNavBar/>
//     <div className="layout-container">
     
//       {/* First Column: Tasks */}
//       <div className="tasks-column">
     
//         <TaskListProgress/>
//       </div>

//       {/* Second Column: Schedule Button */}
//       {/* <div className="schedule-column">
       
//         <button  class="schedule-button" onClick={scheduleTasks}>Schedule Tasks</button>
//         <h4>Scheduled Tasks</h4>
//         {Object.keys(scheduledTasks).map((date, index) => (
//           <div key={index}>
//             <h4>{new Date(date).toLocaleDateString()}</h4>
//             {scheduledTasks[date].map((task, taskIndex) => (
//               <div key={taskIndex}>
//                 <div className="task-card" style={{ backgroundColor: 'lightyellow' }}>
//                   <h4>{task.subject}</h4>
//                   <p>Scheduled Start: {task.scheduledStartTime.toLocaleTimeString()}</p>
//                   <p>Scheduled End: {task.scheduledEndTime.toLocaleTimeString()}</p>
//                 </div>
//                 <div className="task-card" style={{ backgroundColor: 'lightpurple' }}>
//                   <h4>Relax Break</h4>
//                   <p>Break Start: {task.scheduledBreakStartTime.toLocaleTimeString()}</p>
//                   <p>Break End: {task.scheduledBreakEndTime.toLocaleTimeString()}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
          
//       </div> */}
//           <div className="schedule-column">
//       <button className="schedule-button" onClick={scheduleTasks}>Schedule Tasks</button>
//       <h4>Scheduled Tasks</h4>
//       {currentTasks.length === 0 ? (
//         <p>No tasks scheduled yet.</p>
//       ) : (
//         currentTasks.map((date, index) => (
//           <div key={index}>
//             <h4>{new Date(date).toLocaleDateString()}</h4>
//             {scheduledTasks[date].map((task, taskIndex) => (
//               <div key={taskIndex}>
//                 <div className="task-card" style={{ backgroundColor: 'lightyellow' }}>
//                   <h4>{task.subject}</h4>
//                   <p>Scheduled Start: {task.scheduledStartTime.toLocaleTimeString()}</p>
//                   <p>Scheduled End: {task.scheduledEndTime.toLocaleTimeString()}</p>
//                 </div>
//                 <div className="task-card" style={{ backgroundColor: 'lightpurple' }}>
//                   <h4>Relax Break</h4>
//                   <p>Break Start: {task.scheduledBreakStartTime.toLocaleTimeString()}</p>
//                   <p>Break End: {task.scheduledBreakEndTime.toLocaleTimeString()}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))
//       )}

  
//     </div>
     


//       {/* Third Column: Calendar */}
//       <div className="calendar-column">
//         <h3>Select Date</h3>
//         <Calendar onChange={handleDateChange} value={date} tileContent={({ date }) => renderTileContent(date)} />
//       </div>
//     </div></div>
//   );

//   // function getPriorityColor(priority) {
//   //   switch (priority) {
//   //     case 'high':
//   //       return 'red';
//   //     case 'medium':
//   //       return 'orange';
//   //     case 'low':
//   //       return 'green';
//   //     default:
//   //       return 'gray';
//   //   }
//   // }

//   function renderTileContent(date) {
//     const dateString = date.toISOString().split('T')[0];
//     if (scheduledTasks[dateString]) {
//       return <span className="dot"></span>;
//     }
//     return null;
//   }
 
// };

// export default ScheduleTasks;

//good one

import React, { useState, useEffect } from 'react';
import './CV.css';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskListProgress from './TaskListProgress';
import LoggedInNavBar from './LoggedInNavBar';
import ScheduleTasksList from './ScheduleTaskList';

const ScheduleTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [endTimes, setEndTimes] = useState({});
  const [date, setDate] = useState(new Date());
  const [scheduledTasks, setScheduledTasks] = useState({});
  const [daysBefore, setDaysBefore] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  useEffect(() => {
    const fetchEndTimes = async () => {
      try {
        const response = await fetch('http://localhost:5000/end/getEndTime', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEndTimes(data.endTimes);
        } else {
          toast.error('Error fetching end times. Please try again.');
        }
      } catch (error) {
        toast.error('Failed to fetch end times. Server error.');
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/task/myTasks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const tasksData = await response.json();
          setTasks(tasksData);
        } else {
          toast.error('Error fetching tasks. Please try again.');
        }
      } catch (error) {
        toast.error('Failed to fetch tasks. Server error.');
      }
    };

    fetchEndTimes();
    fetchTasks();
  }, []);

  const dayMapping = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const scheduleTasks = () => {
    if (tasks.length === 0 || Object.keys(endTimes).length === 0) {
      toast.error('No tasks or end times available for scheduling');
      return;
    }

    const scheduledTasksMap = {};
    
    const scheduledTasks = tasks.map((task) => {
      const dueDate = new Date(task.dueDate);
    
      // Skip tasks that are overdue
      if (dueDate < new Date()) {
        return task; // Return the original task if it's overdue
      }
    
      const dayOfWeek = dueDate.getDay();
      let dayString = dayMapping[dayOfWeek];
      let userEndTime = endTimes[dayString];
    
      if (!userEndTime) {
        toast.error(`No end time specified for ${dayString}`);
        return task;
      }
    
      const [hours, minutes] = userEndTime.split(':').map(Number);
      const userEndDateTime = new Date(dueDate);
      userEndDateTime.setHours(hours, minutes, 0, 0);
    
      const scheduledDate = new Date(dueDate);
      scheduledDate.setDate(dueDate.getDate() - daysBefore);
    
      // Calculate start time as 2 hours after the user's end time
      const workDuration = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds
      const breakDuration = 25 * 60 * 1000; // 25 minutes in milliseconds
    
      // Schedule times
      task.scheduledStartTime = new Date(scheduledDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
      task.scheduledEndTime = new Date(task.scheduledStartTime.getTime() + workDuration);
      task.scheduledBreakStartTime = task.scheduledEndTime;
      task.scheduledBreakEndTime = new Date(task.scheduledBreakStartTime.getTime() + breakDuration);
    
      // Create a mapping for scheduled tasks based on the date
      const taskDateString = scheduledDate.toISOString().split('T')[0];
      if (!scheduledTasksMap[taskDateString]) {
        scheduledTasksMap[taskDateString] = [];
      }
      scheduledTasksMap[taskDateString].push(task);
    
      return task;
    });
    
    setScheduledTasks(scheduledTasksMap);
    setTasks(scheduledTasks);
    toast.success('Tasks scheduled successfully!');
  };

  // Frontend API
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Get the keys (dates) of scheduled tasks
  const scheduledDates = Object.keys(scheduledTasks);
  const totalPages = Math.ceil(scheduledDates.length / itemsPerPage);
  
  // Get the current tasks based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = scheduledDates.slice(startIndex, endIndex);

  return (
    <div>
      <LoggedInNavBar />
      <div className="layout-container">
        {/* First Column: Tasks */}
        <div className="tasks-column">
          <TaskListProgress />
        </div>

        {/* Second Column: Schedule Button */}
        <div className="schedule-column">
          <button className="schedule-button" onClick={scheduleTasks}>Schedule Tasks</button>
          <h4>Scheduled Tasks</h4>
          {currentTasks.length === 0 ? (
            <p>No tasks scheduled yet.</p>
          ) : (
            currentTasks.map((date, index) => (
              <div key={index}>
                <h4>{new Date(date).toLocaleDateString()}</h4>
                {scheduledTasks[date].map((task, taskIndex) => (
                  <div key={taskIndex}>
                    <div className="task-card" style={{ backgroundColor: 'lightyellow' }}>
                      <h4>{task.subject}</h4>
                      <p>Scheduled Start: {task.scheduledStartTime.toLocaleTimeString()}</p>
                      <p>Scheduled End: {task.scheduledEndTime.toLocaleTimeString()}</p>
                    </div>
                    <div className="task-card" style={{ backgroundColor: '#CBC3E3' }}>
                      <h4>Relax Break</h4>
                      <p>Break Start: {task.scheduledBreakStartTime.toLocaleTimeString()}</p>
                      <p>Break End: {task.scheduledBreakEndTime.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}

          {/* Pagination Controls */}
          <div className="pagination-controls">
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            )}
          </div>
        </div>

        {/* Third Column: Calendar */}
        <div className="calendar-column">
          <h3>Select Date</h3>
          <Calendar onChange={handleDateChange} value={date} tileContent={({ date }) => renderTileContent(date)} />
        </div>
      
      </div>
    </div>
  );

  function renderTileContent(date) {
    const dateString = date.toISOString().split('T')[0];
    if (scheduledTasks[dateString]) {
      return <span className="dot"></span>;
    }
    return null;
  }
};

export default ScheduleTasks;



