const mongoose = require('mongoose');

const playSchema = mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true }
});

const Play = mongoose.model('Play', playSchema);

const playsData = [
    {
        title: "Romeo and Juliet",
        genre: "Tragic Romance",
        description: "A tragic love story between Romeo and Juliet, two young star-crossed lovers.",
        author: "William Shakespeare",
        year: 1597
    },
    {
        title: "Hamlet",
        genre: "Tragedy",
        description: "The Prince of Denmark seeks revenge against his uncle, who has murdered Hamlet's father.",
        author: "William Shakespeare",
        year: 1600
    },
    {
        title: "Macbeth",
        genre: "Tragedy",
        description: "A Scottish general becomes king after receiving a prophecy from three witches.",
        author: "William Shakespeare",
        year: 1606
    }
];

Play.insertMany(playsData)
    .then(() => console.log('Plays data inserted successfully.'))
    .catch(error => console.error('Error inserting plays data:', error));

module.exports = Play;
