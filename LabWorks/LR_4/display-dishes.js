document.addEventListener('DOMContentLoaded', function() {

    //код выполняемый после загрузки страницы

    console.log('DOM загружен, отображаем блюда');

    //сортировка всех блюд по алфавиту
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    const soups = sortedDishes.filter(dish => dish.category === 'soup');
    const main_courses = sortedDishes.filter(dish => dish.category === 'main_course');
    const beverages = sortedDishes.filter(dish => dish.category === 'beverage');


    function createDishCard(dish) {
        const card = document.createElement('div');
        card.classList.add('dish_card');
        card.dataset.dish = dish.keyword;
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" class="dish_img">
            <p class="dish_price">${dish.price}₽</p>
            <p class="dish_name">${dish.name}</p>
            <p class="dish_weigth">${dish.count}</p>
            <button class="add_button">Добавить</button>
        `;

        return card;
    };

    function displayDishes(containerSelector, dishesArr) {
        const container = document.querySelector(containerSelector);
        if(!container) {
            console.log('Контейнер не найден: ', containerSelector);
            return;
        }
        container.innerHTML = '';
        dishesArr.forEach(dish => {
            const card = createDishCard(dish);
            container.appendChild(card);
        });
    }

    displayDishes('.soup_selection .dishes_container', soups);
    displayDishes('.glavnoe_bludo .dishes_container', main_courses);
    displayDishes('.napitki .dishes_container', beverages);
});