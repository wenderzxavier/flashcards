export function generateId() {
    const timestamp = Date.now();
    return timestamp.toString();
}