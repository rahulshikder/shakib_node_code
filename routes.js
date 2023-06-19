//dependencies
const { samplehandle } = require("./handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");

const route = {
  sample: samplehandle,
  user: userHandler,
};
module.exports = route;
