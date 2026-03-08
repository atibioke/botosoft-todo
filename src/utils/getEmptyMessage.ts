export function getEmptyMessage(filter: string) {
  switch (filter) {
    case "active":
      return "No active tasks.";

    case "completed":
      return "No completed tasks.";

    default:
      return "No todos yet. Add one above.";
  }
}