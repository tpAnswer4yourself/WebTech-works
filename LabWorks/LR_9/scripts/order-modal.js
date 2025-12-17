// order-modal.js
// Универсальная модалка для работы с заказом: просмотр, редактирование, удаление

const API_KEY = '93f2f89f-4f0d-4dda-ba66-ae4884769bb4';

function findDishById(id) {
    if (!window.dishes) return null;
    return window.dishes.find(dish => dish.id === id);
}

function showOrderModal(order, mode) {
    // Создаём overlay
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    // Модальное окно
    const modal = document.createElement('div');
    modal.classList.add('modal-window', 'order-modal');

    // Заголовок
    const title = document.createElement('h3');
    title.classList.add('modal-title');
    if (mode === 'view') title.textContent = 'Подробности заказа';
    if (mode === 'edit') title.textContent = 'Редактирование заказа';
    if (mode === 'delete') title.textContent = 'Удаление заказа';

    // Крестик закрытия
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.classList.add('modal-close');
    closeBtn.onclick = () => document.body.removeChild(overlay);

    // Контент
    const content = document.createElement('div');
    content.classList.add('modal-content');

    // Блок кнопок
    const buttons = document.createElement('div');
    buttons.classList.add('modal-buttons');

    // Закрытие по клику на overlay
    overlay.onclick = (e) => {
        if (e.target === overlay) document.body.removeChild(overlay);
    };

    const header = document.createElement('div');
    header.classList.add('modal-header');
    const divider_top = document.createElement('hr');
    divider_top.classList.add('modal-divider');
    const divider_down = document.createElement('hr');
    divider_down.classList.add('modal-divider');

    header.appendChild(title);
    header.appendChild(closeBtn);
    // Собираем модалку
    modal.appendChild(header);
    modal.appendChild(divider_top);
    modal.appendChild(content);
    modal.appendChild(divider_down);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // === РЕЖИМ ПРОСМОТРА (view) ===
    if (mode === 'view') {
        const viewGrid = document.createElement('div');
        viewGrid.classList.add('order-view-grid');

        const addRow = (labelText, valueText = '—') => {
            const label = document.createElement('div');
            label.classList.add('view-label');
            label.textContent = labelText;

            const value = document.createElement('div');
            value.classList.add('view-value');
            value.textContent = valueText;

            viewGrid.appendChild(label);
            viewGrid.appendChild(value);
        };

        const addFullLabel = (text) => {
            const div = document.createElement('div');
            div.classList.add('view-section-title');
            div.textContent = text;
            viewGrid.appendChild(div);
        };

        const addFullValue = (element) => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('view-value-full');
            wrapper.appendChild(element);
            viewGrid.appendChild(wrapper);
        };

        // 1. Дата оформления
        addRow('Дата оформления:', new Date(order.created_at).toLocaleString('ru-RU'));

        // 2. Раздел "Доставка"
        addFullLabel('Доставка');

        addRow('Имя получателя:', order.full_name || '—');
        addRow('Адрес доставки:', order.delivery_address || '—');
        addRow('Время доставки:', order.delivery_type === 'now' ? 'Как можно скорее' : (order.delivery_time ? order.delivery_time.slice(0, 5) : '—'));
        addRow('Телефон:', order.phone || '—');
        addRow('Email:', order.email || '—');

        // 3. Раздел "Комментарий"
        addFullLabel('Комментарий');

        const commentValue = document.createElement('div');
        commentValue.classList.add('view-comment');
        commentValue.textContent = order.comment || '—';
        addFullValue(commentValue);

        // 4. Раздел "Состав заказа"
        addFullLabel('Состав заказа');

        const dishesList = document.createElement('ul');
        dishesList.classList.add('order-dishes-list', 'view-dishes-list');

        const dishEntries = [
            { id: order.soup_id, category: 'Суп' },
            { id: order.main_course_id, category: 'Главное блюдо' },
            { id: order.salad_id, category: 'Салат/стартер' },
            { id: order.drink_id, category: 'Напиток' },
            { id: order.dessert_id, category: 'Десерт' }
        ];

        let hasDishes = false;
        let totalPrice = 0;

        dishEntries.forEach(entry => {
            if (entry.id) {
                const dish = findDishById(entry.id);
                if (dish) {
                    hasDishes = true;
                    totalPrice += dish.price;

                    const li = document.createElement('li');
                    li.textContent = `${entry.category}: ${dish.name} — ${dish.price}₽`;
                    dishesList.appendChild(li);
                }
            }
        });

        if (!hasDishes) {
            const li = document.createElement('li');
            li.textContent = 'Нет блюд';
            dishesList.appendChild(li);
        }

        addFullValue(dishesList);

        // 5. Итоговая стоимость
        const totalLabel = document.createElement('div');
        totalLabel.classList.add('total-label');
        totalLabel.innerHTML = `<strong>Стоимость: ${totalPrice}₽</strong>`;


        // Добавляем грид в модалку
        content.appendChild(viewGrid);
        content.appendChild(totalLabel);

        // Кнопка Ок
        const okBtn = document.createElement('button');
        okBtn.textContent = 'Ок';
        okBtn.classList.add('btn', 'btn-secondary');
        okBtn.onclick = () => document.body.removeChild(overlay);
        buttons.appendChild(okBtn);
    }

    // === РЕЖИМ РЕДАКТИРОВАНИЯ (edit) ===
    if (mode === 'edit') {
        const editGrid = document.createElement('div');
        editGrid.classList.add('order-view-grid'); // тот же грид, что и в view

        const addRow = (labelText, inputElement) => {
            const label = document.createElement('div');
            label.classList.add('view-label');
            label.textContent = labelText;

            const wrapper = document.createElement('div');
            wrapper.classList.add('view-value');
            if (typeof inputElement === 'string') {
                wrapper.textContent = inputElement;  // для текста (не инпута)
            } else {
                wrapper.appendChild(inputElement);
            }
            editGrid.appendChild(label);
            editGrid.appendChild(wrapper);
        };

        const addFullLabel = (text) => {
            const div = document.createElement('div');
            div.classList.add('view-section-title');
            div.textContent = text;
            editGrid.appendChild(div);
        };

        addRow('Дата оформления:', new Date(order.created_at).toLocaleString('ru-RU'));

        // === Раздел "Доставка" ===
        addFullLabel('Доставка');

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.classList.add('edit-input');
        nameInput.value = order.full_name || '';
        nameInput.required = true;
        addRow('Имя получателя:', nameInput);

        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.classList.add('edit-input');
        addressInput.value = order.delivery_address || '';
        addressInput.required = true;
        addRow('Адрес доставки:', addressInput);

        const phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.classList.add('edit-input');
        phoneInput.value = order.phone || '';
        phoneInput.required = true;
        addRow('Телефон:', phoneInput);

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.classList.add('edit-input');
        emailInput.value = order.email || '';
        emailInput.required = true;
        addRow('Email:', emailInput);

        // === Раздел "Комментарий" ===
        addFullLabel('Комментарий');

        const commentTextarea = document.createElement('textarea');
        commentTextarea.classList.add('edit-textarea');
        commentTextarea.value = order.comment || '';

        const commentWrapper = document.createElement('div');
        commentWrapper.classList.add('view-value-full');
        commentWrapper.appendChild(commentTextarea);
        editGrid.appendChild(commentWrapper);

        // === Раздел "Время доставки" ===
        addFullLabel('Время доставки');

        const deliveryFull = document.createElement('div');
        deliveryFull.classList.add('view-value-full');

        const radioGroup = document.createElement('div');
        radioGroup.classList.add('delivery-radio-group');

        const nowLabel = document.createElement('label');
        const nowRadio = document.createElement('input');
        nowRadio.type = 'radio';
        nowRadio.name = 'delivery_type';
        nowRadio.value = 'now';
        if (order.delivery_type !== 'by_time') nowRadio.checked = true;
        nowLabel.appendChild(nowRadio);
        nowLabel.appendChild(document.createTextNode(' Как можно скорее'));

        const timeLabel = document.createElement('label');
        const timeRadio = document.createElement('input');
        timeRadio.type = 'radio';
        timeRadio.name = 'delivery_type';
        timeRadio.value = 'by_time';
        if (order.delivery_type === 'by_time') timeRadio.checked = true;
        timeLabel.appendChild(timeRadio);
        timeLabel.appendChild(document.createTextNode(' Ко времени'));

        radioGroup.appendChild(nowLabel);
        radioGroup.appendChild(timeLabel);

        const timeInputWrapper = document.createElement('div');
        timeInputWrapper.classList.add('delivery-time-input');
        timeInputWrapper.style.display = order.delivery_type === 'by_time' ? 'block' : 'none';

        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.classList.add('edit-input');
        timeInput.min = '07:00';
        timeInput.max = '23:00';
        timeInput.step = '300';
        timeInput.value = order.delivery_time ? order.delivery_time.slice(0, 5) : '';

        timeInputWrapper.appendChild(timeInput);

        // Переключение видимости поля времени
        nowRadio.addEventListener('change', () => {
            timeInputWrapper.style.display = 'none';
            timeInput.required = false;
        });
        timeRadio.addEventListener('change', () => {
            timeInputWrapper.style.display = 'block';
            timeInput.required = true;
        });

        deliveryFull.appendChild(radioGroup);
        deliveryFull.appendChild(timeInputWrapper);
        editGrid.appendChild(deliveryFull);

        // Добавляем в модалку
        content.appendChild(editGrid);

        // Кнопки
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Отмена';
        cancelBtn.type = 'button';
        cancelBtn.classList.add('btn', 'btn-secondary');
        cancelBtn.onclick = () => document.body.removeChild(overlay);
        buttons.appendChild(cancelBtn);

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Сохранить';
        saveBtn.type = 'button';
        saveBtn.classList.add('btn', 'btn-primary');
        buttons.appendChild(saveBtn);

        saveBtn.onclick = async () => {
            const payload = {
                full_name: nameInput.value.trim(),
                delivery_address: addressInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                comment: commentTextarea.value.trim(),
                delivery_type: document.querySelector('input[name="delivery_type"]:checked').value,
            };

            if (payload.delivery_type === 'by_time') {
                const timeValue = timeInput.value;
                if (!timeValue) {
                    showModalWindow('Укажите время доставки');
                    return;
                }
                payload.delivery_time = timeValue + ':00';
            } else {
                payload.delivery_time = null;
            }

            const updateUrl = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${order.id}?api_key=${API_KEY}`;

            try {
                saveBtn.disabled = true;
                saveBtn.textContent = 'Сохраняем...';
                const response = await fetch(updateUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error || 'Ошибка сервера');
                }

                document.body.removeChild(overlay);
                loadOrdersFromModal();
            } catch (error) {
                showModalWindow('Ошибка сохранения: ' + error.message);
                console.error(error);
            } finally {
                saveBtn.disabled = false;
                saveBtn.textContent = 'Сохранить';
            }
        };
    }

    // === РЕЖИМ УДАЛЕНИЯ (delete) ===
    if (mode === 'delete') {
        content.innerHTML = `
            <p class="delete-confirm-text">
                Вы уверены, что хотите удалить заказ?
            </p>
        `;

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Отмена';
        cancelBtn.classList.add('btn', 'btn-secondary');
        cancelBtn.onclick = () => document.body.removeChild(overlay);
        buttons.appendChild(cancelBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Да';
        deleteBtn.classList.add('btn', 'btn-danger');
        buttons.appendChild(deleteBtn);

        deleteBtn.onclick = async () => {
            const deleteUrl = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${order.id}?api_key=${API_KEY}`;

            try {
                deleteBtn.disabled = true;
                deleteBtn.textContent = 'Удаляем...';

                const response = await fetch(deleteUrl, { method: 'DELETE' });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error || 'Ошибка сервера');
                }

                document.body.removeChild(overlay);
                loadOrdersFromModal();

            } catch (error) {
                showModalWindow('Ошибка удаления: ' + error.message);
                console.error(error);
            } finally {
                deleteBtn.disabled = false;
                deleteBtn.textContent = 'Да, удалить';
            }
        };
    }

    return { overlay, content, buttons };
}

window.showOrderModal = showOrderModal;