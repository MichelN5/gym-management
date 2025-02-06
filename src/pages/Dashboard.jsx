import React, { useState } from 'react';
import { FiMenu, FiX, FiUser, FiActivity, FiDollarSign, FiUsers } from 'react-icons/fi';
import '../css/Dashboard.css';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="dashboard-container">
            {/* Mobile Header */}
            <div className="mobile-header">
                <button className="menu-toggle" onClick={toggleSidebar}>
                    {isSidebarOpen ? <FiX /> : <FiMenu />}
                </button>
                <h1 className="logo">GymMaster</h1>
                <div className="user-icon">
                    <FiUser />
                </div>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>GymMaster</h2>
                </div>
                <nav className="sidebar-nav">
                    <a href="#dashboard" className="active">
                        <FiActivity /> Dashboard
                    </a>
                    <a href="#members">
                        <FiUsers /> Members
                    </a>
                    <a href="#payments">
                        <FiDollarSign /> Payments
                    </a>
                    <a href="#workouts">
                        <FiActivity /> Workouts
                    </a>
                    <a href="#settings">
                        <FiUser /> Settings
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <main className="main-content">
                <div className="content-header">
                    <h2>Dashboard Overview</h2>
                    <div className="user-profile">
                        <span>Welcome, Admin</span>
                        <div className="avatar">A</div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card primary">
                        <h3>Total Members</h3>
                        <p>1,234</p>
                        <div className="stat-trend">↑ 12%</div>
                    </div>
                    <div className="stat-card success">
                        <h3>Active Members</h3>
                        <p>892</p>
                        <div className="stat-trend">↑ 8%</div>
                    </div>
                    <div className="stat-card warning">
                        <h3>Pending Payments</h3>
                        <p>$12,340</p>
                        <div className="stat-trend">↓ 3%</div>
                    </div>
                    <div className="stat-card info">
                        <h3>New Signups</h3>
                        <p>45</p>
                        <div className="stat-trend">↑ 21%</div>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="recent-activity">
                    <h3>Recent Activities</h3>
                    <div className="activity-table">
                        <div className="table-header">
                            <span>Date</span>
                            <span>Activity</span>
                            <span>Status</span>
                        </div>
                        <div className="table-row">
                            <span>2023-10-01</span>
                            <span>New member registration</span>
                            <span className="status success">Completed</span>
                        </div>
                        <div className="table-row">
                            <span>2023-10-02</span>
                            <span>Monthly subscription payment</span>
                            <span className="status warning">Pending</span>
                        </div>
                        <div className="table-row">
                            <span>2023-10-03</span>
                            <span>Personal training session</span>
                            <span className="status success">Completed</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;