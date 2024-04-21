'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useUser } from '@/hooks/use-user';

const userData = {
  avatar: '/assets/avatar.png',
  country: 'USA',
  timezone: 'GTM-7',
} as const;

export function AccountInfo(): React.JSX.Element {
  const { user } = useUser();

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={userData.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {userData.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}
