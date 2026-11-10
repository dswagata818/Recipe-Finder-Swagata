import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./src/models/Recipe.js";

dotenv.config();

const raw = [
    // VEGETARIAN RECIPES

    [
        "Aloo Dum",
        "Vegetarian",
        40,
        "A delicious Bengali-style potato curry prepared with aromatic spices.",
        "Potato,Tomato,Onion,Ginger,Garlic,Turmeric,Cumin,Chilli Powder,Salt,Oil",
        "Boil and peel the potatoes.|Heat oil in a pan and lightly fry the potatoes.|Add chopped onion, ginger and garlic.|Add tomato and all spices.|Cook until the masala releases oil.|Add water and potatoes.|Simmer for 10 minutes and serve."
    ],

    [
        "Paneer Butter Masala",
        "Vegetarian",
        35,
        "A creamy North Indian curry made with paneer, butter and tomato gravy.",
        "Paneer,Tomato,Onion,Butter,Cream,Ginger,Garlic,Chilli Powder,Garam Masala,Salt",
        "Cut paneer into cubes.|Heat butter in a pan.|Add onion, ginger and garlic.|Add chopped tomatoes and cook until soft.|Blend the mixture into a smooth paste.|Cook the paste with spices.|Add paneer and cream.|Simmer for 5 minutes and serve."
    ],

    [
        "Veg Fried Rice",
        "Vegetarian",
        25,
        "A quick and tasty fried rice prepared with rice and fresh vegetables.",
        "Cooked Rice,Carrot,Beans,Capsicum,Spring Onion,Garlic,Soy Sauce,Pepper,Salt,Oil",
        "Cook rice and allow it to cool.|Chop all vegetables.|Heat oil in a wok.|Add garlic and vegetables.|Stir-fry for a few minutes.|Add cooked rice and soy sauce.|Season with salt and pepper.|Mix well and serve hot."
    ],

    [
        "Chole Masala",
        "Vegetarian",
        45,
        "A popular Indian chickpea curry cooked with onions and aromatic spices.",
        "Chickpeas,Onion,Tomato,Ginger,Garlic,Chole Masala,Turmeric,Cumin,Salt,Oil",
        "Soak chickpeas overnight.|Pressure cook chickpeas until soft.|Heat oil and cook chopped onions.|Add ginger and garlic.|Add tomatoes and spices.|Cook until the masala thickens.|Add boiled chickpeas and water.|Simmer for 15 minutes."
    ],

    [
        "Palak Paneer",
        "Vegetarian",
        30,
        "A nutritious Indian curry made with spinach puree and soft paneer.",
        "Spinach,Paneer,Onion,Tomato,Garlic,Ginger,Cumin,Cream,Salt,Oil",
        "Wash and blanch spinach.|Blend spinach into a smooth puree.|Cut paneer into cubes.|Heat oil and add cumin.|Add onion, ginger and garlic.|Add tomato and cook.|Add spinach puree and salt.|Add paneer and simmer for 5 minutes."
    ],

    [
        "Masala Dosa",
        "Vegetarian",
        30,
        "A crispy South Indian dosa filled with spicy mashed potato filling.",
        "Dosa Batter,Potato,Onion,Green Chilli,Mustard Seeds,Curry Leaves,Turmeric,Salt,Oil",
        "Boil and mash potatoes.|Heat oil and add mustard seeds.|Add curry leaves, onion and green chilli.|Add turmeric and mashed potatoes.|Mix the potato filling.|Spread dosa batter on a hot pan.|Add potato filling in the centre.|Fold and serve with chutney."
    ],

    [
        "Veg Pulao",
        "Vegetarian",
        35,
        "A fragrant rice dish cooked with mixed vegetables and whole spices.",
        "Rice,Carrot,Beans,Peas,Onion,Ginger,Garlic,Bay Leaf,Cinnamon,Salt,Oil",
        "Wash and soak rice for 20 minutes.|Chop all vegetables.|Heat oil and add whole spices.|Add onion, ginger and garlic.|Add vegetables and cook briefly.|Add rice and water.|Add salt and mix.|Cover and cook until rice is done."
    ],

    [
        "Dal Tadka",
        "Vegetarian",
        30,
        "A comforting lentil dish finished with a flavourful spice tempering.",
        "Toor Dal,Onion,Tomato,Garlic,Green Chilli,Turmeric,Cumin,Dried Red Chilli,Salt,Ghee",
        "Wash the dal thoroughly.|Pressure cook dal with turmeric and water.|Heat ghee in a pan.|Add cumin and dried red chilli.|Add garlic and onion.|Add tomato and cook until soft.|Pour the tempering over dal.|Mix and serve."
    ],

    [
        "Aloo Paratha",
        "Vegetarian",
        30,
        "A popular Indian flatbread stuffed with spiced mashed potatoes.",
        "Wheat Flour,Potato,Green Chilli,Coriander Leaves,Cumin Powder,Chilli Powder,Salt,Ghee",
        "Boil and mash potatoes.|Add spices and coriander leaves.|Prepare dough using wheat flour and water.|Make small dough balls.|Stuff each ball with potato mixture.|Roll into a flat paratha.|Cook on a hot pan with ghee.|Serve with curd or pickle."
    ],

    [
        "Mixed Veg Curry",
        "Vegetarian",
        35,
        "A colourful curry prepared with seasonal vegetables and Indian spices.",
        "Carrot,Beans,Potato,Peas,Cauliflower,Onion,Tomato,Ginger,Garlic,Turmeric,Salt,Oil",
        "Wash and chop all vegetables.|Heat oil in a pan.|Add onion, ginger and garlic.|Add tomatoes and spices.|Add chopped vegetables.|Mix everything properly.|Add water and cover the pan.|Cook until vegetables become tender."
    ],

    [
        "Poha",
        "Vegetarian",
        20,
        "A light Indian breakfast made with flattened rice, peanuts and spices.",
        "Poha,Onion,Peanuts,Green Chilli,Mustard Seeds,Curry Leaves,Turmeric,Lemon,Salt,Oil",
        "Wash poha gently and drain the water.|Heat oil in a pan.|Add mustard seeds and peanuts.|Add curry leaves, chilli and onion.|Add turmeric and salt.|Add poha and mix gently.|Cook for 3 minutes.|Add lemon juice and serve."
    ],

    [
        "Upma",
        "Vegetarian",
        25,
        "A simple South Indian breakfast made with roasted semolina.",
        "Semolina,Onion,Green Chilli,Carrot,Peas,Mustard Seeds,Curry Leaves,Water,Salt,Oil",
        "Dry roast semolina and keep aside.|Heat oil in a pan.|Add mustard seeds and curry leaves.|Add onion and green chilli.|Add vegetables and cook briefly.|Add water and salt.|Slowly add semolina while stirring.|Cook until thick and serve."
    ],

    [
        "Veg Chowmein",
        "Vegetarian",
        25,
        "A popular Indo-Chinese noodle dish with crunchy vegetables.",
        "Noodles,Cabbage,Carrot,Capsicum,Onion,Garlic,Soy Sauce,Vinegar,Pepper,Salt,Oil",
        "Boil noodles and drain.|Chop all vegetables.|Heat oil in a wok.|Add garlic and onion.|Add vegetables and stir-fry.|Add noodles, soy sauce and vinegar.|Season with pepper and salt.|Toss well and serve."
    ],

    [
        "Tomato Soup",
        "Vegetarian",
        25,
        "A warm and comforting soup prepared with fresh tomatoes.",
        "Tomato,Onion,Garlic,Butter,Black Pepper,Salt,Sugar,Water",
        "Wash and chop tomatoes.|Boil tomatoes with onion and garlic.|Allow them to cool slightly.|Blend into a smooth puree.|Strain the puree.|Heat butter in a pan.|Add puree, salt, sugar and pepper.|Simmer and serve warm."
    ],

    [
        "Jeera Rice",
        "Vegetarian",
        20,
        "A simple aromatic rice dish flavoured with cumin seeds.",
        "Basmati Rice,Cumin Seeds,Ghee,Bay Leaf,Water,Salt",
        "Wash and soak rice for 15 minutes.|Heat ghee in a pan.|Add cumin seeds and bay leaf.|Add drained rice and stir gently.|Add water and salt.|Cover and cook until rice is soft.|Fluff gently and serve."
    ],

    // NON-VEGETARIAN RECIPES

    [
        "Chicken Curry",
        "Non-Vegetarian",
        45,
        "A traditional Indian chicken curry cooked with onion, tomato and spices.",
        "Chicken,Onion,Tomato,Ginger,Garlic,Turmeric,Chilli Powder,Cumin,Garam Masala,Salt,Oil",
        "Wash and clean chicken.|Marinate chicken with turmeric and salt.|Heat oil in a pan.|Add onion and cook until golden.|Add ginger and garlic.|Add tomato and spices.|Add chicken and cook well.|Add water and simmer until chicken is fully cooked."
    ],

    [
        "Chicken Biryani",
        "Non-Vegetarian",
        60,
        "A fragrant rice dish prepared with marinated chicken and aromatic spices.",
        "Chicken,Basmati Rice,Onion,Yogurt,Ginger,Garlic,Biryani Masala,Mint,Coriander Leaves,Saffron,Salt,Ghee",
        "Wash and soak basmati rice.|Marinate chicken with yogurt and spices.|Fry sliced onions until golden.|Cook chicken until partially done.|Boil rice separately until partly cooked.|Layer rice over chicken.|Add mint, coriander and fried onions.|Cover and cook on low heat until fully cooked."
    ],

    [
        "Egg Curry",
        "Non-Vegetarian",
        30,
        "A simple and delicious curry made with boiled eggs and spicy gravy.",
        "Egg,Onion,Tomato,Ginger,Garlic,Turmeric,Chilli Powder,Cumin,Garam Masala,Salt,Oil",
        "Boil and peel eggs.|Lightly fry the eggs with turmeric.|Heat oil in a pan.|Cook chopped onion until golden.|Add ginger and garlic.|Add tomato and spices.|Add water and boiled eggs.|Simmer for 8 minutes."
    ],

    [
        "Fish Curry",
        "Non-Vegetarian",
        30,
        "A Bengali-style fish curry prepared with potatoes and turmeric-based gravy.",
        "Fish,Potato,Tomato,Turmeric,Chilli Powder,Cumin Seeds,Green Chilli,Mustard Oil,Salt",
        "Clean fish pieces.|Apply turmeric and salt.|Heat mustard oil and lightly fry fish.|Fry potato pieces separately.|Add cumin seeds and tomato.|Add turmeric, chilli powder and water.|Add potatoes and cook until tender.|Add fish and simmer gently."
    ],

    [
        "Chicken Fried Rice",
        "Non-Vegetarian",
        30,
        "A tasty fried rice made with chicken, rice, eggs and vegetables.",
        "Cooked Rice,Chicken,Egg,Carrot,Beans,Spring Onion,Garlic,Soy Sauce,Pepper,Salt,Oil",
        "Cook chicken pieces thoroughly and cut into small pieces.|Beat and scramble the egg.|Heat oil in a wok.|Add garlic and vegetables.|Add cooked chicken and scrambled egg.|Add cooked rice and soy sauce.|Season with salt and pepper.|Toss well and serve."
    ],

    [
        "Butter Chicken",
        "Non-Vegetarian",
        45,
        "A creamy tomato-based chicken curry flavoured with butter and spices.",
        "Chicken,Tomato,Butter,Cream,Yogurt,Ginger,Garlic,Chilli Powder,Garam Masala,Salt",
        "Marinate chicken with yogurt and spices.|Cook chicken until fully done.|Prepare tomato puree.|Heat butter in a pan.|Add ginger and garlic.|Add tomato puree and cook.|Add cream and cooked chicken.|Simmer for a few minutes."
    ],

    [
        "Chicken Korma",
        "Non-Vegetarian",
        45,
        "A rich chicken curry prepared with yogurt and a creamy nut-based gravy.",
        "Chicken,Onion,Yogurt,Cashew Nuts,Ginger,Garlic,Cardamom,Cinnamon,Garam Masala,Salt,Oil",
        "Marinate chicken with yogurt and salt.|Soak cashews and blend into a paste.|Heat oil and fry onions.|Add ginger and garlic.|Add chicken and cook briefly.|Add cashew paste and spices.|Add water as required.|Cover and cook until chicken is tender."
    ],

    [
        "Mutton Curry",
        "Non-Vegetarian",
        75,
        "A traditional slow-cooked mutton curry with rich onion and spice gravy.",
        "Mutton,Onion,Tomato,Ginger,Garlic,Potato,Turmeric,Chilli Powder,Cumin,Garam Masala,Salt,Oil",
        "Wash and marinate mutton with spices.|Heat oil in a pressure cooker.|Fry onions until golden.|Add ginger and garlic.|Add tomato and spices.|Add mutton and cook for several minutes.|Add potatoes and water.|Pressure cook until mutton is tender and fully cooked."
    ],

    [
        "Chicken Pakora",
        "Non-Vegetarian",
        30,
        "Crispy chicken fritters coated with a spiced gram flour batter.",
        "Chicken,Besan,Ginger Garlic Paste,Chilli Powder,Turmeric,Ajwain,Lemon Juice,Salt,Oil",
        "Cut chicken into small pieces.|Mix chicken with spices and lemon juice.|Add gram flour and a little water.|Make a thick coating.|Heat oil in a pan.|Fry chicken pieces until golden and fully cooked.|Drain excess oil and serve."
    ],

    [
        "Egg Fried Rice",
        "Non-Vegetarian",
        20,
        "A quick fried rice recipe with scrambled eggs and fresh vegetables.",
        "Cooked Rice,Egg,Carrot,Beans,Spring Onion,Garlic,Soy Sauce,Pepper,Salt,Oil",
        "Cook rice and cool it.|Beat eggs in a bowl.|Heat oil and scramble the eggs.|Add garlic and chopped vegetables.|Stir-fry for a few minutes.|Add cooked rice and soy sauce.|Season with salt and pepper.|Mix and serve hot."
    ],

    [
        "Chicken Chowmein",
        "Non-Vegetarian",
        30,
        "A popular noodle dish tossed with chicken and crunchy vegetables.",
        "Noodles,Chicken,Cabbage,Carrot,Capsicum,Onion,Garlic,Soy Sauce,Vinegar,Pepper,Salt,Oil",
        "Boil noodles and drain.|Cook chicken pieces thoroughly.|Heat oil in a wok.|Add garlic and onion.|Add chicken and vegetables.|Add noodles, soy sauce and vinegar.|Season with salt and pepper.|Toss well and serve."
    ],

    [
        "Fish Fry",
        "Non-Vegetarian",
        25,
        "A crispy fish preparation marinated with spices and shallow-fried.",
        "Fish Fillet,Lemon Juice,Ginger Garlic Paste,Turmeric,Chilli Powder,Cumin Powder,Breadcrumbs,Salt,Oil",
        "Clean fish fillets.|Marinate with lemon juice and spices.|Keep aside for 15 minutes.|Coat with breadcrumbs.|Heat oil in a pan.|Fry fish on both sides until golden and fully cooked.|Serve hot."
    ],

    [
        "Chicken Soup",
        "Non-Vegetarian",
        40,
        "A warm and nourishing soup prepared with chicken and vegetables.",
        "Chicken,Carrot,Onion,Garlic,Ginger,Black Pepper,Water,Salt",
        "Wash chicken thoroughly.|Add chicken, ginger, garlic and water to a pot.|Bring to a boil.|Remove foam from the surface.|Add chopped vegetables.|Simmer until chicken is fully cooked.|Season with salt and pepper.|Serve warm."
    ],

    [
        "Egg Bhurji",
        "Non-Vegetarian",
        15,
        "A quick Indian scrambled egg dish cooked with onions, tomatoes and spices.",
        "Egg,Onion,Tomato,Green Chilli,Coriander Leaves,Turmeric,Chilli Powder,Salt,Oil",
        "Beat eggs in a bowl.|Heat oil in a pan.|Add chopped onion and green chilli.|Add tomato and spices.|Cook until tomato becomes soft.|Pour in beaten eggs.|Stir continuously until eggs are fully cooked.|Garnish with coriander leaves."
    ],

    [
        "Prawn Masala",
        "Non-Vegetarian",
        35,
        "A spicy prawn curry cooked with onion, tomato and aromatic spices.",
        "Prawns,Onion,Tomato,Ginger,Garlic,Turmeric,Chilli Powder,Cumin,Coriander Powder,Salt,Oil",
        "Clean and devein prawns.|Marinate with turmeric and salt.|Heat oil in a pan.|Add onion, ginger and garlic.|Add tomato and spices.|Cook until the masala thickens.|Add prawns and cook until fully done.|Serve hot."
    ]
];

const recipes = raw.map(
    ([name, category, cookingTime, description, ingredients, instructions]) => ({
        name,
        category,
        cookingTime,
        description,
        ingredients: ingredients.split(","),
        instructions: instructions.split("|"),
    })
);

async function seed() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI missing in .env file");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        for (const recipe of recipes) {
            await Recipe.updateOne(
                { name: recipe.name },
                { $set: recipe },
                { upsert: true }
            );
        }

        console.log(
            `Successfully seeded ${recipes.length} recipes into ${mongoose.connection.name}`
        );
    } catch (error) {
        console.error("Recipe seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seed();