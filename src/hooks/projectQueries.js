const PROJECT_METADATA_COLUMNS = [
  "category",
  "context_label",
  "impact",
  "role"
];

export function isMissingProjectMetadata(error) {
  if (!error) return false;
  if (error.code === "42703" || error.code === "PGRST204") return true;

  const message = `${error.message || ""} ${error.details || ""}`.toLowerCase();
  return PROJECT_METADATA_COLUMNS.some((column) => message.includes(column));
}
