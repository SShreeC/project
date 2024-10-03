
import React, { useState, useEffect } from 'react';
import './CV.css';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskListProgress from './TaskListProgress';
import LoggedInNavBar from './LoggedInNavBar';
import ScheduleTasksList from './ScheduleTaskList';
import RelaxationCorner from './RelaxationCorner'; // Assuming you have a RelaxationCorner component

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

    tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);

      if (dueDate < new Date()) {
        return;
      }

      const dayOfWeek = dueDate.getDay();
      const dayString = dayMapping[dayOfWeek];
      const userEndTime = endTimes[dayString];

      if (!userEndTime) {
        toast.error(`No end time specified for ${dayString}`);
        return;
      }

      const [hours, minutes] = userEndTime.split(':').map(Number);
      const userEndDateTime = new Date(dueDate);
      userEndDateTime.setHours(hours, minutes, 0, 0);

      const scheduledDate = new Date(dueDate);
      scheduledDate.setDate(dueDate.getDate() - daysBefore);

      const workDuration = 1.5 * 60 * 60 * 1000;
      const breakDuration = 25 * 60 * 1000;

      let lastEndTime = scheduledDate;

      if (!scheduledTasksMap[scheduledDate.toISOString().split('T')[0]]) {
        scheduledTasksMap[scheduledDate.toISOString().split('T')[0]] = [];
      }

      if (scheduledTasksMap[scheduledDate.toISOString().split('T')[0]].length > 0) {
        const lastTask = scheduledTasksMap[scheduledDate.toISOString().split('T')[0]].slice(-1)[0];
        lastEndTime = lastTask.scheduledBreakEndTime;
      }

      task.scheduledStartTime = new Date(lastEndTime.getTime());
      task.scheduledEndTime = new Date(task.scheduledStartTime.getTime() + workDuration);
      task.scheduledBreakStartTime = task.scheduledEndTime;
      task.scheduledBreakEndTime = new Date(task.scheduledBreakStartTime.getTime() + breakDuration);

      scheduledTasksMap[scheduledDate.toISOString().split('T')[0]].push(task);
    });

    setScheduledTasks(scheduledTasksMap);
    toast.success('Tasks scheduled successfully!');
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const scheduledDates = Object.keys(scheduledTasks);
  const totalPages = Math.ceil(scheduledDates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = scheduledDates.slice(startIndex, endIndex);

  return (
    <div>
      <LoggedInNavBar />
      <div className="layout-container">
        {/* Four columns layout */}
        <div className="column">
          <h4>Task Progress</h4>
          <TaskListProgress />
        </div>
        
        <div className="column">
          <h4>Schedule Tasks</h4>
          <button className="schedule-button" onClick={scheduleTasks}>
            Schedule Tasks
          </button>
          <ScheduleTasksList scheduledTasks={scheduledTasks} />
        </div>

        <div className="column">
          <h3>Select Date</h3>
          {/* <Calendar/> */}
          <Calendar 
          onChange={handleDateChange} 
          value={date}
          tileContent={({ date }) => renderTileContent(date)} />
        </div>

        <div className="column">
        
      <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Take a break! Here are some suggestions:</p>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <li style={{ margin: '5px 0', fontSize: '16px' }}>Meditation</li>
        <li style={{ margin: '5px 0', fontSize: '16px' }}>Stretching exercises</li>
        <li style={{ margin: '5px 0', fontSize: '16px' }}>Listen to music</li>
        <li style={{ margin: '5px 0', fontSize: '16px' }}>Short walk outside</li>
        <li style={{ margin: '5px 0', fontSize: '16px' }}>Playyyy gamesss</li>
      </ul>
    
          <RelaxationCorner /> {/* Assuming this is your relaxation corner component */}
        </div>
      </div>
    </div>
  );

  // function renderTileContent(date) {
  //   const dateString = date.toISOString().split('T')[0];
  //   if (scheduledTasks[dateString]) {
  //     return <span className="dot"></span>;
  //   }
  //   return null;
  // }
};

export default ScheduleTasks;
