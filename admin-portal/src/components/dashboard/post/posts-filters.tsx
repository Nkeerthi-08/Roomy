import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { SealCheck as UploadIcon } from '@phosphor-icons/react/dist/ssr/SealCheck';

export function PostsFilters({ onApproveAll }: { onApproveAll: () => void }): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search Posts"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          onChange={(e) => {
            console.log(e.target.value);
          }}
          sx={{ maxWidth: '500px' }}
        />

        <Button
          color="primary"
          startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}
          onClick={onApproveAll}
          variant="contained"
        >
          Approve All
        </Button>
      </Stack>
    </Card>
  );
}
