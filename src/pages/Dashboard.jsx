import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import Firestore instance
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase'; // Import authentication instance
import '../css/Dashboard.css';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [bills, setBills] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationsRef = collection(db, 'notifications');
      const q = query(notificationsRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      const notificationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toLocaleString()
      }));
      setNotifications(notificationsData);
    };

    const fetchBills = async () => {
      if (!user) return;
      const billsRef = collection(db, 'bills');
      console.log(user.uid)
      const q = query(billsRef, where('userId', '==', user.uid), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      const billsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toLocaleString()
      }));
      setBills(billsData);
    };

    fetchNotifications();
    fetchBills();
  }, [user]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Member Dashboard</h1>
      <div className="dashboard-content">
        {/* Notifications Section */}
        <div className="notifications-section">
          <div className="section-header">
            <h2>Notifications</h2>
            <span className="notification-badge">{notifications.length} New</span>
          </div>
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-date">{notification.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bills Section */}
        <div className="bills-section">
          <div className="section-header">
            <h2>Upcoming Bills</h2>
          </div>
          <div className="bills-list">
            {bills.length > 0 ? (
              bills.map(bill => (
                <div key={bill.id} className="bill-item">
                  <div className="bill-info">
                    <h3>{bill.description}</h3>
                    <p className="due-date">Due: {bill.timestamp}</p>
                  </div>
                  <div className="bill-actions">
                    <span className={`amount ${bill.status}`}>${bill.amount}</span>
                    <span className="status-badge">{bill.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No bills present.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
