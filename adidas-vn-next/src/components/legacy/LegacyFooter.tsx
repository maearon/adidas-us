import fs from "fs";
import path from "path";

export function LegacyFooter() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "public", "vn", "include", "footer.html"),
    "utf8",
  );

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
