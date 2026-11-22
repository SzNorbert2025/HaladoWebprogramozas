
require("dotenv").config();

const mongoose = require("mongoose");
const Movie = require("./models/Movie");


const movies = [
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    releaseYear: 2014,
    director: "Christopher Nolan",
    description: "Űrutazás az emberiség megmentéséért."
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    releaseYear: 2008,
    director: "Christopher Nolan",
    description: "Batman szembeszáll Jokerrel Gotham Cityben."
  },
  {
    title: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    director: "Christopher Nolan",
    description: "Egy csapat az álmok világában hajt végre küldetést."
  },
  {
    title: "Titanic",
    genre: "Romance",
    releaseYear: 1997,
    director: "James Cameron",
    description: "Szerelmi történet a Titanic fedélzetén."
  },
  {
    title: "Avatar",
    genre: "Sci-Fi",
    releaseYear: 2009,
    director: "James Cameron",
    description: "Egy katona különleges küldetésre indul a Pandorán."
  },
  {
    title: "The Matrix",
    genre: "Sci-Fi",
    releaseYear: 1999,
    director: "Lana Wachowski és Lilly Wachowski",
    description: "Egy hacker felfedezi a valóság titkát."
  },
  {
    title: "Gladiator",
    genre: "Action",
    releaseYear: 2000,
    director: "Ridley Scott",
    description: "Egy római hadvezér gladiátorként küzd az igazságért."
  },
  {
    title: "Forrest Gump",
    genre: "Drama",
    releaseYear: 1994,
    director: "Robert Zemeckis",
    description: "Egy különleges férfi életének története."
  },
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    releaseYear: 1994,
    director: "Frank Darabont",
    description: "Egy igazságtalanul elítélt férfi története."
  },
  {
    title: "Jurassic Park",
    genre: "Adventure",
    releaseYear: 1993,
    director: "Steven Spielberg",
    description: "Egy dinoszauruszparkban elszabadul a káosz."
  }
];


const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB csatlakoztatva!");

    let added = 0;

    for (const movie of movies) {
      const existingMovie = await Movie.findOne({
        title: movie.title,
        releaseYear: movie.releaseYear
      });

      if (!existingMovie) {
        await Movie.create(movie);
        added++;
      }
    }

    console.log(`${added} új film hozzáadva!`);
    console.log("Adatbázis feltöltése kész.");
  } catch (error) {
    console.error("Hiba:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
