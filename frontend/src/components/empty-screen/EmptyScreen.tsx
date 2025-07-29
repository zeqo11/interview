import { Box, Typography, Stack, Paper } from "@mui/material";
import {
  ErrorOutline as ErrorIcon
} from "@mui/icons-material";

interface EmptyScreenProps {
  title: string;
  description?: string;
}

const EmptyScreen = ({ title, description }: EmptyScreenProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={8}
        px={4}
        sx={{
          minHeight: 400,
          textAlign: "center",
        }}
      >
        <Stack alignItems="center" spacing={3}>
          <ErrorIcon sx={{ fontSize: 64, color: "error.main", opacity: 0.7 }} />

          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" maxWidth={400}>
              {description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default EmptyScreen;
