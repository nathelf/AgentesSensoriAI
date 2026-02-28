import { exec } from 'child_process';
import os from 'os';

const PORT = 3000;

function killProcessOnPort(port) {
  const isWindows = os.platform() === 'win32';

  if (isWindows) {
    const command = `netstat -ano | findstr :${port}`;
    exec(command, (error, stdout, stderr) => {
      if (!stdout) return;

      const lines = stdout.trim().split('\n');
      const pidsToKill = new Set();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 4 && parts[1].includes(`:${port}`) && parts[3] === 'LISTENING') {
          pidsToKill.add(parts[parts.length - 1]);
        }
      }
      for (const pid of pidsToKill) {
        console.log(`Killing process ${pid} on port ${port} (Windows)`);
        exec(`taskkill /F /PID ${pid}`, (err) => {
          if (err) console.error(`Failed to kill PID ${pid}: ${err.message}`);
          else console.log(`Successfully killed process ${pid}`);
        });
      }
    });
  } else {
    const command = `lsof -i tcp:${port} | grep LISTEN | awk '{print $2}'`;
    exec(command, (error, stdout, stderr) => {
      if (!stdout) return;

      const pids = stdout.trim().split('\n');
      for (const pid of pids) {
        if (pid) {
          console.log(`Killing process ${pid} on port ${port} (Unix)`);
          exec(`kill -9 ${pid}`, (err) => {
            if (err) console.error(`Failed to kill PID ${pid}: ${err.message}`);
            else console.log(`Successfully killed process ${pid}`);
          });
        }
      }
    });
  }
}

console.log(`Ensuring port ${PORT} is clear...`);
killProcessOnPort(PORT);
// Try clearing 3001 and 3002 just in case they were used by previous test runs.
killProcessOnPort(3001);
killProcessOnPort(3002);
