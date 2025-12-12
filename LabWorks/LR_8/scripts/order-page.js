window.addEventListener('dishesLoaded', function(){
    const container = document.querySelector('.order-dishes-container');
    const empty_message = document.querySelector('.empty-order-message');

    const summaryContainer = document.querySelector('.selected-summary');
    const totalPriceBlock = document.querySelector('.total-price');

    loadOrderFromStorage();


    function createDishCardOrd(dish) {
        const card = document.createElement('div');
        card.classList.add('dish_card');
        card.dataset.dish = dish.keyword;

        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" class="dish_img">
            <p class="dish_price">${dish.price}₽</p>
            <p class="dish_name">${dish.name}</p>
            <p class="dish_weigth">${dish.count}</p>
            <button class="add_button">Удалить</button>
        `;
        return card;
    };

    function displaySelectedDishes() {
        container.innerHTML = '';

        let hasDishes = false;

        for (const dish of Object.values(window.selectedDish)) {
            if (dish !== null) {
                hasDishes = true;
                const card = createDishCardOrd(dish);

                card.querySelector('button').addEventListener('click', () => {
                    for (const cat in window.selectedDish) {
                        if (window.selectedDish[cat]?.keyword === dish.keyword) {
                            window.selectedDish[cat] = null;
                            break;
                        }
                    }
                    saveOrderToStorage();
                    displaySelectedDishes();
                    updateOrderSummary();
                });
                container.appendChild(card);
            }
        }

        if (!hasDishes) {
            empty_message.style.display = 'block';
            container.style.display = 'none';
        }
        else {
            empty_message.style.display = 'none';
            container.style.display = 'grid'
            container.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
            container.style.gap = '2rem';
        }
    };

    function updateOrderSummary() {
        summaryContainer.innerHTML = '';

        const selectedCount = Object.values(selectedDish).filter(d => d != null).length;
        console.log('Выбрано блюд: ', selectedCount);
        if (selectedCount === 0) {
            //ничего не выбрано
            const p = document.createElement('p');
            p.textContent = `Ничего не выбрано`;
            p.style.color = '#565656ff';
            p.style.marginBottom = '2rem';
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
                p.style.color = '#5700edff';
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

    
    displaySelectedDishes();
    updateOrderSummary();
})