const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function run(cmd, env = {}) {
  console.log(">", cmd);
  execSync(cmd, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error("Missing:", src);
    process.exit(1);
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

console.log("Building landing (base /)...");
run("cd landing-page && npm run build");

console.log("Building dashboard (base /dashboard/)...");
run("cd dashboard && npm run build", { VITE_BASE: "/dashboard/" });

console.log("Building checkout (base /checkout/)...");
run("cd sensoriai-checkout-flow && npm run build", { VITE_BASE: "/checkout/" });

const distRoot = path.join(root, "dist");
if (fs.existsSync(distRoot)) {
  fs.rmSync(distRoot, { recursive: true });
}
fs.mkdirSync(distRoot, { recursive: true });

console.log("Merging output...");
copyDir(path.join(root, "landing-page", "dist"), path.join(distRoot));
copyDir(path.join(root, "dashboard", "dist"), path.join(distRoot, "dashboard"));
copyDir(path.join(root, "sensoriai-checkout-flow", "dist"), path.join(distRoot, "checkout"));

console.log("Done. Output in dist/");
