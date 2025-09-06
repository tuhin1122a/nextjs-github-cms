// Merge Tailwind classes (simple fallback without clsx/tailwind-merge)
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// Generate a unique ID
export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Format a JS Date object
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
