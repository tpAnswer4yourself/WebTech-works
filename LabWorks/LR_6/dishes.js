const dishes = [
    ////////////////////// Первые блюда
    {
        keyword: "gaspacho_soup",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "350 г",
        image: "images/soups/gazpacho.jpg",
        kind: "veg"
    },

    {
        keyword: "mushroom_soup",
        name: "Грибной суп-пюре",
        price: 185,
        category: "soup",
        count: "330 г",
        image: "images/soups/mushroom_soup.jpg",
        kind: "veg"
    },

    {
        keyword: "norvegian_soup",
        name: "Норвежский суп",
        price: 270,
        category: "soup",
        count: "330 г",
        image: "images/soups/norwegian_soup.jpg",
        kind: "fish"
    },

    {
        keyword: "ramen_soup",
        name: "Рамен",
        price: 375,
        category: "soup",
        count: "425 г",
        image: "images/soups/ramen.jpg",
        kind: "meat"
    },

    {
        keyword: "tomyam_krevetka_soup",
        name: "Том ям с креветками",
        price: 650,
        category: "soup",
        count: "500 г",
        image: "images/soups/tomyum.jpg",
        kind: "fish"
    },

    {
        keyword: "chicken_soup",
        name: "Куриный суп",
        price: 330,
        category: "soup",
        count: "350 г",
        image: "images/soups/chicken.jpg",
        kind: "meat"
    },

////////////////// Вторые блюда
    {
        keyword: "fried_potatoes",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main_course",
        count: "250 г",
        image: "images/main_course/friedpotatoeswithmushrooms1.jpg",
        kind: "veg"
    },

    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main_course",
        count: "310 г",
        image: "images/main_course/lasagna.jpg",
        kind: "meat"
    },

    {
        keyword: "chicken_cutlets",
        name: "Котлеты из курицы с картофельным пюре",
        price: 225,
        category: "main_course",
        count: "280 г",
        image: "images/main_course/chickencutletsandmashedpotatoes.jpg",
        kind: "meat"
    },

    {
        keyword: "fish_rise",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main_course",
        count: "270 г",
        image: "images/main_course/fishrice.jpg",
        kind: "fish"
    },

    {
        keyword: "pizza_margarita",
        name: "Пицца Маргарита",
        price: 450,
        category: "main_course",
        count: "470 г",
        image: "images/main_course/pizza.jpg",
        kind: "veg"
    },

    {
        keyword: "pasta_s_krevetkami",
        name: "Паста с креветками",
        price: 340,
        category: "main_course",
        count: "280 г",
        image: "images/main_course/shrimppasta.jpg",
        kind: "fish"
    },

    ////////// Салаты и стартеры
    {
        keyword: "saladwithegg",
        name: "Корейский салат с овощами и яйцом",
        price: 330,
        category: "salat",
        count: "250 г",
        image: "images/salads_starters/saladwithegg.jpg",
        kind: "veg"
    },

    {
        keyword: "caesar",
        name: "Цезарь с цыпленком",
        price: 370,
        category: "salat",
        count: "220 г",
        image: "images/salads_starters/caesar.jpg",
        kind: "meat"
    },

    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 350,
        category: "salat",
        count: "235 г",
        image: "images/salads_starters/caprese.jpg",
        kind: "veg"
    },

    {
        keyword: "tunsalad",
        name: "Салат с тунцом",
        price: 480,
        category: "salat",
        count: "250 г",
        image: "images/salads_starters/tunasalad.jpg",
        kind: "fish"
    },

    {
        keyword: "frenchfries1",
        name: "Картофель фри с соусом Цезарь",
        price: 280,
        category: "salat",
        count: "235 г",
        image: "images/salads_starters/frenchfries1.jpg",
        kind: "veg"
    },

    {
        keyword: "frenchfries2",
        name: "Картофель фри с кетчупом",
        price: 260,
        category: "salat",
        count: "235 г",
        image: "images/salads_starters/frenchfries2.jpg",
        kind: "veg"
    },

    ////////////////// Напитки
    {
        keyword: "orange_juice",
        name: "Апельсиновый сок",
        price: 120,
        category: "beverage",
        count: "300 мл",
        image: "images/beverages/orangejuice.jpg",
        kind: "cold"
    },

    {
        keyword: "apple_juice",
        name: "Яблочный сок",
        price: 90,
        category: "beverage",
        count: "300 мл",
        image: "images/beverages/applejuice.jpg",
        kind: "cold"
    },

    {
        keyword: "carrot_juice",
        name: "Морковный сок",
        price: 110,
        category: "beverage",
        count: "300 мл",
        image: "images/beverages/carrotjuice.jpg",
        kind: "cold"
    },

    {
        keyword: "cappucino",
        name: "Капучино",
        price: 180,
        category: "beverage",
        count: "300 мл",
        image: "images/beverages/cappuccino.jpg",
        kind: "hot"
    },

    {
        keyword: "greentea",
        name: "Зеленый чай",
        price: 100,
        category: "beverage",
        count: "300 мл",
        image: "images/beverages/greentea.jpg",
        kind: "hot"
    },

    {
        keyword: "blacktea",
        name: "Черный чай",
        price: 90,
        category: "beverage",
        count: "300 мл",
        image: "images/beverages/tea.jpg",
        kind: "hot"
    },


    /////// Десерты
    {
        keyword: "baklava",
        name: "Пахлава",
        price: 220,
        category: "dessert",
        count: "300 г",
        image: "images/desserts/baklava.jpg",
        kind: "medium"
    },

    {
        keyword: "checheesecake",
        name: "Чизкейк",
        price: 240,
        category: "dessert",
        count: "125 г",
        image: "images/desserts/checheesecake.jpg",
        kind: "small"
    },

    {
        keyword: "chocolatecheesecake",
        name: "Шоколадный чизкейк",
        price: 260,
        category: "dessert",
        count: "125 г",
        image: "images/desserts/chocolatecheesecake.jpg",
        kind: "small"
    },

    {
        keyword: "chocolatecake",
        name: "Шоколадный торт",
        price: 270,
        category: "dessert",
        count: "140 г",
        image: "images/desserts/chocolatecake.jpg",
        kind: "small"
    },

    {
        keyword: "donuts3st",
        name: "Пончики (3 штуки)",
        price: 410,
        category: "dessert",
        count: "350 г",
        image: "images/desserts/donuts2.jpg",
        kind: "medium"
    },

    {
        keyword: "donuts6st",
        name: "Пончики (6 штук)",
        price: 650,
        category: "dessert",
        count: "700 г",
        image: "images/desserts/donuts.jpg",
        kind: "large"
    }
]