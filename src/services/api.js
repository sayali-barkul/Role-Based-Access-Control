// Mock API for user and role management

const users = [
    { id: 1, name: 'Sayali', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sujit', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Pratik', role: 'Viewer', status: 'Active' }
  ];
  
  const roles = [
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    { id: 3, name: 'Viewer', permissions: ['Read'] }
  ];
  
  // Fetch users
  export const fetchUsers = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: users });
      }, 500);
    });
  };
  
  // Fetch roles
  export const fetchRoles = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: roles });
      }, 500);
    });
  };
  
  // Create user
  export const createUser = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...userData, id: users.length + 1 };
        users.push(newUser);
        resolve({ data: newUser });
      }, 500);
    });
  };
  
  // Delete user
  export const deleteUser = async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
          users.splice(index, 1);
        }
        resolve({ success: true });
      }, 500);
    });
  };
  
  // Edit user
  export const editUser = async (userId, updatedUserData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedUserData };
          resolve({ data: users[userIndex] });
        }
      }, 500);
    });
  };
  
  // Delete role
  export const deleteRole = async (roleId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = roles.findIndex(role => role.id === roleId);
        if (index !== -1) {
          roles.splice(index, 1);
        }
        resolve({ success: true });
      }, 500);
    });
  };
  
 // Create role
export const createRole = async (roleData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRole = { ...roleData, id: roles.length + 1 };
        roles.push(newRole);
        resolve({ data: newRole });
      }, 500);
    });
  };
  
  // Edit role
  export const editRole = async (roleId, updatedRoleData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roleIndex = roles.findIndex(role => role.id === roleId);
        if (roleIndex !== -1) {
          roles[roleIndex] = { ...roles[roleIndex], ...updatedRoleData };
          resolve({ data: roles[roleIndex] });
        }
      }, 500);
    });
  };
  
  