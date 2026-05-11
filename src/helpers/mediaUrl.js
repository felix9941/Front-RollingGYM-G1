const BACKEND_URL =
  import.meta.env.VITE_URL_BACK_DEPLOY || import.meta.env.VITE_URL_BACK || "";

export const resolveMediaUrl = (value) => {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (!BACKEND_URL) return value;
  return `${BACKEND_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

