//插件
const express = require('express')
const request = require('request')
const fs = require('fs');
const app = express()

// 使POST之 Request json可成功讀取(middle ware)
app.use(express.json())


// 題目(1) : 呼叫GET http://localhost:8080/hello/mark , 回傳json object { "reply" : "hello mark" } , request可更換名稱
app.get('/hello/:name',(req, res) => {
	res.setHeader("Content-Type", "application/json")
	let jsonBody = {
    "reply" : "hello "+req.params.name
  }
  //回傳結果
	console.log(JSON.stringify(jsonBody))
	res.json(jsonBody)
});

//題目(2) : 呼叫 POST http://localhost:8080/hello/mark, 並且 request body 為 { "job" : "ui designer" }  請回傳 json object ， request可更換
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

//題目(3) : 呼叫 POST http://localhost:8080/file/${uploadFileParameter},需要將 test.mp4 檔案上傳到 server , 並且儲存該檔案
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


//Server 偵測port:8080之連線
app.listen(8080,()=>{
	console.log("Server listening port 8080")
});

