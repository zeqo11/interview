import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Box,
  Paper
} from "@mui/material";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

const TableSkeleton = ({ 
  rows = 5, 
  columns = 6, 
  showHeader = true 
}: TableSkeletonProps) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        {showHeader && (
          <TableHead>
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableCell key={`header-${index}`}>
                  <Skeleton 
                    variant="text" 
                    width={index === 0 ? 200 : 120}
                    height={24}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                  {colIndex === 0 ? (
                    <Box display="flex" alignItems="center" gap={2}>
                      <Skeleton variant="circular" width={48} height={48} />
                      <Box>
                        <Skeleton variant="text" width={140} height={20} />
                        <Skeleton variant="text" width={100} height={16} />
                      </Box>
                    </Box>
                  ) : colIndex === columns - 1 ? (
                    <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
                  ) : (
                    <Skeleton 
                      variant="text" 
                      width={Math.random() * 60 + 80} 
                      height={20}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;