const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://gti525-02-02:F6Xi4s1f43UMENvl@gti525.9hlsaqk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('gti525');

const getMapData = async (req, res) => {
    const collection = await database.collection('territoires_geojson');
    const geojsonData = await collection.find({}).toArray();
    res.header('Content-Type', 'application/json');
    res.send(geojsonData);
};

const getArrondissement = async (req, res) => {
  const collection = await database.collection('territoires');
  const arrondissement = await collection.find({}).toArray();
  res.header('Content-Type', 'application/json');
  res.send(arrondissement);
}

const getPointsInterets = async (req, res) => {
  const limite = req.query.limite ? parseInt(req.query.limite) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const type = req.query.type || null;
  const territoire = req.query.territoire || null;
  const nom = req.query.nom || null;
  const skip = (page - 1) * limite;

  let filter = {};
  if (type) {
    filter.type = type;
  }
  if (territoire) {
    filter.Arrondissement = territoire;
  }
  if (nom) {
    filter.Nom_parc_lieu = { $regex: nom, $options: "i" }; // Case-insensitive partial match
  }

  const collection = database.collection('pointsdinterets');
  const result = await collection.find(filter).skip(skip).limit(limite).toArray();

  res.header('Content-Type', 'application/json');
  res.send(result);
};

const getAllPointsInterets = async (req, res) => {
  const collection = database.collection('pointsdinterets');
  const pointsInterets = await collection.find({}).toArray();
  res.header('Content-Type', 'application/json');
  res.send(pointsInterets);
}

const getPointsInteretsById = async (req, res) => {
  const collection = database.collection('pointsdinterets');
  const pointsInterets = await collection.find({ID: parseInt(req.params.id)}).toArray();
  res.header('Content-Type', 'application/json');
  res.send(pointsInterets);
}

const addPointInteret = async (req, res) => {
  const collection = database.collection('pointsdinterets');
  const MaxID = await collection.find({}).sort({ID: -1}).limit(1).toArray(); 
  req.body.ID = MaxID[0].ID + 1;
  const result = await collection.insertOne(req.body);
  res.header('Content-Type', 'application/json');
  res.send(result);
}

const modifyPointInteret = async (req, res) => {
  ID = parseInt(req.params.id);
  const collection = database.collection('pointsdinterets');
  const currentPointInteret = await collection.findOne({ID: ID});
  if (currentPointInteret) {
    const result = await collection.updateOne({ID: ID}, {$set: req.body});
    res.header('Content-Type', 'application/json');
    res.send(result);
  } else {
    res.status(404).send("Point d'interet non trouvé");
  }
}

const replacePointInteret = async (req, res) => {
  ID = parseInt(req.params.id);
  const collection = database.collection('pointsdinterets');
  const currentPointInteret = await collection.findOne({ID: ID});
  if (currentPointInteret) {
    const result = await collection.replaceOne({ID: ID}, req.body);
    res.header('Content-Type', 'application/json');
    res.send(result);
  } else {
    res.status(404).send("Point d'interet non trouvé");
  }
}

const deletePointInteret = async (req, res) => {
  ID = parseInt(req.params.id);
  const collection = database.collection('pointsdinterets');
  const currentPointInteret = await collection.findOne({ID: ID});
  if (currentPointInteret) {
    const result = await collection.deleteOne({ID: ID});
    res.header('Content-Type', 'application/json');
    res.send(result);
  } else {
    res.status(404).send("Point d'interet non trouvé");
  }
}

module.exports = {
    getMapData,
    getArrondissement,
    getPointsInterets,
    getAllPointsInterets,
    addPointInteret,
    modifyPointInteret,
    replacePointInteret,
    deletePointInteret,
    getPointsInteretsById
};