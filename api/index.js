const serverless = require("serverless-http");
const app = require("../Backend/server"); // yaha server.js ka path

module.exports.handler = serverless(app);
