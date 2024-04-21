'use client';

import * as React from 'react';
import { Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { makeRequest } from '@/lib/services/base-api';

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
}

export interface Customer {
  avatar: string | undefined;
  city: string;
  state: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  subscriptionStatus: string;
  numberOfPosts: number;
  _id: string;
}

export function CustomersTable(): React.JSX.Element {
  const [customers, setCustomers] = React.useState([] as Customer[]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [count, setCount] = React.useState(0);

  const fetchCustomers = async () => {
    const res = await makeRequest('users', {}, 'GET');
    setCustomers(res);
    setCount(res.length); // Update the count with the total number of customers
  };

  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  const rowIds = React.useMemo(() => {
    return paginatedCustomers.map((customer) => customer._id);
  }, [paginatedCustomers]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>No. of Posts</TableCell>
              <TableCell>Subscription Status</TableCell>
              <TableCell>Signed Up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((row) => {
              return (
                <TableRow hover key={row._id} selected={rowIds.includes(row._id)}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={row?.avatar} />
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row?.city && row.state ? `${row.city}, ${row.state}, USA` : 'USA'}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.numberOfPosts}</TableCell>
                  <TableCell>
                    <Chip
                      color={row.subscriptionStatus === 'active' ? 'success' : 'error'}
                      label={row.subscriptionStatus}
                    />
                  </TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
