// pages/api/migrate.js
import { exec } from "child_process";

export default async function handler(req, res) {
  if (req.method === "POST") {
    exec("npx prisma migrate deploy", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: error.message });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).json({ stderr: stderr });
      }
      console.log(`Stdout: ${stdout}`);
      return res.status(200).json({ stdout: stdout });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
