require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const {login, register} = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const artController = require("./controllers/showArt.controller")

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


//starting api routers and methods from here.
//sending this call to respective controllers to find route and desired method.

//user controller
app.use("/users", userController);

//product of art controller
app.use("/",artController);

//login and register controller
app.post("/login", login)
app.post("/register", register)




//connecting ans starting server
const port = process.env.PORT || 1697;

app.listen(port, () => {
    try{
        connect();
        console.log(`Server is running on port ${port}`);
    }catch(err){

    }
})