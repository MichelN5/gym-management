import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import WorkoutManagement from '../components/WorkoutManagement';
import NotificationsSection from '../components/NotificationsSection';
import BillsSection from '../components/BillsSection';
import { fetchCurrentUser, fetchNotifications, fetchUserBills } from '../services/apiService';
import { useAuth } from '../context/AuthContext'; // Import useAuth to access logout

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [bills, setBills] = useState([]);
  const [user, setUser] = useState(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showAllBills, setShowAllBills] = useState(false);

  const { logout } = useAuth(); // Destructure logout from useAuth

  const fetchData = async () => {
    try {
      const userData = await fetchCurrentUser();
      setUser(userData);

      if (userData) {
        const [notificationsData, billsData] = await Promise.all([
          fetchNotifications(),
          fetchUserBills(userData.id),
        ]);
        setNotifications(notificationsData);
        setBills(billsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="user-info">
        <div className="welcome-message">
          <h2>Welcome to Gym Management System</h2>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="main-content">
        {activeSection === 'dashboard' ? (
          <>
            <h1 className="dashboard-header">Member Dashboard</h1>
            <div className="dashboard-content">
              <NotificationsSection
                notifications={notifications}
                showAll={showAllNotifications}
                toggleShowAll={() => setShowAllNotifications(!showAllNotifications)}
              />
              <BillsSection
                bills={bills}
                showAll={showAllBills}
                toggleShowAll={() => setShowAllBills(!showAllBills)}
              />
            </div>
          </>
        ) : (
          <WorkoutManagement user={user} fetchData={fetchData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;