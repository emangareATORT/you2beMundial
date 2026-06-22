import { chmod, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const nodeRuntime =
  process.env.NODE_RUNTIME ||
  "/Users/eduardomangarelli/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node";

const appName = "Zero Spoiler";
const distDir = "dist";
const appPath = `${distDir}/${appName}.app`;
const zipPath = `${distDir}/${appName} macOS Apple Silicon.zip`;
const contentsPath = `${appPath}/Contents`;
const macosPath = `${contentsPath}/MacOS`;
const resourcesPath = `${contentsPath}/Resources`;
const launcherPath = `${macosPath}/zero-spoiler`;

await mkdir(distDir, { recursive: true });
await rm(appPath, { recursive: true, force: true });
await rm(zipPath, { force: true });
await mkdir(macosPath, { recursive: true });
await mkdir(resourcesPath, { recursive: true });

await cp(nodeRuntime, `${resourcesPath}/node`);
await cp("zero-spoiler-single.js", `${resourcesPath}/zero-spoiler-single.js`);
await chmod(`${resourcesPath}/node`, 0o755);

await writeFile(
  `${contentsPath}/Info.plist`,
  `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>es</string>
  <key>CFBundleDisplayName</key>
  <string>${appName}</string>
  <key>CFBundleExecutable</key>
  <string>zero-spoiler</string>
  <key>CFBundleIdentifier</key>
  <string>com.zero-spoiler.app</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>${appName}</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0.0</string>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>LSMinimumSystemVersion</key>
  <string>12.0</string>
</dict>
</plist>
`,
  "utf8",
);

await writeFile(
  launcherPath,
  `#!/bin/zsh
set -e

APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="\${ZERO_SPOILER_PORT:-4173}"
URL="http://127.0.0.1:\${PORT}"
LOG_FILE="\${TMPDIR:-/tmp}/zero-spoiler.log"

(
  sleep 1.2
  /usr/bin/open "$URL"
) &

export PORT
exec "$APP_ROOT/Resources/node" "$APP_ROOT/Resources/zero-spoiler-single.js" >> "$LOG_FILE" 2>&1
`,
  "utf8",
);
await chmod(launcherPath, 0o755);

await execFileAsync("zip", ["-r", "-X", `${appName} macOS Apple Silicon.zip`, `${appName}.app`], {
  cwd: distDir,
});

console.log(`App creada: ${appPath}`);
console.log(`ZIP creado: ${zipPath}`);
