const express = require("express");
const cors = require("cors");
const { MongoClient } = require('mongodb');

const app = express();

const PORT = 8000;
const BASE_PATH = "/gti525/v1";

// our MongoDB uri
const uri = "mongodb+srv://gti525-02-02:F6Xi4s1f43UMENvl@gti525.9hlsaqk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('MongoDB: Connection Successful!');

    const database = client.db('gti525');

    //Collections
    const comptage_passages_collection = database.collection('comptage_velo');
    const reseau_cyclable_geojson_collection = database.collection('reseau_cyclable_geojson');
    const territoires_geojson_collection = database.collection('territoires_geojson');
    const compteurs_collection = database.collection('compteurs');

    // Routes
    const pointInteretRouter = require('./routes/pointInteretRouter');
    const territoiresRouter = require('./routes/territoiresRouter');
    const comptagePassagesRouter = require('./routes/comptagePassagesRouter')(comptage_passages_collection);
    const compteursRouter = require('./routes/compteursRouter')(compteurs_collection);
    // const territoiresRouter = require('./routes/territoiresRouter')(territoires_geojson_collection,compteurs_collection);
    const reseauRouter = require('./routes/reseauRouter')(reseau_cyclable_geojson_collection);

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(`${BASE_PATH}/pointsdinteret`, pointInteretRouter);
    app.use(`${BASE_PATH}/compteurs`, compteursRouter);
    app.use(`${BASE_PATH}/compteurs`, comptagePassagesRouter);
    app.use(`${BASE_PATH}/territoires`, territoiresRouter);
    app.use(`${BASE_PATH}/pistes`, reseauRouter);

    // Start the server
    app.listen(PORT, () => {
      console.log(
        `Server listening on ${PORT}\nAPI Access : http://localhost:${PORT}${BASE_PATH}`
      );
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();