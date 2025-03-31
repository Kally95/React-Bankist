export function getCurrentDate() {
  const date = new Date();
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getCurrentTime() {
  const time = new Date().toLocaleString();
  return time.split(",")[1].split(":").slice(0, 2).join(":");
}

export function getNonFormattedDate() {
  const date = new Date();
  return date.toLocaleDateString();
}
