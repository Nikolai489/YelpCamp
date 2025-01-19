const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review')
const cities = require('./cities');
const {places, descriptors, imagesrc} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    for(let i = 0; i < 50; i++){
        const randomth = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            author: '67883a3375214eaca7166800',
            location: `${cities[randomth].city}, ${cities[randomth].state}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[randomth].longitude, cities[randomth].latitude]
              },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [imagesrc[i]],
            description:  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo quasi vitae fuga, obcaecati quis ut delectus illum, possimus veniam assumenda, voluptatum alias ex repellat facilis. Excepturi nesciunt est dolore doloremque?',
            price: price
        })
        await camp.save();
    }
    //const c = new Campground({title: 'purple field'});
    //await c.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})
 