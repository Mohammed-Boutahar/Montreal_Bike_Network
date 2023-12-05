
const getCompteurs = async (req, res) => {
  try {
    const collection = req.db;
    const { implantation, limite, page = 1, nom } = req.query;

    //debugging
    // console.log("limite = "+limite);
    // console.log("page = "+page);
    // console.log("implantation = "+implantation);
    // console.log("nom = "+nom);

    // Construct the query based on optional parameters
    const query = {};
    if (implantation) {
      query.Annee_implante = { $gte: implantation }; // Greater than or equal to
    }
    if (nom) {
      query.Nom = { $regex: new RegExp(`^${nom}`, 'i') }; // Case-insensitive search and starts with...
    }

    // Fetch total count for pagination
    const totalCount = await collection.countDocuments(query);

    // Calculate skip value for pagination
    const skip = (page - 1) * limite;

    // Fetch paginated data
    const data = await collection
      .find(query)
      .skip(skip)
      .limit(Number(limite))
      .toArray();

    // Calculate next and previous page links
    let totalPages = 1
    if (limite !== undefined) {
      totalPages = Math.ceil(totalCount / limite);
    }

    const response = {
      data,
      meta: {
        totalCount,
        totalPages,
        currentPage: Number(page),
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//For test purposes
const getCompteursAll = async (req, res) => {
  try {
    const collection = req.db;
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /compteurs/:id
const getCompteurById = async (req, res) => {
  try {
    const collection = req.db;
    const id = req.params.id;
    const data = await collection.findOne({ ID: id });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getCompteursAll,
  getCompteurs,
  getCompteurById,
};
