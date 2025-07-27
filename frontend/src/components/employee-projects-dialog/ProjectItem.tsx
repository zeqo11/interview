import { FC } from 'react'
import { Box, Stack, Typography, IconButton, Chip } from '@mui/material'
import { Delete as DeleteIcon, Work as WorkIcon } from '@mui/icons-material'
import type { Theme } from '@mui/material/styles'
import type { RowItem } from '@/types/RowItem'
import type { LocalAdd } from './queueReducer'

interface ProjectItemProps {
  row: RowItem
  queuedAdds: LocalAdd[]
  onRemove: (row: RowItem) => void
  delPending: boolean
}

const ProjectItem: FC<ProjectItemProps> = ({ 
  row, 
  queuedAdds, 
  onRemove, 
  delPending 
}) => {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: (theme: Theme) => 
            theme.palette.mode === 'light' 
              ? 'rgba(99, 102, 241, 0.02)' 
              : 'rgba(129, 140, 248, 0.04)',
          transform: 'translateY(-1px)',
          boxShadow: 1,
        }
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
            <WorkIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" fontWeight={600}>
              {row.projectName}
            </Typography>
            {row.queued && queuedAdds.some(add => add.projectId === row.projectId) && (
              <Chip 
                label="Adding" 
                size="small" 
                color="success"
                variant="outlined"
              />
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Role: {row.role}
          </Typography>
        </Box>

        <IconButton
          size="small"
          aria-label="remove project"
          onClick={() => onRemove(row)}
          disabled={delPending && !row.queued}
          sx={{
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'error.dark',
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default ProjectItem