export const generateTempId = (): string => {
  try {
    return crypto.randomUUID();
  } catch {
    return `tmp-${Math.random().toString(36).slice(2)}`;
  }
};