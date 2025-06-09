type LogEntry = {
  timestamp: string;
  ip: string;
  endpoint: string;
  method: string;
  status: number;
  response_time_ms: number;
};

type AnalysisResult = {
  most_active_ips: { key: string; count: number }[];
  top_endpoints: { key: string; count: number }[];
  server_errors: LogEntry[];
};

export const analyzeLogs = (logs: LogEntry[]): AnalysisResult => {
  const ipCounter: Record<string, number> = {};
  const endpointCounter: Record<string, number> = {};
  const serverErrors: LogEntry[] = [];

  logs.forEach((log) => {
    ipCounter[log.ip] = (ipCounter[log.ip] || 0) + 1;
    endpointCounter[log.endpoint] = (endpointCounter[log.endpoint] || 0) + 1;

    if (log.status >= 500 && log.status < 600) {
      serverErrors.push(log);
    }
  });

  const sortEntries = (obj: Record<string, number>) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, count]) => ({ key, count }));

  return {
    most_active_ips: sortEntries(ipCounter),
    top_endpoints: sortEntries(endpointCounter),
    server_errors: serverErrors,
  };
};
