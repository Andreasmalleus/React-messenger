const mongoose = require('mongoose');

const connectDb = () =>{
    return mongoose.connect(process.env.DB_CONN, {useNewUrlParser : true,useUnifiedTopology: true})
}

module.exports = {
    connectDb
}