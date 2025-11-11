const app = require("../Backend/server"); // path adjust karo
const serverless = require("serverless-http");

module.exports = serverless(app);
