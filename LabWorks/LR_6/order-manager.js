document.addEventListener('DOMContentLoaded', function () {

    const summaryContainer = document.querySelector('.selected-summary');
    const totalPriceBlock = document.querySelector('.total-price');

    const resetButton = document.querySelector('button[type="reset"]');
    const form = document.querySelector('.order-form-section form');

    const selectedDish = {
        soup: null,
        main_course: null,
        salat: null,
        beverage: null,
        dessert: null
    }
    window.selectedDish = selectedDish;

    function findDishByKeyword(keyword) {
        return dishes.find(dish => dish.keyword === keyword);
    }

    function updateOrderSummary() {
        summaryContainer.innerHTML = '';

        const selectedCount = Object.values(selectedDish).filter(d => d != null).length;
        console.log('Выбрано блюд: ', selectedCount);
        if (selectedCount === 0) {
            //ничего не выбрано
            const p = document.createElement('p');
            p.textContent = `Ничего не выбрано`;
            p.style.color = '#565656ff';
            summaryContainer.appendChild(p);
            totalPriceBlock.style.display = 'none';
            return;
        }

        let totalPrice = 0;

        const categoryNames = {
            soup: 'Суп',
            main_course: 'Главное блюдо',
            salat: 'Салат/Стартер',
            beverage: 'Напиток',
            dessert: 'Десерт'
        };

        for (const [cat, dish] of Object.entries(selectedDish)) {
            const p = document.createElement('p');

            if (dish) {
                p.innerHTML = `<strong>${categoryNames[cat]}</strong> <br>${dish.name} — ${dish.price}₽`;
                totalPrice += dish.price;
            }
            else {
                p.innerHTML = `<strong>${categoryNames[cat]}</strong> <br> <span style="color: #565656ff">Блюдо не выбрано </span>`;
            }

            summaryContainer.appendChild(p);
        }

        totalPriceBlock.innerHTML = `<h3>Стоимость заказа: <span id="total-amount">${totalPrice}₽</span></h3>`;
        totalPriceBlock.style.display = 'block';

    };

    document.addEventListener('click', function (event) {
        const card = event.target.closest('.dish_card');
        if (!card) return;

        const keyword = card.dataset.dish;
        if (!keyword) return;

        const dish = findDishByKeyword(keyword);
        if (!dish) return;

        let category;
        if (card.closest('.soup_selection')) {
            category = 'soup';
        }
        else if (card.closest('.glavnoe_bludo')) {
            category = 'main_course';
        }
        else if (card.closest('.salads_and_starters')) {
            category = 'salat';
        }
        else if (card.closest('.napitki')) {
            category = 'beverage';
        }
        else if (card.closest('.deserts')) {
            category = 'dessert';
        }
        if (!category) return;

        const sectionMap = {
            soup: '.soup_selection',
            main_course: '.glavnoe_bludo',
            salat: '.salads_and_starters',
            beverage: '.napitki',
            dessert: '.deserts'
        };

        const sectionSelector = sectionMap[category];
        document.querySelectorAll(`${sectionSelector} .dish_card`).forEach(c => {
            c.classList.remove('selected');
        });

        card.classList.add('selected');

        selectedDish[category] = dish;


        updateOrderSummary();
        console.log('Выбрано:', dish.name, 'Категория:', category);
    });

    resetButton.addEventListener('click', function (event) {
        selectedDish.soup = null;
        selectedDish.main_course = null;
        selectedDish.beverage = null;
        selectedDish.salat = null;
        selectedDish.dessert = null;
        document.querySelectorAll('.dish_card.selected').forEach(card => {
            card.classList.remove('selected');
        });
        totalPriceBlock.style.display = 'none';

        console.log('Сброс формы заказа');
        updateOrderSummary();
    });

    /////// 6 лаба --- ПРОВЕРКА ВАЛИДНОСТИ ВЫБРАННЫХ БЛЮД

    form.addEventListener('submit', function (event) {

        //переменные-флаги, для проверки: что выбрано, а что нет
        const sel_soup = !!selectedDish.soup;
        const sel_main_course = !!selectedDish.main_course;
        const sel_salat = !!selectedDish.salat;
        const sel_beverage = !!selectedDish.beverage;
        const sel_dessert = !!selectedDish.dessert;

        const isValid = (sel_soup && sel_main_course && sel_salat && sel_beverage) ||
            (sel_soup && sel_main_course && sel_beverage) ||
            (sel_soup && sel_salat && sel_beverage) ||
            (sel_main_course && sel_salat && sel_beverag) ||
            (sel_main_course && sel_beverage);

        if (isValid) {
            console.log('Все хорошо, отправляем форму');
            return;
        };
        //если не валидная комбинация
        event.preventDefault(); //блокируем отправку

        if (!sel_soup && !sel_main_course && !sel_salat && !sel_beverage && !sel_dessert) {
            showModalWindow("Ничего не выбрано. Выберите блюдо для заказа");
            return;
        }

        if (!sel_beverage) {
            showModalWindow("Выберите напиток");
            return;
        }
        else if (sel_soup && (!sel_main_course || !sel_salat)) {
            showModalWindow("Выберите главное блюдо/салат/стартер");
            return;
        }
        else if (sel_salat && (!sel_soup || !sel_main_course)) {
            showModalWindow("Выберите суп или главное блюдо");
            return;
        }
        else if ((sel_beverage || sel_dessert) && !sel_main_course) {
            showModalWindow("Выберите главное блюдо");
            return;
        }
        else {
            showModalWindow("Выберите главное блюдо");
            return;
        }
    });

    //функция создания окна проверки выбора блюд
    function showModalWindow(message) {
        const overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');
        
        const modal = document.createElement('div');
        modal.classList.add('modal-window');

        const text = document.createElement('p');
        text.textContent = message;
        
        const button_okey = document.createElement('button');
        button_okey.classList.add('button-okey');
        button_okey.textContent = 'Окей👌';

        //сборка окна
        modal.appendChild(text);
        modal.appendChild(button_okey);
        overlay.appendChild(modal);
        document.body.appendChild(overlay); //добавляем в документ

        button_okey.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
    }

    updateOrderSummary();
});



