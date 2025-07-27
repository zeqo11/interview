import { FC } from 'react'
import { 
  Box, 
  Stack, 
  Typography, 
  Button, 
  TextField, 
  Autocomplete, 
  CircularProgress 
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { Theme } from '@mui/material/styles'
import type { Project } from '@/types/Project'

interface AddProjectFormProps {
  unassignedProjects: Project[]
  selectedProj: Project | null
  role: string
  addPending: boolean
  doItAllOnce: boolean
  onProjectChange: (project: Project | null) => void
  onRoleChange: (role: string) => void
  onAdd: () => void
}

const AddProjectForm: FC<AddProjectFormProps> = ({
  unassignedProjects,
  selectedProj,
  role,
  addPending,
  doItAllOnce,
  onProjectChange,
  onRoleChange,
  onAdd,
}) => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        border: '2px dashed',
        borderColor: 'primary.light',
        borderRadius: 2,
        backgroundColor: (theme: Theme) => 
          theme.palette.mode === 'light' 
            ? 'rgba(99, 102, 241, 0.01)' 
            : 'rgba(129, 140, 248, 0.02)',
      }}
    >
      <Typography variant="subtitle2" color="primary.main" mb={2} fontWeight={600}>
        Add New Project Assignment
      </Typography>
      
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="flex-start"
      >
        <Autocomplete<Project>
          options={unassignedProjects}
          getOptionLabel={(o) => o.name}
          value={selectedProj}
          onChange={(_, v) => onProjectChange(v)}
          sx={{ minWidth: 200, flex: 1 }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Select Project" 
              size="small"
              variant="outlined"
            />
          )}
        />
        <TextField
          label="Employee Role"
          size="small"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          sx={{ minWidth: 160, flex: 1 }}
          variant="outlined"
          placeholder="e.g. Developer, Manager, Designer"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={
            !selectedProj || !role.trim() || (addPending && !doItAllOnce)
          }
          onClick={onAdd}
          size="small"
          sx={{
            minWidth: 100,
            background: (theme: Theme) => theme.custom.gradients.primary,
            '&:hover': {
              background: (theme: Theme) => theme.custom.gradients.primary,
              transform: 'translateY(-1px)',
              boxShadow: 2,
            },
          }}
        >
          {addPending && !doItAllOnce ? (
            <CircularProgress size={18} />
          ) : (
            "Add"
          )}
        </Button>
      </Stack>
    </Box>
  )
}

export default AddProjectForm