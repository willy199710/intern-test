// keyword : npm , node official documentation, node tutorial
"use strict";

let request = require('request');
let fs = require('fs');

function getGetRequestPromise(url) {
  return new Promise((resolve, reject) => {
    request.get({
        url: url
      }, function(error, response, body) {
        if (error) {
          return reject(error);
        }
        resolve(body);
      }
    );
  });
}

function getPostRequestPromise(url, body) {
  return new Promise((resolve, reject) => {
    request.post({
        url: url,
        body: body,
      }, function(error, response, body) {
        if (error) {
          return reject(error);
        }
        resolve(body);
      }
    );
  });
}

function getUploadRequestPromise(url, headers, body) {
  return new Promise((resolve, reject) => {
    request.post({
        headers: headers,
        url: url,
        body: body,
      }, function(error, response, body) {
        if (error) {
          return reject(error);
        }
        resolve(body);
      }
    );
  });
}

async function start() {
  let getParamter = 'mark'; // mark will change the parameter
  let getUrl = `http://localhost:8080/hello/${getParamter}`;
  try {
    let getResponse = await getGetRequestPromise(getUrl);
    console.log(JSON.stringify(getResponse));
    /* 
     * response must be json format
     * ex : { "reply" : "hello mark" }
     */
  } catch(e) {
    console.log(e);
  }


  let postParamter = 'mark'; // mark will change the parameter
  let postUrl = `http://localhost:8080/hello/${postParamter}`;
  let jsonBody = {
    "job" : "ui designer"
  }
  let postBody = JSON.stringify(jsonBody);

  try {
    let postResponse = await getPostRequestPromise(postUrl, postBody);
    console.log(JSON.stringify(postResponse));
    /* 
     * response must be json format
     * ex : { "reply" : "mark's job is ui designer" }
     */
  } catch(e) {
    console.log(e);
  }


  let filename = 'test.mp4';
  let uploadFileParameter = 1;
  let uploadUrl = `http://localhost:8080/file/${uploadFileParameter}`;

  let uploadFileHeaders = {
    "Content-Type": "video/mp4",
    "Content-Length" : fs.statSync(filename).size,
  };

  let uploadBody = fs.createReadStream(filename);

  try {
    let uploadResponse = await getUploadRequestPromise(uploadUrl, uploadFileHeaders, uploadBody);
    console.log(JSON.stringify(uploadResponse));
    /* 
     * response must be json format, 200 is real file size
     * ex : { "size" : "save file szie 200 kb" }
     */
  } catch(e) {
    console.log(e);
  }
}

start();