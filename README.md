NodeJs API

## 使用 Client 呼叫 GET API

```
當 client 呼叫 POST http://localhost:8080/hello/mark
請回傳 json object 
{ "reply" : "hello mark" }
如果 request 的 mark 替換成 annie, response 會變成 hello annie
```

下方為 GET API 之程式語法

### Server.js
```js
app.get('/hello/:name',(req, res) => {
	res.setHeader("Content-Type", "application/json")
	let jsonBody = {
    "reply" : "hello "+req.params.name
  }
  //回傳結果
	console.log(JSON.stringify(jsonBody))
	res.json(jsonBody)
});
```

### client-test.js
```js
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
```

成功畫面如下圖
![image](https://github.com/willy199710/intern-test/blob/master/pic/get-hello-name.JPG)

***

## 使用 Client 呼叫 POST API

``` 
當 client 呼叫 POST http://localhost:8080/hello/mark, 並且 request body 為 { "job" : "ui designer" }  
請回傳 json object 

{ "reply" : "mark's job is ui designer" }
如果 request 的 mark 替換成 annie, response 會變成 annie's jon is ui designer

ui designer 換成 programmer, response 會變成 mark's job is programmer
```

### Server.js
```js
app.post('/hello/:name',(req,res) => {
    res.setHeader("Content-Type", "application/json")
	let body = ""
	
	req.on('data', (chunk) => {
		body += chunk
	
    }).on('end', () => {
      let takejob = JSON.parse(body) //將字串轉換成json format
	  let jsonBody = {
    "reply" : req.params.name+"'s job is "+ takejob.job
    }
	//回傳結果
	console.log(JSON.stringify(jsonBody))
	res.json(jsonBody)
    });
	
});
```
成功畫面如下圖
![image](https://github.com/willy199710/intern-test/blob/master/pic/post-hello-name.JPG)

***

## 使用 Client 呼叫 POST API 上傳檔案

```
當 client 呼叫 POST http://localhost:8080/file/${uploadFileParameter}
需要將 test.mp4 檔案上傳到 server , 並且儲存該檔案 (路徑跟 server.js 同位置即可)

請回傳該檔案大小
{ "size" : "save file szie 200 kb" }
```

### Server.js
```js
app.post('/file/:fileparameter',(req,res) =>{
	let writeStream = fs.createWriteStream('test.mp4') //建立寫入的Stream
	req.on('data',(chunk)=>{
		writeStream.write(chunk)
	});
	
	req.on('end',()=>{
	writeStream.end()
	let FileLength = Number((req.headers['content-length']/1024).toFixed(0)); //byte轉換成kb
	let jsonBody ={
	"reply" : "save file size " + FileLength + " kb"
	}
	console.log(JSON.stringify(jsonBody))
	res.json(jsonBody)
	});

});
```
成功畫面如下圖
![image](https://github.com/willy199710/intern-test/blob/master/pic/post-file.JPG)
