import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Work as WorkIcon } from '@mui/icons-material'
import type { Theme } from '@mui/material/styles'

const EmptyProjectsState: FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 4,
        px: 2,
        backgroundColor: (theme: Theme) => 
          theme.palette.mode === 'light' 
            ? 'rgba(0, 0, 0, 0.02)' 
            : 'rgba(255, 255, 255, 0.02)',
        borderRadius: 2,
        border: '1px dashed',
        borderColor: 'divider',
      }}
    >
      <WorkIcon 
        sx={{ 
          fontSize: 48, 
          color: 'text.disabled',
          mb: 1 
        }} 
      />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No Projects Assigned
      </Typography>
      <Typography variant="body2" color="text.disabled">
        Use the form below to assign this employee to a project
      </Typography>
    </Box>
  )
}

export default EmptyProjectsState