import express, { Request, Response, Router } from "express";
import fs from "fs";
import { analyzeLogs } from "../controllers/logsController";

const router: Router = Router();

interface LogEntry {
  timestamp: string;
  ip: string;
  endpoint: string;
  method: string;
  status: number;
  response_time_ms: number;
}

router.get("/analyze", (req: Request, res: Response) => {
  fs.readFile("sample_api_logs.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read log file", err });
    }
    try {
      const logs: LogEntry[] = JSON.parse(data);
      const result = analyzeLogs(logs);
      res.json(result);
    } catch (parseErr) {
      res.status(500).json({ error: "Failed to parse log file" });
    }
  });
});

router.post("/analyze", (req: Request, res: Response) => {
  const logs: LogEntry[] = req.body;
  if (!Array.isArray(logs)) {
    res.status(400).json({ error: "Invalid log format" });
  }
  const result = analyzeLogs(logs as LogEntry[]);
  res.json(result);
});

export default router;
