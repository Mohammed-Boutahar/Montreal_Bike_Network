const turf = require('@turf/turf');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://gti525-02-02:F6Xi4s1f43UMENvl@gti525.9hlsaqk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('gti525');


const getTerritoires = async (req, res) => {
   try {
      const territoires_collection = database.collection('territoires_geojson');
      const compteurs_collection = database.collection('compteurs');
      const territoires = await territoires_collection.findOne({}, { projection: { _id: 0 } });
      const compteurs = await compteurs_collection.find({}).toArray();

      const tabTerritoires = [];
      const tabCompteurs = [];

      // Parcourir les territoires pour ajouter à tabTerritoires la location et le name de chaque territoire comme dans resultat
      for (let i = 0; i < territoires.features.length; i++) {
        // Vérifer les doublons de territoires en vérifiant si le codeid est déjà dans tabTerritoires
        let doublon = false;
        for (let j = 0; j < tabTerritoires.length; j++) {
          if (tabTerritoires[j].codeid == territoires.features[i].properties.CODEID) {
            doublon = true;
          }
        }
        if (territoires.features[i].properties.CODEID >= 0 && territoires.features[i].properties.CODEID <= 34 && doublon == false) {
          tabTerritoires.push({
            popularity: 0,
            geometry: {
                type: territoires.features[i].geometry.type,
                coordinates: territoires.features[i].geometry.coordinates
              },
            name: territoires.features[i].properties.NOM,
            codeid: territoires.features[i].properties.CODEID
          });
        }
      }

      // Parcourir les compteurs pour ajouter à ce compteurs la location et le name de chaque compteur comme dans resultat
      for (let i = 0; i < compteurs.length; i++) {
         tabCompteurs.push({
            Longitude: Number(compteurs[i].Longitude),
            Latitude: Number(compteurs[i].Latitude),
            ID: compteurs[i].ID
         });
      }

      // Créez des GeoJSON FeatureCollections pour les compteurs et les territoires
      const compteursCollection = turf.featureCollection(tabCompteurs.map(compteur => turf.point([compteur.Longitude, compteur.Latitude], { ID: compteur.ID })));
      const territoiresCollection = turf.featureCollection(tabTerritoires);

      // Parcourez chaque territoire et vérifiez quels compteurs se trouvent à l'intérieur
      const result = [];
      let i = 0;
      territoiresCollection.features.forEach(territoire => {
          const arrondissement = territoire.name;
          const compteursInTerritoire = turf.pointsWithinPolygon(compteursCollection, territoire.geometry);

          // Stockez les ID des compteurs pour cet arrondissement
          result.push({
            name: arrondissement,
            compteurs: compteursInTerritoire.features.map(compteur => compteur.properties.ID)
          });
      });
      
      // Afficher le nombre de compteurs dans chaque arrondissement
      /* for (let i = 0; i < tabTerritoires.length; i++) {
        console.log(tabTerritoires[i].name + " : " + result[tabTerritoires[i].name].length);
      }
      
      console.log(tabTerritoires.length); */
      
      res.json(result);
   } catch (error) {
      console.error('Error retrieving data from MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = {
  getTerritoires,
};
