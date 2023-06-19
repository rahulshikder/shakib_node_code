const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");
const lib = {};
//base directroy of data folder
lib.basedir = path.join(__dirname, "../.data/");

//write data to file
lib.create = (dir, file, data, callback) => {
  //open file for writing
  fs.open(`${lib.basedir + dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      //convert to string data
      const stringData = JSON.stringify(data);
      //write data to file and then close it
      fs.writeFile(fileDescriptor, stringData, (err2) => {
        if (!err2) {
          fs.close(fileDescriptor, stringData, (err3) => {
            if (!err3) {
              callback(false);
            } else {
              callback("Error closing the new file");
            }
          });
        } else {
          callback("Error waiting to new file");
        }
      });
    } else {
      callback("thare was an err ,file already exists!! ");
    }
  });
};
// read data file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
  });
};

//data update file
lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      //convert data to string
      const stringData = JSON.stringify(data);
      //truncate the file
      fs.ftruncate(fileDescriptor, (err1) => {
        if (!err1) {
          //write the file and close it
          fs.writeFile(fileDescriptor, stringData, (err2) => {
            if (!err2) {
              //close the file
              fs.close(fileDescriptor, (err3) => {
                if (!err3) {
                  callback(false);
                } else {
                  callback("error closing file");
                }
              });
            } else {
              callback("error writing to file");
            }
          });
        } else {
          callback("Error the truncate file");
        }
      });
    } else {
      console.log("Error updating.File may not  exists");
    }
  });
};
//deleate data file
lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(`error deleting file`);
    }
  });
};
module.exports = lib;
