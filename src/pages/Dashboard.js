import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import UserManagement from '../components/UserManagement';
import RoleManagement from '../components/RoleManagement';

const Dashboard = () => {
  return (
    <Container>
      <Box marginTop={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UserManagement />
          </Grid>
          <Grid item xs={12} md={6}>
            <RoleManagement />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
