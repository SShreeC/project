


// import React, { useState } from 'react';

// const ScheduleTasksList = ({ scheduledTasks }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const tasksPerPage = 2; // Display 2 tasks per page

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) =>
//       Math.min(prevPage + 1, Math.ceil(Object.keys(scheduledTasks).length / tasksPerPage) - 1)
//     );
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
//   };

//   const currentTasks = Object.keys(scheduledTasks).slice(
//     currentPage * tasksPerPage,
//     (currentPage + 1) * tasksPerPage
//   );

//   return (
//     <div>
//       {/* Title */}
//       <h4>Scheduled Tasks</h4>

//       {/* Task List */}
//       {currentTasks.length === 0 ? (
//         <p>No tasks scheduled yet.</p>
//       ) : (
//         currentTasks.map((date, index) => (
//           <div key={index}>
//             <h4>{new Date(date).toLocaleDateString()}</h4>
//             {scheduledTasks[date].map((task, taskIndex) => (
//               <div key={taskIndex} style={{ margin: '10px 0' }}>
//                 {/* Task Card */}
//                 <div
//                   className="task-card"
//                   style={{
//                     backgroundColor: 'lightyellow',
//                     margin: '10px',
//                     padding: '10px',
//                     borderRadius: '5px',
//                   }}
//                 >
//                   <h4>{task.subject}</h4>
//                   <p>Scheduled Start: {task.scheduledStartTime.toLocaleTimeString()}</p>
//                   <p>Scheduled End: {task.scheduledEndTime.toLocaleTimeString()}</p>
//                 </div>

//                 {/* Break Card */}
//                 <div
//                   className="task-card"
//                   style={{
//                     backgroundColor: '#CBC3E3',
//                     margin: '10px',
//                     padding: '10px',
//                     borderRadius: '5px',
//                   }}
//                 >
//                   <h4>Relax Break</h4>
//                   <p>Break Start: {task.scheduledBreakStartTime.toLocaleTimeString()}</p>
//                   <p>Break End: {task.scheduledBreakEndTime.toLocaleTimeString()}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))
//       )}

//       {/* Pagination Buttons */}
//       <div style={{ marginTop: '20px' }}>
//         <button onClick={handlePreviousPage} disabled={currentPage === 0}>
//           Previous
//         </button>
//         <button
//           onClick={handleNextPage}
//           disabled={(currentPage + 1) * tasksPerPage >= Object.keys(scheduledTasks).length}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ScheduleTasksList;
import React, { useState } from 'react';

const ScheduleTasksList = ({ scheduledTasks }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 2; // Display 2 tasks per page

  const totalTasks = Object.keys(scheduledTasks).length; // Total number of unique dates
  const totalPages = Math.ceil(totalTasks / tasksPerPage); // Total number of pages

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const currentTasks = Object.keys(scheduledTasks).slice(
    currentPage * tasksPerPage,
    (currentPage + 1) * tasksPerPage
  );

  return (
    <div>
      {/* Task List */}
      {currentTasks.length === 0 ? (
        <p>No tasks scheduled yet.</p>
      ) : (
        currentTasks.map((date, index) => (
          <div key={index}>
            <h4>{new Date(date).toLocaleDateString()}</h4>
            {scheduledTasks[date].slice(0, tasksPerPage).map((task, taskIndex) => (
              <div key={taskIndex} style={{ margin: '10px 0' }}>
                {/* Task Card */}
                <div
                  className="task-card"
                  style={{
                    backgroundColor: 'lightyellow',
                    margin: '10px',
                    padding: '10px',
                    borderRadius: '5px',
                  }}
                >
                  <h4>{task.subject}</h4>
                  <p>Scheduled Start: {task.scheduledStartTime.toLocaleTimeString()}</p>
                  <p>Scheduled End: {task.scheduledEndTime.toLocaleTimeString()}</p>
                </div>

                {/* Break Card */}
                <div
                  className="task-card"
                  style={{
                    backgroundColor: '#CBC3E3',
                    margin: '10px',
                    padding: '10px',
                    borderRadius: '5px',
                  }}
                >
                  <h4>Relax Break</h4>
                  <p>Break Start: {task.scheduledBreakStartTime.toLocaleTimeString()}</p>
                  <p>Break End: {task.scheduledBreakEndTime.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {/* Pagination Arrows */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          style={{ cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
        >
          &#8592; {/* Left Arrow */}
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          style={{ cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
        >
          &#8594; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default ScheduleTasksList;
