const serverless = require("serverless-http");
const app = require("../server"); // yaha server.js ka path

module.exports.handler = serverless(app);
