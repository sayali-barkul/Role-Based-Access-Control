// services/roleService.js

export const getRoles = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
          { id: 2, name: 'User', permissions: ['Read'] },
        ]);
      }, 500);
    });
  };
  
  export const addRole = (role) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: Date.now(), ...role }), 500);
    });
  };
  
  export const editRole = (id, updatedRole) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id, ...updatedRole }), 500);
    });
  };
  
  export const deleteRole = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  };
  
  // New function to update role permissions
  export const updateRolePermissions = (roleId, permissions) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Permissions for role ID ${roleId} have been updated:`, permissions);
        resolve();
      }, 500);
    });
  };
  