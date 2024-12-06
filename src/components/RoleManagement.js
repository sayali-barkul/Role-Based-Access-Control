import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, FormControlLabel, Checkbox, FormHelperText, Typography, Snackbar, SnackbarContent } from '@mui/material';
import { fetchRoles, createRole, deleteRole, editRole } from '../services/api';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [roleToView, setRoleToView] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [error, setError] = useState('');
  const [permissionError, setPermissionError] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);  // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error', or 'info'

  const availablePermissions = ['Read', 'Write', 'Delete'];

  useEffect(() => {
    const getRoles = async () => {
      const response = await fetchRoles();
      setRoles(response.data);
    };

    getRoles();
  }, []);

  // Snackbar handling
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleAddRoleClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewRole({ name: '', permissions: [] });
    setError('');
    setPermissionError('');
  };

  const handleRoleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  const handlePermissionChange = (permission) => {
    const newPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter(p => p !== permission)
      : [...newRole.permissions, permission];
    setNewRole({ ...newRole, permissions: newPermissions });
  };

  const handleSubmitRoleForm = async () => {
    if (!newRole.name.trim()) {
      setError('Role name is required');
      return;
    }

    if (newRole.permissions.length === 0) {
      setPermissionError('At least one permission must be selected');
      return;
    }

    const response = await createRole(newRole);
    setRoles([...roles, response.data]);
    handleCloseDialog();
    showSnackbar('Role added successfully!');
  };

  const handleDeleteRole = async (roleId) => {
    await deleteRole(roleId);
    setRoles(roles.filter(role => role.id !== roleId));
    showSnackbar('Role deleted successfully!');
  };

  const handleEditRoleClick = (role) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      permissions: role.permissions
    });
    setOpenDialog(true);
  };

  const handleSubmitEditRoleForm = async () => {
    if (!newRole.name.trim()) {
      setError('Role name is required');
      return;
    }

    if (newRole.permissions.length === 0) {
      setPermissionError('At least one permission must be selected');
      return;
    }

    const updatedRole = { ...newRole, permissions: newRole.permissions };
    const response = await editRole(editingRole.id, updatedRole);
    setRoles(roles.map(role => (role.id === editingRole.id ? response.data : role)));
    handleCloseDialog();
    setEditingRole(null);
    showSnackbar('Role updated successfully!');
  };

  const handleViewRoleClick = (role) => {
    setRoleToView(role);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setRoleToView(null);
  };

  return (
    <div>
      <Button sx={{ marginBottom: '20px' }} variant="contained" onClick={handleAddRoleClick}>Add Role</Button>

      {/* Conditionally render a message when there are no roles */}
      {roles.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" sx={{ margin: '20px 0' }}>
          No roles yet. Add some to begin.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role Name</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.permissions.join(', ')}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewRoleClick(role)}>View</Button>
                    <Button onClick={() => handleEditRoleClick(role)}>Edit</Button>
                    <Button onClick={() => handleDeleteRole(role.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Role Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingRole ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            name="name"
            value={newRole.name}
            onChange={handleRoleInputChange}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error}
          />
          <FormControl component="fieldset" margin="normal" error={!!permissionError}>
            {availablePermissions.map(permission => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={newRole.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    name={permission}
                  />
                }
                label={permission}
              />
            ))}
            {permissionError && <FormHelperText>{permissionError}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={editingRole ? handleSubmitEditRoleForm : handleSubmitRoleForm} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* View Role Dialog */}
      <Dialog maxWidth="sm" fullWidth open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle>View Role</DialogTitle>
        <DialogContent>
          <div><strong>Role Name:</strong> {roleToView?.name}</div>
          <div><strong>Permissions:</strong> {roleToView?.permissions.join(', ')}</div>
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

export default RoleManagement;
