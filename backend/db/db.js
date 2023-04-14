const mongoose = require('mongoose');

mongoose.connect(process.env.URL,(
    console.log('DB is connected')
))

// module.exports = connectDB;