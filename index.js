//dependencies
const http = require("http");

const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");
const { log } = require("console");

//app object -module scaffolding
const app = {};

// data write
// data.create("test", "newFile", { name: "sakib ahmed", age: "21" }, (err) => {
//   console.log(`err was `, err);
// });

// data read to file

// data.read("test", "newFile", (err, result) => {
//   console.log(err, result);
// });

//data update to file
// data.update("test", "newFile", { name: "sakib al hasan", age: "22" }, (err) => {
//   console.log(err);
// });

//deleting to data file
// data.delete("test", "newFile", (err) => {
//   console.log(err);
// });

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listening on port ${environment.port}`);
  });
};
//handle Reques Respond
app.handleReqRes = handleReqRes;
// start the server
app.createServer();
