const express = require('express');
const app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);


app.use(session({ secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new FileStore,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  })
);



let username;
let password;

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    req.session.username = "Nisha";
    req.session.password = "Nisha@123"
    username = req.body.username;
    password = req.body.password;
    if(username === req.session.username && password === req.session.password)
    {
        next();
    }
    else
    {
        res.write("Invalid username and password...");
        res.end();
    }
});

app.post('/validate', (req, res) => {
    res.write(username + " Login Successfully");
    res.end();
});

app.listen(7000, () => {
    console.log("Listen on 7000");
});