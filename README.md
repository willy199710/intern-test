# NodeJs API

##使用 Client 呼叫 GET API

```
當 client 呼叫 POST http://localhost:8080/hello/mark
請回傳 json object 
{ "reply" : "hello mark" }
如果 request 的 mark 替換成 annie, response 會變成 hello annie
```

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




(2) 當 client 呼叫 POST http://localhost:8080/hello/mark, 並且 request body 為 { "job" : "ui designer" }  
請回傳 json object 

{ "reply" : "mark's job is ui designer" }
如果 request 的 mark 替換成 annie, response 會變成 annie's jon is ui designer

ui designer 換成 programmer, response 會變成 mark's job is programmer

(3) 當 client 呼叫 POST http://localhost:8080/file/${uploadFileParameter}
需要將 test.mp4 檔案上傳到 server , 並且儲存該檔案 (路徑跟 server.js 同位置即可)

請回傳該檔案大小
{ "size" : "save file szie 200 kb" }
