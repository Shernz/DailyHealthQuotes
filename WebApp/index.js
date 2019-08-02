const Express = require('express');
const app = Express();
const path = require("path");

const db = require("./db");//same directory
const collection = "quotes";

db.connect((err) => {
    if(err){
        console.log("Error connecting to DB");
    }
    else{
        console.log("Connected successfully, listening to port 3000");
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"));
});

let i = 0;
app.get("/stayFit/",(req, res) => {
     db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if(err){
            return res.send("Error fetching data");
        } else {
            res.send(documents[i]);
            i++;
            if(i >= documents.length){
                i = 0;
            }
            
        }
})
});

app.listen(3000, () => console.log(""));