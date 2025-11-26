document.addEventListener('DOMContentLoaded', function () {

    const summaryContainer = document.querySelector('.selected-summary');
    const totalPriceBlock = document.querySelector('.total-price');
    const totalAmountSpan = document.querySelector('#total-amount');

    const resetButton = document.querySelector('button[type="reset"]');

    const selectedDish = {
        soup: null,
        main_course: null,
        beverage: null
    }

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
            beverage: 'Напиток'
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
        else if (card.closest('.napitki')) {
            category = 'beverage';
        }
        if (!category) return;

        const sectionMap = {
            soup: '.soup_selection',
            main_course: '.glavnoe_bludo',
            beverage: '.napitki'
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
        document.querySelectorAll('.dish_card.selected').forEach(card => {
            card.classList.remove('selected');
        });
        totalPriceBlock.style.display = 'none';

        console.log('Сброс формы заказа');
        updateOrderSummary();
    });

    updateOrderSummary();
});



