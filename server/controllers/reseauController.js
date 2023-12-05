const getReseau = async (req, res) => {
    try {
    	const collection = req.db;
		const data = await collection.findOne({}, { projection: { _id: 0 } });
      	const { populaireDebut, populaireFin } = req.query;
      	console.log("populaireDebut = "+populaireDebut);
      	console.log("populaireFin = "+populaireFin);

		const periode = {
			debut: "",
			fin: "20190331"
		};

		if(populaireDebut == undefined){
			// console.log("Sans filtre");
			res.json(data);
		}
		else{
			// console.log("Avec filtre");
			periode.debut = populaireDebut;

			if(populaireFin != undefined){
				periode.fin = populaireFin;
			}

			// console.log("populaireDebut = "+periode.debut);
			// console.log("populaireFin = "+periode.fin);

			// Récupérer la réponse de la requête pour récupérer les territoires avec le nombre de compteurs depuis le routeur territoires
			const territoires = await fetch('http://localhost:8000/gti525/v1/territoires').then(response => response.json());

			// Calcul de la popularité de chaque territoire : nombre de passages / nombre de compteurs
			for (let i = 0; i < territoires.length; i++) {
				console.log("territoire = "+territoires[i].name);
				territoires[i].popularity = 0;
				// Récupérer la réponse de la requête pour récupérer le nombre de passages depuis le routeur comptagePassages
				for (let j = 0; j < territoires[i].compteurs.length; j++) {
					//console.log("	compteur = "+territoires[i].compteurs[j]);
					const comptagePassages = await fetch('http://localhost:8000/gti525/v1/compteurs/'+territoires[i].compteurs[j]+'/passages?debut='+periode.debut+'&fin='+periode.fin+'&intervalle=mois').then(response => response.json());
					// Vérifier si le compteur a des passages
					if(comptagePassages.datasets != undefined){
						// Calculer la somme des passages pour chaque territoire
						//console.log("OK");
						territoires[i].popularity += comptagePassages.datasets[0].data.reduce((acc, nombre) => acc + nombre, 0);
					}
				}
				if(territoires[i].compteurs.length != 0){
					territoires[i].popularity = Math.round(territoires[i].popularity / territoires[i].compteurs.length);
				}
			}

			// console.log("Fin de la boucle");

			// Trier les territoires par popularité
			territoires.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1);

			//console.log(territoires);

			// Prendre les 3 territoires les plus populaires
			territoires.splice(3, territoires.length);

			// Supprimer les territoires qui ont une popularité de 0
			for (let i = 0; i < territoires.length; i++) {
				if(territoires[i].popularity == 0){
					territoires.splice(i, 1); // Supprimer le territoire
					i--;
				}
			}

			console.log(territoires);


			// Filtrer les données du réseau pour ne garder que les pistes qui sont dans les territoires les plus populaires
			for (let i = 0; i < data.features.length; i++) {
				let territoireTrouve = false;
				if (data.features[i].properties.NOM_ARR_VILLE_DESC != null) {
					for (let j = 0; j < territoires.length; j++) {
					
						let nom_piste = data.features[i].properties.NOM_ARR_VILLE_DESC;
						// Dans les noms des piste, changer les "–" par des "-" pour éviter les erreurs de caractères
						if (nom_piste.includes("–")) {
							nom_piste = nom_piste.replace("–", "-");
						}
						if(nom_piste.includes(territoires[j].name)){
							territoireTrouve = true;
							break;
						}
					}
				}
				if(!territoireTrouve){
					data.features.splice(i, 1); // Supprimer la piste
					i--;
				}
			}
			
			res.json(data);
		}
    } catch (error) {
      	console.error('Error retrieving data from MongoDB:', error);
      	res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getReseauById = async (req, res) => {
  try {
    console.log("test reseau by id");
    const collection = req.db;
    const id = parseInt(req.params.id);
    console.log(id);

    const data = await collection.findOne(
      { "features.properties.ID_CYCL": id },
      { projection: { _id: 0, features: { $elemMatch: { "properties.ID_CYCL": id } } } }
    );

    res.status(200).json(data.features[0]);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getReseau,
  getReseauById,
};
