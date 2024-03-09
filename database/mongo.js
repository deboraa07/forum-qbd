const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/aula');
  console.log('Conectado com o MongoDB');
}

module.exports = mongoose;



/*require('dotenv').config();
const Usuario = require('../models/Usuario')

const url = process.env.DB_URL;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = url;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/
