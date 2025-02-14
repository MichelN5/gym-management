# Gym Management System

## Overview
The **Gym Management System** is a web-based application designed to streamline gym operations by digitalizing payment receipts, notifications, and member management. This system eliminates the hassle of paper-based receipts and manual notifications, providing a seamless experience for both gym owners and members.

## Features
### **Admin Dashboard**
- Add new members
- Update or delete member information
- Create and manage billing
- Assign fee packages to members
- Send monthly notifications
- Export reports

### **User Dashboard**
- View assigned notifications
- View personal billing information

## Tech Stack
- **Frontend:** React.js 
- **Backend:** Firebase (Firestore for database, Firebase Authentication for user management)
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore

## Logging System
The system maintains **detailed logs** of user activities, including:
- Member management actions
- Billing transactions
- Notifications sent to members
- System events for debugging and monitoring

## Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/gym-management-system.git
   cd gym-management-system
   ```
2. **Install Dependencies** (If using React for frontend)
   ```sh
   npm install
   ```
3. **Set Up Firebase**
   - Create a Firebase project.
   - Enable Firestore Database and Authentication.
   - Configure Firebase in your project by adding `firebaseConfig` to your environment variables.

4. **Run the Application**
   ```sh
   npm start
   ```




## Contact
For any inquiries, reach out to naoussmichel20005@gmail.com or create an issue in this repository.

