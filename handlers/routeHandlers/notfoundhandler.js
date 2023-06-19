//module scafolding
const handler = {};
handler.notfoundhandle = (requestProperties, callback) => {
  callback(404, {
    message: "your requst url is not found",
  });
};

module.exports = handler;
