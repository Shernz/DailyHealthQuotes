const MongoClient = require("mongodb").MongoClient;//connecting the db
const ObjectID = require("mongodb").ObjectID;//

const dbname = "healthQuotes";
const url = "mongodb://localhost:27017";//the location of the db
const mongoOptions = {useNewUrlParser : true}; //needed  only when using CRUD//!!!!!= instead of :

const state = {
    db : null
};//whether the db is connected? or does it have any value?

const connect = (cb) => {
    if(state.db){
        cb();
    }
    else{
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if(err){
                cb(err);
            }
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}


//getting the db
const getDB = () => {
    return state.db;
}

module.exports =  {getDB, connect};//for making it global across module.