window.addEventListener('dishesLoaded', function () {

    const dishes = window.dishes;

    //сортировка всех блюд по алфавиту
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    const soups = sortedDishes.filter(dish => dish.category === 'soup');
    const main_courses = sortedDishes.filter(dish => dish.category === 'main-course');
    const salads = sortedDishes.filter(dish => dish.category === 'salad');
    const beverages = sortedDishes.filter(dish => dish.category === 'drink');
    const deserts_vkusno = sortedDishes.filter(dish => dish.category === 'dessert');


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
        if (!container) {
            console.log('Контейнер не найден: ', containerSelector);
            return;
        }
        container.innerHTML = '';
        dishesArr.forEach(dish => {
            const card = createDishCard(dish);
            container.appendChild(card);
        });
    }

    //обработчик клика по какому-либо фильтру
    document.addEventListener('click', function (event) {
        const filter = event.target.closest('.filter-btn');
        if (!filter) return console.log('не кликнул');

        const section = filter.closest('section');

        let category;
        const filter_key = filter.dataset.kind;

        if (section.classList.contains('soup_selection')) {
            category = 'soup';
        }
        else if (section.classList.contains('glavnoe_bludo')) {
            category = 'main_course';
        }
        else if (section.classList.contains('salads_and_starters')) {
            category = 'salat';
        }
        else if (section.classList.contains('napitki')) {
            category = 'beverage';
        }
        else if (section.classList.contains('deserts')) {
            category = 'dessert';
        }
        if (!category) return;

        console.log('Кликнул по категории: ', category, filter_key);

        ///////// ПЕРЕКЛЮЧЕНИЕ/включение/снятие КАТЕГОРИИ ФИЛЬТРА
        const wasActive = filter.classList.contains('active');
        // Снимаем active со всех кнопок в секции
        section.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Если кнопка НЕ была активной — включаем её
        if (!wasActive) {
            filter.classList.add('active');
        }
        ///////////////////

        const activeFilter = section.querySelector('.filter-btn.active');
        const KindToFilter = activeFilter ? activeFilter.dataset.kind : null;

        let category_dishes = dishes.filter(dish => dish.category === category);
        if (KindToFilter) {
            category_dishes = category_dishes.filter(dish => dish.kind === KindToFilter);
        }

        category_dishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        const container = section.querySelector('.dishes_container');
        container.innerHTML = '';

        category_dishes.forEach(dish => {
            const card = createDishCard(dish);
            container.appendChild(card);
        });

        if (window.selectedDish && window.selectedDish[category]) {
            const selectedKeyword = window.selectedDish[category].keyword;
            const selectedCard = container.querySelector(`[data-dish="${selectedKeyword}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        }

    });

    function showAllDish() {
        displayDishes('.soup_selection .dishes_container', soups);
        displayDishes('.glavnoe_bludo .dishes_container', main_courses);
        displayDishes('.salads_and_starters .dishes_container', salads);
        displayDishes('.napitki .dishes_container', beverages);
        displayDishes('.deserts .dishes_container', deserts_vkusno);
    };

    showAllDish();

});