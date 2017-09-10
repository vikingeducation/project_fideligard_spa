//testing file open file close and read writes
const fs = require("fs");
const util = require("util");

const getWriteFD = async file => {
  let filePointer;
  const open = util.promisify(fs.open);
  //check for existence
  try {
    filePointer = await open(file, "r");
  } catch (err) {
    console.log("catching error");
    if (err.code === "ENOENT") {
      //create a file
      console.log("creating a file ");
      // fs.w
    } else {
      console.log("other error");
      console.error(err);
    }
  } finally {
    filePointer = await open(file, "w");
  }
  return filePointer;
};

const write = util.promisify(fs.write);
let fileD;
// getWriteFD("nothing.txt")
//   .then(fd => {
//     console.log(fd);
//     fileD = fd;
//     // fs.write(fd, "nothing in here",)
//     return write(fd, "nothing to see here");
//   })
//   .then(complete => {
//     console.log("file written/overwritten");
//     console.log("complete = ", complete);
//     //close the file
//     fs.closeSync(fileD);
//   });
//grab two files if they exist otherwise create them
const getTwo = async (file1, file2, data1, data2) => {
  //check existence with open
  let exists;
  let fd;
  let files;
  let thing;
  const open = util.promisify(fs.open);
  const data = [file1, file2].map(file => {
    let resolved;
    let thing = open(file, "r");
    try {
      open(file, "r");
    } catch (err) {
      if (err.code === "ENDENT") {
        //create a file
      }
    } finally {
    }
    return resolved;
  });
  return thing;
  // fs.open(file1, "r", (err, data) => {
  //   if (err) {
  //     // console.log("e.code", err.code);
  //     // console.log("e.code", err.message);
  //     // console.log("e.code", err.stack);
  //
  //     //check out my error my error is amazing
  //     console.error(err);
  //     if (err.code === "ENDENT") {
  //       exists = false;
  //     } else {
  //       throw err;
  //     }
  //   }
  //   console.log(data);
  //   fd = data;
  //   exists = true;
  // });
  // console.log("exists ", exists, "data ", fd);
};
// getTwo("nothing.txt");
// getTwo("stuff.txt", "nothing.txt");

const fileExists = async file => {
  let filePointer;
  const open = util.promisify(fs.open);
  try {
    filePointer = await open(file, "r");
  } catch (err) {
    console.log("catching error");
    if (err.code === "ENOENT") {
      //create a file
      console.log("file does not exist");
      return false;
    } else {
      console.log("other error");
      console.error(err);
    }
  }
  //close file if you found one
  const close = util.promisify(fs.close);
  await close(filePointer);
  return true;
};

fileExists("things.txt");
fileExists("nothing.txt").then(console.log);
