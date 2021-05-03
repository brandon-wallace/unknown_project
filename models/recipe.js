const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipe_title: {
        type: String,
        required: true
    },
    recipe_image: {
        data: Buffer,
        contentType: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    directions: {
        type: String,
        required: true
    },
    ingredients: [{
        ingredient: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'},
        quality: {type: Number, required: false},
        quantityType: {type: String, required: false}
    }],
    preptime: {
        type: Number,
        required: true
    },
    cook_time: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema);


module.exports = Recipe;
