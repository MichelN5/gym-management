import React, { useState } from 'react';
import '../css/Dashboard.css';

const Dashboard = () => {
  // Mock data
  const [notifications] = useState([
    {
      id: 1,
      title: "New Class Schedule",
      message: "Yoga class timing has changed to 7:00 PM starting next week",
      date: "2024-03-15",
      unread: true
    },
    {
      id: 2,
      title: "Maintenance Notice",
      message: "Pool area will be closed for maintenance on March 20th",
      date: "2024-03-14",
      unread: false
    }
  ]);

  const [bills] = useState([
    {
      id: 1,
      amount: 89.99,
      dueDate: "2024-03-25",
      status: "pending",
      description: "Monthly Membership Fee"
    },
    {
      id: 2,
      amount: 25.00,
      dueDate: "2024-03-18",
      status: "overdue",
      description: "Late Payment Fee"
    }
  ]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Member Dashboard</h1>
      
      <div className="dashboard-content">
        {/* Notifications Section */}
        <div className="notifications-section">
          <div className="section-header">
            <h2>
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              Notifications
            </h2>
            <span className="notification-badge">{notifications.filter(n => n.unread).length} New</span>
          </div>

          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="notification-date">{notification.date}</span>
                </div>
                {notification.unread && <div className="unread-dot"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Bills Section */}
        <div className="bills-section">
          <div className="section-header">
            <h2>
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-9-7l-4 4h3v2h2v-2h3l-4-4z"/>
              </svg>
              Upcoming Bills
            </h2>
          </div>

          <div className="bills-list">
            {bills.map(bill => (
              <div key={bill.id} className="bill-item">
                <div className="bill-info">
                  <h3>{bill.description}</h3>
                  <p className="due-date">Due: {bill.dueDate}</p>
                </div>
                <div className="bill-actions">
                  <span className={`amount ${bill.status}`}>
                    ${bill.amount}
                    <span className="status-badge">{bill.status}</span>
                  </span>
                  <button className="pay-button">Pay Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;