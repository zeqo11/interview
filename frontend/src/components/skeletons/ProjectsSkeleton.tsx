import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

interface ProjectsSkeletonProps {
  items?: number;
}

const ProjectsSkeleton = ({ items = 3 }: ProjectsSkeletonProps) => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: items }).map((_, index) => (
        <Card key={`skeleton-${index}`} variant="outlined">
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box flex={1}>
                <Skeleton
                  variant="text"
                  width="60%"
                  height={24}
                  sx={{ mb: 1 }}
                />
                <Skeleton variant="text" width="40%" height={20} />
              </Box>
              <Box display="flex" gap={1}>
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={32}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Skeleton variant="text" width="30%" height={24} sx={{ mb: 2 }} />
          <Box display="flex" gap={2} alignItems="end">
            <Skeleton
              variant="rectangular"
              width="45%"
              height={56}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width="30%"
              height={56}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width={100}
              height={36}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ProjectsSkeleton;
