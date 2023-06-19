//dependencies
const { hash } = require("../../helpers/utilites");
const data = require("../../lib/data");
//module scafolding

const handler = {};
handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};
handler._users = {};

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgrement =
    typeof requestProperties.body.tosAgrement === "boolean" &&
    requestProperties.body.tosAgrement.trim().length > 0
      ? requestProperties.body.tosAgrement
      : false;

  if (firstName && lastName && phone && password && tosAgrement) {
    //make sure that the user doesn't exits
    data.read("users", phone, (err1) => {
      if (err1) {
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgrement,
        };
        //store the create to db
        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              error: "user was a created !!!",
            });
          } else {
            callback(500, {
              error: "could not create a user",
            });
          }
        });
      } else {
        callback(500, {
          error: "thare was a problem in your server site!!",
        });
      }
    });
  } else {
    callback(400, {
      error: "you have a problem in your request",
    });
  }
};
handler._users.get = (requestProperties, callback) => {
  callback(200);
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
