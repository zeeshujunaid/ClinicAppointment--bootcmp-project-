const app = require("../server"); // path adjust karo
const serverless = require("serverless-http");

module.exports = serverless(app);
