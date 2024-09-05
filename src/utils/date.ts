export const getTimeDifference = (date: Date) => {
  const now = new Date().getTime() / 1000;
  const timeElapsed = now - date.getTime() / 1000;

  if (timeElapsed < 60) return `${Math.round(timeElapsed)} seconds ago`;
  if (timeElapsed < 3600) return `${Math.round(timeElapsed / 60)} minutes ago`;
  if (timeElapsed < 86400) return `${Math.round(timeElapsed / 3600)} hours ago`;
  return `${Math.round(timeElapsed / 86400)} days ago`;
};
