//module scafolding
const handler = {};
handler.samplehandle = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    message: "this is sample url",
  });
};

module.exports = handler;
