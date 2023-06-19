//dependencis
const url = require("url");
const { StringDecoder } = require("string_decoder");
const { json } = require("body-parser");
const { parseJSON } = require("../helpers/utilites");

//module scafolding
const handler = {};
handler.handleReqRes = (req, res) => {
  //request handle
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const quaryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    quaryStringObject,
    headerObject,
  };

  const routes = require("../routes");
  const {
    notfoundhandle,
  } = require("../handlers/routeHandlers/notfoundhandler");
  const decoder = new StringDecoder("utf8");
  const chosenhandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notfoundhandle;

  
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    requestProperties.body = parseJSON(realData);
    chosenhandler(requestProperties, (statuscode, payload) => {
      statuscode = typeof statuscode === "number" ? statuscode : 500;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);
  
      //return the fainal  response
      res.setHeader("Content-Type", "Application/json");
      res.writeHead(statuscode);
      res.end(payloadString);
    });
  });

  //Response handle
};
module.exports = handler;
