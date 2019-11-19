const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({extended : true}));
let items = [];
const PORT = process.env.PORT || 9090;

router.route("/")
    .get((req, res, next)=>{
        if(items.length === 0){
            return res.send({status : "FOUND 0 ITEMS"})    
        }
        res.status(200).send({status : "FOUND", items : items})
    })
    .post((req, res, next)=>{
        items.push(req.body);
        res.status(200).send({status : "UPDATED", item_Id : items.length - 1})
    })
    .put((req, res, next)=>{
        items = [];
        items.push(req.body);
        res.status(200).send({status : "UPDATED", item: items[0]})
    })
    .delete((req, res, next)=>{
        items = [];
        res.status(200).send({status : "DELETED"})
    })
router.route("/:id")
    .get((req, res, next) => {
        const id = req.params['id'];
        if(id && items[Number(id)]){
            res.send({status : "FOUND", item : items[Number(id)]})
        }else{
            res.status(404).send({status : "NOT FOUND"});
        }
    })
    .all((req, res, next) => {
        res.status(501).send({status : "NOT IMPLEMENTED"})
    })

const app = express();
app.use("/todos", router);
app.listen(PORT, ()=>{console.log("Server started on PORT : ", PORT)});