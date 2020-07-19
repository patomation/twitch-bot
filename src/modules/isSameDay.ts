export default function isSameDay (first: Date, second: Date): boolean {
  return first.toDateString() === second.toDateString()
}
