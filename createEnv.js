import fs from "fs-extra";
const env = process.env.NODE_ENV || "development";
let envContent;
switch (env) {
  case "production":
    envContent = `
        REACT_APP_API_URL=https://api.production.com
        REACT_APP_SECRET_KEY=prod-secret-key
        `;
    break;
  case "test":
    envContent = `
        REACT_APP_API_URL=http://test-server.com
        REACT_APP_SECRET_KEY=test-secret-key
        `;
    break;
  // case 'development':
  default:
    envContent = `
        REACT_APP_API_URL=http://localhost:5000 
        REACT_APP_SECRET_KEY=dev-secret-key
        `;
    break;
}
fs.writeFileSync(".env", envContent.replace(/^\s+/gm, "").trim());
console.log(".env file created for", env, "environment");
