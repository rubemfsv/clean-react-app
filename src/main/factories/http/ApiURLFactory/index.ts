export const makeApiUrl = (path: string): string => {
  const url = `${process.env.API_URL}${path}`;
  return url;
};
