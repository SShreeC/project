import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const SubjectEndTimeList = ({ userId }) => {
  const [subjects, setSubjects] = useState([]);

  // Fetch subjects and end times for the logged-in user
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/tasks/subjects?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based authentication
      },
    })
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => toast.error('Error fetching data.'));
  }, [userId]);

  // Update a subject for the logged-in user
  const updateSubject = (id, newName) => {
    fetch(`http://localhost:5000/tasks/subjects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: newName, userId }), // Include userId in the payload
    })
      .then((response) => {
        if (response.ok) {
          setSubjects((prev) =>
            prev.map((subject) =>
              subject.id === id ? { ...subject, name: newName } : subject
            )
          );
          toast.success('Subject updated successfully!');
        } else {
          toast.error('Failed to update subject.');
        }
      });
  };

  // Delete a subject for the logged-in user
  const deleteSubject = (id) => {
    fetch(`http://localhost:5000/tasks/subjects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setSubjects((prev) => prev.filter((subject) => subject.id !== id));
          toast.success('Subject deleted successfully!');
        } else {
          toast.error('Failed to delete subject.');
        }
      });
  };

  // Update end time for a specific subject
  const updateEndTime = (subjectId, endTimeId, newTime) => {
    fetch(`http://localhost:5000/end/addEndTime/${endTimeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ time: newTime, userId, subjectId }), // Include userId and subjectId in the payload
    })
      .then((response) => {
        if (response.ok) {
          setSubjects((prev) =>
            prev.map((subject) => {
              if (subject.id === subjectId) {
                return {
                  ...subject,
                  end_times: subject.end_times.map((endTime) =>
                    endTime.id === endTimeId ? { ...endTime, time: newTime } : endTime
                  ),
                };
              }
              return subject;
            })
          );
          toast.success('End time updated successfully!');
        } else {
          toast.error('Failed to update end time.');
        }
      });
  };

  // Delete an end time for a specific subject
  const deleteEndTime = (subjectId, endTimeId) => {
    fetch(`http://localhost:5000/end/addEndTime/${endTimeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setSubjects((prev) =>
            prev.map((subject) => {
              if (subject.id === subjectId) {
                return {
                  ...subject,
                  end_times: subject.end_times.filter((endTime) => endTime.id !== endTimeId),
                };
              }
              return subject;
            })
          );
          toast.success('End time deleted successfully!');
        } else {
          toast.error('Failed to delete end time.');
        }
      });
  };

  return (
    <div>
      <h2>Subjects and End Times</h2>
      {subjects.length > 0 ? (
        subjects.map((subject) => (
          <div key={subject.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <input
              type="text"
              value={subject.name}
              onChange={(e) => updateSubject(subject.id, e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button onClick={() => deleteSubject(subject.id)}>Delete Subject</button>
            <ul>
              {subject.end_times.map((endTime) => (
                <li key={endTime.id} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                  <input
                    type="text"
                    value={endTime.time}
                    onChange={(e) => updateEndTime(subject.id, endTime.id, e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  <span>{endTime.day}</span>
                  <button onClick={() => deleteEndTime(subject.id, endTime.id)} style={{ marginLeft: '10px' }}>
                    Delete End Time
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No subjects found for this user.</p>
      )}
    </div>
  );
};

export default SubjectEndTimeList;
