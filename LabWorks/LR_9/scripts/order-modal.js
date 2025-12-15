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

    // Собираем модалку
    modal.appendChild(closeBtn);
    modal.appendChild(title);
    modal.appendChild(content);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // === РЕЖИМ ПРОСМОТРА (view) ===
    if (mode === 'view') {
        content.innerHTML = `
            <p><strong>Номер заказа:</strong> ${order.id}</p>
            <p><strong>Дата оформления:</strong> ${new Date(order.created_at).toLocaleString('ru-RU')}</p>
            <p><strong>Имя:</strong> ${order.full_name || '—'}</p>
            <p><strong>Email:</strong> ${order.email || '—'}</p>
            <p><strong>Телефон:</strong> ${order.phone || '—'}</p>
            <p><strong>Адрес доставки:</strong> ${order.delivery_address || '—'}</p>
            <p><strong>Комментарий:</strong> ${order.comment || '—'}</p>
            <p><strong>Время доставки:</strong> ${order.delivery_type === 'now' ? 'Как можно скорее' : (order.delivery_time ? order.delivery_time.slice(0, 5) : '—')}</p>
            <hr class="modal-divider">
            <p><strong>Состав заказа:</strong></p>
        `;

        const dishesList = document.createElement('ul');
        dishesList.classList.add('order-dishes-list');

        const dishEntries = [
            { id: order.soup_id, category: 'Суп' },
            { id: order.main_course_id, category: 'Главное блюдо' },
            { id: order.salad_id, category: 'Салат/стартер' },
            { id: order.drink_id, category: 'Напиток' },
            { id: order.dessert_id, category: 'Десерт' }
        ];

        let hasDishes = false;
        dishEntries.forEach(entry => {
            if (entry.id) {
                const dish = findDishById(entry.id);
                if (dish) {
                    hasDishes = true;
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${entry.category}:</strong> ${dish.name} — ${dish.price}₽`;
                    dishesList.appendChild(li);
                }
            }
        });

        if (!hasDishes) {
            const li = document.createElement('li');
            li.textContent = 'Нет блюд';
            dishesList.appendChild(li);
        }

        content.appendChild(dishesList);

        let totalPrice = 0;
        dishEntries.forEach(entry => {
            if (entry.id) {
                const dish = findDishById(entry.id);
                if (dish) totalPrice += dish.price;
            }
        });

        const totalP = document.createElement('p');
        totalP.classList.add('order-total-price');
        totalP.innerHTML = `<strong>Итого: ${totalPrice}₽</strong>`;
        content.appendChild(totalP);

        const okBtn = document.createElement('button');
        okBtn.textContent = 'Ок';
        okBtn.classList.add('btn', 'btn-secondary');
        okBtn.onclick = () => document.body.removeChild(overlay);
        buttons.appendChild(okBtn);
    }

    // === РЕЖИМ РЕДАКТИРОВАНИЯ (edit) ===
    if (mode === 'edit') {
        const form = document.createElement('form');
        form.classList.add('order-edit-form');

        const fields = [
            { label: 'Имя', name: 'full_name', type: 'text', value: order.full_name || '' },
            { label: 'Email', name: 'email', type: 'email', value: order.email || '' },
            { label: 'Телефон', name: 'phone', type: 'tel', value: order.phone || '' },
            { label: 'Адрес доставки', name: 'delivery_address', type: 'text', value: order.delivery_address || '' },
            { label: 'Комментарий', name: 'comment', type: 'textarea', value: order.comment || '' }
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;

            let input;
            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.rows = 3;
            } else {
                input = document.createElement('input');
                input.type = field.type;
            }
            input.name = field.name;
            input.value = field.value;
            input.required = true;

            form.appendChild(label);
            form.appendChild(input);
        });

        // Время доставки
        const deliveryTypeLabel = document.createElement('label');
        deliveryTypeLabel.textContent = 'Время доставки';

        const radioContainer = document.createElement('div');
        radioContainer.classList.add('delivery-type-radio');

        const nowLabel = document.createElement('label');
        const nowRadio = document.createElement('input');
        nowRadio.type = 'radio';
        nowRadio.name = 'delivery_type';
        nowRadio.value = 'now';
        if (order.delivery_type === 'now') nowRadio.checked = true;
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

        radioContainer.appendChild(nowLabel);
        radioContainer.appendChild(timeLabel);

        const timeInputContainer = document.createElement('div');
        timeInputContainer.classList.add('delivery-time-field');
        timeInputContainer.style.display = order.delivery_type === 'by_time' ? 'block' : 'none';

        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.name = 'delivery_time';
        timeInput.min = '07:00';
        timeInput.max = '23:00';
        timeInput.step = '300';
        timeInput.value = order.delivery_time ? order.delivery_time.slice(0, 5) : '';
        timeInput.required = order.delivery_type === 'by_time';

        timeInputContainer.appendChild(timeInput);

        nowRadio.addEventListener('change', () => {
            timeInputContainer.style.display = 'none';
            timeInput.required = false;
        });
        timeRadio.addEventListener('change', () => {
            timeInputContainer.style.display = 'block';
            timeInput.required = true;
        });

        form.appendChild(deliveryTypeLabel);
        form.appendChild(radioContainer);
        form.appendChild(timeInputContainer);

        content.appendChild(form);

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
                full_name: form.querySelector('[name="full_name"]').value.trim(),
                email: form.querySelector('[name="email"]').value.trim(),
                phone: form.querySelector('[name="phone"]').value.trim(),
                delivery_address: form.querySelector('[name="delivery_address"]').value.trim(),
                comment: form.querySelector('[name="comment"]').value.trim(),
                delivery_type: form.querySelector('[name="delivery_type"]:checked').value,
            };

            if (payload.delivery_type === 'by_time') {
                const timeValue = form.querySelector('[name="delivery_time"]').value;
                if (!timeValue) {
                    showModalWindow('Укажите время доставки');
                    return;
                }
                payload.delivery_time = timeValue + ':00';
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
                showModalWindow('Заказ успешно изменён! 🎉');
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
                Вы уверены, что хотите <strong>удалить заказ №${order.id}</strong>?<br><br>
                Это действие нельзя отменить.
            </p>
        `;

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Отмена';
        cancelBtn.classList.add('btn', 'btn-secondary');
        cancelBtn.onclick = () => document.body.removeChild(overlay);
        buttons.appendChild(cancelBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Да, удалить';
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
                showModalWindow('Заказ успешно удалён 🗑️');
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