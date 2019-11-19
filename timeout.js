const app = require("express")();
const timeout = require("connect-timeout");

app.use("/api", timeout(2000), (req, res, next) => {

}, (err, req, res, next) =>{
    if(req.timedout){
        res.writeHead(503);
        res.end("Timeout!");
    }else{
        next(err);
    }
})
app.listen(9090);