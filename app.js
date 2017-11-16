const http = require("http");
const fs = require("fs");

const server = http.createServer(function(req,res){
	const url = req.url;
	const file = url.substring(1);
	console.log('Serving Get request on:', req.url);

	fs.readFile(file,function(err,data){
		if (err)
		{
			res.writeHeader(404,{
				'Content-Type': 'text/html'
			});
			res.write(file);
			res.end();
		}else{
			if (file.indexOf("css")!=-1)
			{
				res.writeHeader(200,{
					'Content-Type': 'text/css'
				});
			}else{
				res.writeHeader(200,{
					'Content-Type': 'text/html'
				});
			}
			res.write(data);
			res.end();
		}
	});
}).listen(3000);
console.log("Server runing at port: " + 3000);