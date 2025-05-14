/**
* this configuration for connect our application with mongodb
*/
/**
* This configuration connects our application with MongoDB
*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restaurant', {
    useNewUrlParser: true,
    useUnifiedTopology: true, // recomendable en versiones modernas
})
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('MongoDB connection error:', err));

