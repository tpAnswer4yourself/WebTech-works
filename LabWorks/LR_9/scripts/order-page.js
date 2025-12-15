window.addEventListener('dishesLoaded', function(){
    const container = document.querySelector('.order-dishes-container');
    const empty_message = document.querySelector('.empty-order-message');

    const summaryContainer = document.querySelector('.selected-summary');
    const totalPriceBlock = document.querySelector('.total-price');
    const form = document.querySelector('form');

    loadOrderFromStorage();
    const API_KEY = '93f2f89f-4f0d-4dda-ba66-ae4884769bb4';
    const API_URL = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${API_KEY}`;

    document.querySelector('button[type="reset"]').addEventListener('click', () => {
        Object.keys(window.selectedDish).forEach(k => window.selectedDish[k] = null);
        localStorage.removeItem('lunchOrder');
        displaySelectedDishes();
        updateOrderSummary();
    });

    // Перехват отправки заказа
    document.querySelector('form').addEventListener('submit', async function (e) {
        e.preventDefault(); // блокируем обычную отправку

        // Проверка валидности комбо (то же самое, что у тебя было раньше)
        const s = !!window.selectedDish.soup;
        const m = !!window.selectedDish.main_course;
        const a = !!window.selectedDish.salat;
        const b = !!window.selectedDish.beverage;

        const isValid = (s && m && a && b) || (s && m && b) || (s && a && b) || (m && a && b) || (m && b);

        if (!isValid) {
            showModalWindow("Неверное сочетание блюд! Проверьте комбо.");
            return;
        }
        // ←←← СОБИРАЕМ ДАННЫЕ ←←←
        const formData = new FormData(form); // берём все поля формы

        const payload = {
            full_name: formData.get('name') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone'),
            delivery_address: formData.get('address'),
            delivery_type: document.querySelector('#asap').checked ? 'now' : 'by_time',
            comment: formData.get('comment') || '',
            subscribe: formData.get('podpiska') === 'on',
            drink_id: window.selectedDish.beverage.id,
        };

        if (window.selectedDish.soup) payload.soup_id = window.selectedDish.soup.id;
        if (window.selectedDish.main_course) payload.main_course_id = window.selectedDish.main_course.id;
        if (window.selectedDish.salat) payload.salad_id = window.selectedDish.salat.id;
        if (window.selectedDish.dessert) payload.dessert_id = window.selectedDish.dessert.id;

        if (payload.delivery_type === 'by_time') {
            payload.delivery_time = formData.get('time_delivery');
        }

        // ←←← ОТПРАВЛЯЕМ НА СЕРВЕР ←←←
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Неизвестная ошибка сервера');
            }

            // УСПЕХ — заказ принят
            showModalWindow("Заказ успешно отправлен! 🎉");
            localStorage.removeItem('lunchOrder');
            Object.keys(window.selectedDish).forEach(k => window.selectedDish[k] = null);
            displaySelectedDishes();
            updateOrderSummary();
            form.reset(); // очищаем форму

        } catch (error) {
            // ЛЮБАЯ ОШИБКА — заказ НЕ очищаем
            showModalWindow("Ошибка отправки: " + error.message);
            console.error('Ошибка отправки заказа:', error);
        }
    }); // ← конец submit-обработчика

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

        const selectedCount = Object.values(window.selectedDish).filter(d => d != null).length;
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

        for (const [cat, dish] of Object.entries(window.selectedDish)) {
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