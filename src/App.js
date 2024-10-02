
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import AuthForm from './auth/authForm';
// import MainComponent from './components/MainComponent';
// import { ToastContainer } from 'react-toastify';
// import LoggedInNavBar from './components/LoggedInNavBar';
// const App = () => {
//   return (
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/auth" element={<AuthForm />} /> 
//         <Route path='/tasks' element={ <MainComponent />}/>
//         <Route path="/dashboard" element={<LoggedInNavBar/>}/>
//       </Routes>
   
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthForm from './auth/authForm';
import MainComponent from './components/MainComponent';
import { ToastContainer } from 'react-toastify';
import ScheduleTask from './components/scheduleTask';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Dashboard from './components/dashboard';
import WaterIntakeCalculator from './components/WaterIntakeCalculator';
const App = () => {
  return (
    
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path='/tasks' element={<MainComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<ScheduleTask />} />
          <Route path="/water-intake" element={<WaterIntakeCalculator />} />
        </Routes>
        <ToastContainer /> {/* Include ToastContainer */}
      </div>
   
  );
};

export default App;
