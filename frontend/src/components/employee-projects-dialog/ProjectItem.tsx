import { FC } from "react";
import { Box, Stack, Typography, IconButton, Chip } from "@mui/material";
import {
  Delete as DeleteIcon,
  Work as WorkIcon,
  Restore as RestoreIcon,
} from "@mui/icons-material";
import type { Theme } from "@mui/material/styles";
import type { RowItem } from "@/types/RowItem";
import { LocalProject } from "@/types/LocalProject";

interface ProjectItemProps {
  row: RowItem;
  queuedAdds: LocalProject[];
  onRemove: (row: RowItem) => void;
  delPending: boolean;
}

const ProjectItem: FC<ProjectItemProps> = ({
  row,
  queuedAdds,
  onRemove,
  delPending,
}) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: row.isDeleted ? "error.main" : "divider",
        borderRadius: 2,
        backgroundColor: row.isDeleted ? "error.light" : "background.paper",
        opacity: row.isDeleted ? 0.8 : 1,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: row.isDeleted ? "error.dark" : "primary.main",
          backgroundColor: (theme: Theme) =>
            row.isDeleted
              ? theme.palette.error.light
              : theme.palette.mode === "light"
              ? "rgba(99, 102, 241, 0.02)"
              : "rgba(129, 140, 248, 0.04)",
          transform: "translateY(-1px)",
          boxShadow: 1,
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
            <WorkIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" fontWeight={600}>
              {row.projectName}
            </Typography>
            {row.queued &&
              queuedAdds.some((add) => add.projectId === row.projectId) && (
                <Chip
                  label="Adding"
                  size="small"
                  color="success"
                  variant="outlined"
                />
              )}
            {row.isDeleted && (
              <Chip
                label="Deleting"
                size="small"
                color="error"
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
          aria-label={row.isDeleted ? "restore project" : "remove project"}
          onClick={() => onRemove(row)}
          disabled={delPending && !row.queued}
          sx={{
            color: row.isDeleted ? "success.main" : "error.main",
            "&:hover": {
              backgroundColor: row.isDeleted ? "success.light" : "error.light",
              color: row.isDeleted ? "success.dark" : "error.dark",
            },
          }}
        >
          {row.isDeleted ? (
            <RestoreIcon fontSize="small" />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ProjectItem;
