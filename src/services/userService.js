// src/services/userService.js

export const getUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
          { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Inactive' },
        ]);
      }, 500); // Simulate a delay
    });
  };
  
  export const addUser = (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...user, id: Date.now() }); // Generate a unique ID based on current time
      }, 500); // Simulate a delay
    });
  };
  
  export const editUser = (id, updatedUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...updatedUser, id }); // Return updated user data
      }, 500); // Simulate a delay
    });
  };
  
  export const deleteUser = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id); // Return deleted user ID
      }, 500); // Simulate a delay
    });
  };
  
  export const updateUserStatus = (id, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, status }); // Return the updated status
      }, 500); // Simulate a delay
    });
  };
  