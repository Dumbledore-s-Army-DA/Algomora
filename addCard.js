const mongoose = require('mongoose');
const Card = require('./models/Card'); // Adjust the path if your model is in a different folder

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb+srv://shivu:shivu123@unknowndb.2mgnf.mongodb.net/dBase'; // e.g. algomora

const cards = [
  {
    name: 'Adalbert Waffling',
    image: 'https://static.wikia.nocookie.net/harrypotter/images/8/87/Adalbert_Waffling-24-chocFrogCard.png/revision/latest?cb=20160606202123',
    shardsRequired: 100
  },
  {
    name: 'Alberic Grunnion-97',
    image: 'https://static.wikia.nocookie.net/harrypotter/images/3/30/Alberic_Grunnion-97-chocFrogCard.png/revision/latest?cb=20160606202125',
    shardsRequired: 150
  },
  {
    name: 'Alberta Toothill-89',
    image: 'https://static.wikia.nocookie.net/harrypotter/images/d/d8/Alberta_Toothill-89-chocFrogCard.png/revision/latest?cb=20160606202127',
    shardsRequired: 200
  },
  {
    name: 'Almeric Sawbridge-26',
    image: 'https://static.wikia.nocookie.net/harrypotter/images/1/19/Almeric_Sawbridge-26-chocFrogCard.png/revision/latest/scale-to-width-down/1000?cb=20210420000505',
    shardsRequired: 120
  }
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    await Card.deleteMany(); // Optional: clear existing cards
    const result = await Card.insertMany(cards);
    console.log(`Inserted ${result.length} cards`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting or inserting:', err);
    mongoose.disconnect();
  });
