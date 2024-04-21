'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
// import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().optional(), // Make password optional
  confirmPassword: zod.string().optional(), // Make confirmPassword optional
});

type Values = zod.infer<typeof schema>;

export function AccountDetailsForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>();

  const { user } = useUser();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.updateUserInfo({
        _id: user?.id || '',
        ...values,
        password: values.password || '', // Ensure password is always a string
        confirmPassword: values.confirmPassword || '', // Ensure confirmPassword is always a string
      });

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
      }

      setIsPending(false);
    },
    [setError, user]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="firstName"
                defaultValue={user?.firstName || ''}
                render={({ field }) => (
                  <FormControl fullWidth required error={Boolean(errors.firstName)}>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput {...field} label="First Name" type="text" />
                    {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="lastName"
                defaultValue={user?.lastName || ''}
                render={({ field }) => (
                  <FormControl fullWidth required error={Boolean(errors.lastName)}>
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput {...field} label="Last Name" type="text" />
                    {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={12} xs={12}>
              <Controller
                control={control}
                name="email"
                defaultValue={user?.email || ''}
                render={({ field }) => (
                  <FormControl fullWidth required error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput {...field} label="Email address" type="email" />
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.password)}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.confirmPassword)}>
                    <InputLabel>Confirm Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" disabled={isPending}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
