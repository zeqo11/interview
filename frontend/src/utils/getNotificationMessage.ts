export const getNotificationMessage = (addedCount: number, deletedCount: number) => {
  if (addedCount > 0 && deletedCount > 0) {
    return `Successfully added ${addedCount} and removed ${deletedCount} project assignments`;
  } else if (addedCount > 0) {
    return `Successfully added ${addedCount} project assignment${
      addedCount > 1 ? "s" : ""
    }`;
  } else if (deletedCount > 0) {
    return `Successfully removed ${deletedCount} project assignment${
      deletedCount > 1 ? "s" : ""
    }`;
  }
};