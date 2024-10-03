// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// const SubjectEndTimeList = ({ userId }) => {
//   const [subjects, setSubjects] = useState([]);

//   // Fetch subjects and end times for the logged-in user
//   useEffect(() => {
//     if (!userId) return;

//     fetch(`http://localhost:5000/tasks/subjects?userId=${userId}`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based authentication
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setSubjects(data))
//       .catch((err) => toast.error('Error fetching data.'));
//   }, [userId]);

//   // Update a subject for the logged-in user
//   const updateSubject = (id, newName) => {
//     fetch(`http://localhost:5000/tasks/subjects/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify({ name: newName, userId }), // Include userId in the payload
//     })
//       .then((response) => {
//         if (response.ok) {
//           setSubjects((prev) =>
//             prev.map((subject) =>
//               subject.id === id ? { ...subject, name: newName } : subject
//             )
//           );
//           toast.success('Subject updated successfully!');
//         } else {
//           toast.error('Failed to update subject.');
//         }
//       });
//   };

//   // Delete a subject for the logged-in user
//   const deleteSubject = (id) => {
//     fetch(`http://localhost:5000/tasks/subjects/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           setSubjects((prev) => prev.filter((subject) => subject.id !== id));
//           toast.success('Subject deleted successfully!');
//         } else {
//           toast.error('Failed to delete subject.');
//         }
//       });
//   };

//   // Update end time for a specific subject
//   const updateEndTime = (subjectId, endTimeId, newTime) => {
//     fetch(`http://localhost:5000/end/addEndTime/${endTimeId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify({ time: newTime, userId, subjectId }), // Include userId and subjectId in the payload
//     })
//       .then((response) => {
//         if (response.ok) {
//           setSubjects((prev) =>
//             prev.map((subject) => {
//               if (subject.id === subjectId) {
//                 return {
//                   ...subject,
//                   end_times: subject.end_times.map((endTime) =>
//                     endTime.id === endTimeId ? { ...endTime, time: newTime } : endTime
//                   ),
//                 };
//               }
//               return subject;
//             })
//           );
//           toast.success('End time updated successfully!');
//         } else {
//           toast.error('Failed to update end time.');
//         }
//       });
//   };

//   // Delete an end time for a specific subject
//   const deleteEndTime = (subjectId, endTimeId) => {
//     fetch(`http://localhost:5000/end/addEndTime/${endTimeId}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           setSubjects((prev) =>
//             prev.map((subject) => {
//               if (subject.id === subjectId) {
//                 return {
//                   ...subject,
//                   end_times: subject.end_times.filter((endTime) => endTime.id !== endTimeId),
//                 };
//               }
//               return subject;
//             })
//           );
//           toast.success('End time deleted successfully!');
//         } else {
//           toast.error('Failed to delete end time.');
//         }
//       });
//   };

//   return (
//     <div>
//       <h2>Subjects and End Times</h2>
//       {subjects.length > 0 ? (
//         subjects.map((subject) => (
//           <div key={subject.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
//             <input
//               type="text"
//               value={subject.name}
//               onChange={(e) => updateSubject(subject.id, e.target.value)}
//               style={{ marginRight: '10px' }}
//             />
//             <button onClick={() => deleteSubject(subject.id)}>Delete Subject</button>
//             <ul>
//               {subject.end_times.map((endTime) => (
//                 <li key={endTime.id} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
//                   <input
//                     type="text"
//                     value={endTime.time}
//                     onChange={(e) => updateEndTime(subject.id, endTime.id, e.target.value)}
//                     style={{ marginRight: '10px' }}
//                   />
//                   <span>{endTime.day}</span>
//                   <button onClick={() => deleteEndTime(subject.id, endTime.id)} style={{ marginLeft: '10px' }}>
//                     Delete End Time
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       ) : (
//         <p>No subjects found for this user.</p>
//       )}
//     </div>
//   );
// };

// export default SubjectEndTimeList;
import React, { useState, useEffect } from 'react';
import './CV.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

const SubjectEndTimeList = () => {
  const [subjects, setSubjects] = useState([]); // State for subjects
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/task/getSub', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add JWT token here
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubjects(data); // Set the fetched subjects
        } else {
          toast.error('Error fetching subjects. Please try again.');
        }
      } catch (error) {
        toast.error('Failed to fetch subjects. Server error.');
      }
    };

    fetchSubjects();
  }, []);

  const handleEdit = (subjectId) => {
    // Logic for editing the subject
    console.log("Edit subject with ID:", subjectId);
    // You can add a modal or navigate to an edit page here
  };

  const handleDelete = async (subjectId) => {
    // Logic for deleting the subject
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        const response = await fetch(`http://localhost:5000/task/deleteSub/${subjectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add JWT token here
          },
        });

        if (response.ok) {
          toast.success("Subject deleted successfully.");
          setSubjects(subjects.filter(sub => sub._id !== subjectId)); // Remove subject from the state
        } else {
          toast.error('Error deleting subject. Please try again.');
        }
      } catch (error) {
        toast.error('Failed to delete subject. Server error.');
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg opacity-90 mx-auto p-2 max-w-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
      <h2 className="text-lg font-bold mb-4">Available Subjects:</h2>
      <div className="grid grid-cols-1 gap-0"> 
        {subjects.map((sub) => (
          <div key={sub._id} className="card border p-2 shadow-md flex justify-between items-center" style={{ height: '50px' }}>
            <span className="text-md">{sub.subject}</span>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(sub._id)} className="text-blue-600 hover:text-blue-800 flex items-center">
                <FaEdit size={18} />
              </button>
              <button onClick={() => handleDelete(sub._id)} className="text-red-600 hover:text-red-800 flex items-center">
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectEndTimeList;
