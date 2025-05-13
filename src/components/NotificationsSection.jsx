import React from 'react';

const NotificationsSection = ({ notifications, showAll, toggleShowAll }) => {
    const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

    // Helper function to format the date
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="notifications-section">
            <div className="section-header">
                <h2>Notifications</h2>
                <span className="notification-badge">{notifications.length} New</span>
            </div>
            <div className="notifications-list">
                {displayedNotifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                        <div className="notification-content">
                            <p>{notification.message}</p>
                            <span className="notification-date">{formatDate(notification.time_posted)}</span>
                        </div>
                    </div>
                ))}
            </div>
            {notifications.length > 5 && (
                <button
                    className="load-more-button"
                    onClick={toggleShowAll}
                >
                    {showAll ? 'Show Less' : 'Load More'}
                </button>
            )}
        </div>
    );
};

export default NotificationsSection;