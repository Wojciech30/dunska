function sanitizeHtml(input) {
  if (typeof input !== "string") return "";
  let html = input;

  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "");
  html = html.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "");
  html = html.replace(/javascript:/gi, "");

  return html.trim();
}

module.exports = { sanitizeHtml };
