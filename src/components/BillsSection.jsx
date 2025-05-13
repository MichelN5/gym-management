import React from 'react';

const BillsSection = ({ bills, showAll, toggleShowAll }) => {
    const displayedBills = showAll ? bills : bills.slice(0, 5);

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
        <div className="bills-section">
            <div className="section-header">
                <h2>Upcoming Bills</h2>
            </div>
            <div className="bills-list">
                {displayedBills.length > 0 ? (
                    displayedBills.map((bill) => (
                        <div key={bill.id} className="bill-item">
                            <div className="bill-info">
                                <h3>{bill.description}</h3>
                                <p className="due-date">{formatDate(bill.created_at)}</p>
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
            {bills.length > 5 && (
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

export default BillsSection;