
const getPassagesForId = async (req, res) => {
  try {
    const collection = req.db;
    const id = req.params.id;
    const debut = req.query.debut || '20190101'; // Default value if no query is provided is 2019-01-01
    const fin = req.query.fin || '20221231'; // Default value if no query is provided is 2022-12-31
    const intervalle = req.query.intervalle || 'jour'; // Default value if no query is provided is 'jour'

    // Format the dates to match the format in the database
    const formatedDebut = `${debut.slice(0, 4)}-${debut.slice(4, 6)}-${debut.slice(6, 8)}`;
    const formatedFin = `${fin.slice(0, 4)}-${fin.slice(4, 6)}-${fin.slice(6, 8)}`;

    //debugging
    // console.log('formatedDebut : ', formatedDebut);
    // console.log('formatedFin : ', formatedFin);
    // console.log('intervalle : ', intervalle);

    const data = await collection.find({
      Date: {
        $gte: formatedDebut,
        $lte: formatedFin,
      },
    }).toArray();

    // Check if the provided ID is present in the data
    if (!data[0] || !data[0].hasOwnProperty(id)) {
      return res.status(404).json({ error: 'ID not found in data' });
    }

    // Extract Date and the corresponding ID from each row
    const filteredData = data.map(row => ({
      Date: row.Date.slice(0, 10), // Get the date without time
      count: row[id], // Use count property assuming count is the field you want
    }));

     // Set type of data to display
     let dataToDisplay = {
      labels: [],
      datasets: [
        {
          label: "Passages",
          data: [],
        },
      ],
    };

    // To avoid conflicts with the data variable
    const chartData = data;

    // Format the data based on the provided intervalle (jour, semaine, mois)
    switch (intervalle) {
      case "jour":
        const jourData = chartData.reduce((acc, data) => {
          const date = data.Date.slice(0, 10);
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += Number(data[id]);
          return acc;
        }, {});
        dataToDisplay.labels = Object.keys(jourData);
        dataToDisplay.datasets[0].data = Object.values(jourData);
        break;

      case "semaine":
        const semaineData = chartData.reduce((acc, data) => {
          const date = data.Date.slice(0, 10); // Get the date without time
          const weekStart = getWeekStartDate(new Date(date));
          const weekKey = weekStart.toISOString().slice(0, 10);
          if (!acc[weekKey]) {
            acc[weekKey] = 0;
          }
          acc[weekKey] += Number(data[id]);
          return acc;
        }, {});
        dataToDisplay.labels = Object.keys(semaineData);
        dataToDisplay.datasets[0].data = Object.values(semaineData);
        break;

      case "mois":
        const moisData = chartData.reduce((acc, data) => {
          const date = data.Date.slice(0, 7);
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += Number(data[id]);
          return acc;
        }, {});
        dataToDisplay.labels = Object.keys(moisData);
        dataToDisplay.datasets[0].data = Object.values(moisData);
        break;

      default:
        break;
    }

    res.json(dataToDisplay);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Format the data based on the provided intervalle (semaine)
const getWeekStartDate = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 1 ? -1 : 6); //or (day === 1 ? 0 : 7) if you want Monday to be the first day of the week
  return new Date(currentDate.setDate(diff));
};

// GET all data, test purposes
const getPassagesAll = async (req, res) => {
  try {
    const collection = req.db;
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getPassagesAll,
  getPassagesForId,
};
