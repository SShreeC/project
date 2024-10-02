// ScheduleTasksList.js
import React, { useState } from 'react';

const ScheduleTasksList = ({ scheduledTasks }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 5; // Display 5 tasks per page

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(Object.keys(scheduledTasks).length / tasksPerPage) - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const currentTasks = Object.keys(scheduledTasks).slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage);

  return (
    <div>
      {currentTasks.length === 0 ? (
        <p>No scheduled tasks available.</p>
      ) : (
        currentTasks.map((date, index) => (
          <div key={index}>
            <h4>{new Date(date).toLocaleDateString()}</h4>
            {scheduledTasks[date].map((task, taskIndex) => (
              <div key={taskIndex} className="task-card" style={{ backgroundColor: 'lightyellow', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                <h4>{task.subject}</h4>
                <p>Scheduled Start: {task.scheduledStartTime.toLocaleTimeString()}</p>
                <p>Scheduled End: {task.scheduledEndTime.toLocaleTimeString()}</p>
                <h4>Relax Break</h4>
                <p>Break Start: {task.scheduledBreakStartTime.toLocaleTimeString()}</p>
                <p>Break End: {task.scheduledBreakEndTime.toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        ))
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
        <button onClick={handleNextPage} disabled={(currentPage + 1) * tasksPerPage >= Object.keys(scheduledTasks).length}>Next</button>
      </div>
    </div>
  );
};

export default ScheduleTasksList;
