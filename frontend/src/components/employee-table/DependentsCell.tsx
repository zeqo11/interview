import { Dependent } from "@/types/Dependent";
import { formatDisplayName } from "@/utils/formatDisplayName";
import { Chip, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import { FC } from "react";

export const DependentsCell: FC<{
  dependents: Dependent[];
}> = ({ dependents }) => {
  if (dependents.length === 0) {
    return (
      <Chip
        label="No dependents"
        size="small"
        variant="outlined"
        color="default"
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AvatarGroup max={4}>
        {dependents.map((d) => (
          <Tooltip key={d.id} title={formatDisplayName(d)}>
            <Avatar>
              {d.firstName[0]}
              {d.lastName[0]}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
    </Box>
  );
};
