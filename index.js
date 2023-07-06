const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const recipe = new Recipe({
      title: "Delicious Pasta",
      level: "Easy Peasy",
      ingredients: ["pasta", "tomato sauce", "cheese"],
      cuisine: "Italian",
      dishType: 'main_course',
      duration: 30,
      creator: "Giovanni",
    });
    return Recipe.create(recipe);
  })
  .then((createdRecipe) => {
    console.log("Added new recipe:", createdRecipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((createdRecipes) => {
    console.log("Added recipes to the database:");
    createdRecipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  })
  .then(()=>{
        return Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese'},
          { duration: 50 }
        );
  })
  .then(() =>{
    console.log('Successfully updated the duration of Rigatoni alla Genovese')
  })
  .then(() =>{
    return Recipe.deleteOne(
      {title: 'Carrot Cake'}
    )
  })
  .then(() =>{
    console.log('Successfully removed Carrot Cake');
  })

    .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
