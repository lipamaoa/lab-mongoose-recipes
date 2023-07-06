const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
const RecipeDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${mongoose.connection.name}"`);

    await Recipe.deleteMany();

    const recipe = new Recipe({
      title: "Delicious Pasta",
      level: "Easy Peasy",
      ingredients: ["pasta", "tomato sauce", "cheese"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 30,
      creator: "Giovanni",
    });
    const createdRecipe = await Recipe.create(recipe);
    console.log("Added new recipe:", createdRecipe.title);

    const newAddedRecipes = await Recipe.insertMany(data);
    console.log("Added recipes to the database:");
    newAddedRecipes.forEach((recipe) => {
      console.log(recipe.title);
    });

    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Successfully updated the duration of Rigatoni alla Genovese");

    const deleteRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Successfully removed Carrot Cake");
  } catch (error) {
    console.error("Error connecting to the database", error);
  } finally {
    mongoose.connection.close();
  }
};

RecipeDB();
