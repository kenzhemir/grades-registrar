const fs = require('fs')


const targetFile = "cookies.json"

async function saveCookies(cookie) {
  return new Promise((resolve, reject) => {
    try {
      var data = JSON.stringify(cookie);
      console.log("Saving cookies to JSON file: %s", targetFile);
    } catch (err) {
      console.log("Could not convert object to JSON string ! " + err);
      reject(err);
    }

    // Try saving the file.        
    fs.writeFile(targetFile, data, (err, text) => {
      if (err)
        reject(err);
      else {
        resolve(targetFile);
      }
    });
  });
}

async function getCookies() {

  return new Promise((resolve, reject) => {
    // Try saving the file.        
    fs.readFile(targetFile, (err, data) => {
      if (err)
        reject(err);
      else {
        resolve(JSON.parse(data));
      }
    });
  });
}

module.exports = {
  saveCookies,
  getCookies
}