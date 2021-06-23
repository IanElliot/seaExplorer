const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://db:db@cluster0.3esvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'fish'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const fishSchema = new Schema({
  speciesName: String
})

const FavoriteFish = mongoose.model('fish', speciesSchema);

module.exports = {
  Species,
};