交卷方式不限, 可用 github, google drive, email 附件

我會下載程式碼來執行, 並且以附件的程式碼來驗證

測試 server 的程式碼如附件
由於 gmail 安全掃描無法寄送 js 檔案
請將附件裡的 .txt 副檔名改成 .js 


[題目]
請用 node.js 開發 api server, 並且滿足以下需求  

(1) 當 client 呼叫 GET http://localhost:8080/hello/mark
請回傳 json object 
{ "reply" : "hello mark" }

如果 request 的 mark 替換成 annie, response 會變成 hello annie


(2) 當 client 呼叫 POST http://localhost:8080/hello/mark, 並且 request body 為 { "job" : "ui designer" }  
請回傳 json object 

{ "reply" : "mark's job is ui designer" }
如果 request 的 mark 替換成 annie, response 會變成 annie's jon is ui designer

ui designer 換成 programmer, response 會變成 mark's job is programmer

(3) 當 client 呼叫 POST http://localhost:8080/file/${uploadFileParameter}
需要將 test.mp4 檔案上傳到 server , 並且儲存該檔案 (路徑跟 server.js 同位置即可)

請回傳該檔案大小
{ "size" : "save file szie 200 kb" }


