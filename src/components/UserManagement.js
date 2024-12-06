import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, FormHelperText, Typography, Snackbar, SnackbarContent } from '@mui/material';
import { fetchUsers, fetchRoles, createUser, deleteUser, editUser } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', role: '', status: 'Active' });
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [userToView, setUserToView] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [nameError, setNameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchUsers();
      setUsers(response.data);
    };

    const getRoles = async () => {
      const response = await fetchRoles();
      setRoles(response.data);
    };

    getUsers();
    getRoles();
  }, []);

  const handleAddUserClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewUser({ name: '', role: '', status: 'Active' }); // Reset form
    setNameError('');
    setRoleError('');
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmitUserForm = async () => {
    // Validate name
    if (!newUser.name.trim()) {
      setNameError('Name is required');
      return;
    } else {
      setNameError('');
    }

    // Validate role
    if (!newUser.role) {
      setRoleError('Role is required');
      return;
    } else {
      setRoleError('');
    }

    const response = await createUser(newUser);
    setUsers(prevUsers => [...prevUsers, response.data]);
    handleCloseDialog();
    showSnackbar('User added successfully!');
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
    showSnackbar('User deleted successfully!');
  };

  const handleEditUserClick = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      role: user.role,
      status: user.status
    });
    setOpenDialog(true);
  };

  const handleSubmitEditUserForm = async () => {
    // Validate name
    if (!newUser.name.trim()) {
      setNameError('Name is required');
      return;
    } else {
      setNameError('');
    }

    // Validate role
    if (!newUser.role) {
      setRoleError('Role is required');
      return;
    } else {
      setRoleError('');
    }

    const response = await editUser(editingUser.id, newUser);
    setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));  // Update the user in the list
    handleCloseDialog();
    setEditingUser(null);
    showSnackbar('User updated successfully!');
  };

  const handleViewUserClick = (user) => {
    setUserToView(user);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setUserToView(null);
  };

  return (
    <div>
      <Button sx={{ marginBottom: '20px' }} variant="contained" onClick={handleAddUserClick}>Add User</Button>

      {/* Conditionally render a message when there are no users */}
      {users.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" sx={{ margin: '20px 0' }}>
          No users available. Add a user to get started.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewUserClick(user)}>View</Button>
                    <Button onClick={() => handleEditUserClick(user)}>Edit</Button>
                    <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newUser.name}
            onChange={handleUserInputChange}
            fullWidth
            margin="normal"
            error={!!nameError}
            helperText={nameError}
          />
          <FormControl fullWidth margin="normal" error={!!roleError}>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={newUser.role}
              onChange={handleUserInputChange}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
            {roleError && <FormHelperText>{roleError}</FormHelperText>}
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={newUser.status === 'Active'} onChange={() => setNewUser({ ...newUser, status: newUser.status === 'Active' ? 'Inactive' : 'Active' })} />}
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={editingUser ? handleSubmitEditUserForm : handleSubmitUserForm} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} fullWidth>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          <div><strong>Name: </strong> {userToView?.name}</div>
          <div><strong>Role: </strong> {userToView?.role}</div>
          <div><strong>Status: </strong> {userToView?.status}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarContent
          sx={{ backgroundColor: snackbarSeverity === 'success' ? 'green' : snackbarSeverity === 'error' ? 'red' : 'blue' }}
          message={snackbarMessage}
        />
      </Snackbar>
    </div>
  );
};

export default UserManagement;
