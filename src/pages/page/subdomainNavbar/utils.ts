export const sanitizeSearchQuery = (query: string): string => {
  return query
    .trim() // remove leading/trailing whitespace
    .replace(/\s+/g, " ") // collapse multiple spaces
    .replace(/[^a-zA-Z0-9\s-]/g, "") // remove special chars except space/hyphen
    .toLowerCase()
    .replace(/\s+/g, "+"); // replace spaces with +
};