export default function extractYear(dateString: string): number {
  const date = new Date(dateString);
  return date.getFullYear();
}
