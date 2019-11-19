const express = require("express");
const cookieSession = require("cookie-session");

const app = express()
    .use(cookieSession({
        keys: ["SECRET_KEY"]
    }))
    .use("/home", (req, res) => {
        console.log("home")
        if (req.session.views) {
            req.session.views++;
        } else {
            req.session.views = 1;
        }
        res.end("Count : "+ req.session.views);
    })
    .use("/delete", (req, res) => {
        console.log("delete")
        delete req.session.views;
        res.end("Resetting Views");
    })
    .listen(9090);