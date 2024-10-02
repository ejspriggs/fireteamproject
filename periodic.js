require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODBURI);

const testSchema = new mongoose.Schema({
    testKey: { type: String, required: true }
});

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to MongoDB at ${db.host}.${db.port}`) );
db.on('error', (error) => console.log('Database error\n', error) );

const Test = mongoose.model("Test", testSchema);

Test.create({ testKey: `Timer popped at ${Date()}` }).then( () => {
    console.log('Timer event logged.');
    mongoose.connection.close().then( () => {
        console.log('Connection closed.');
        process.exit(0);
    });
});
