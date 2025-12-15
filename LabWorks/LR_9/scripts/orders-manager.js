document.addEventListener('DOMContentLoaded', () => {
    // Теперь всё внутри будет выполняться только после загрузки HTML

    // Константы API
    const API_KEY = '93f2f89f-4f0d-4dda-ba66-ae4884769bb4';
    const ORDERS_API_URL = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${API_KEY}`;

    // Ссылки на элементы страницы — теперь они точно существуют
    const ordersTable = document.querySelector('.orders-table');
    const ordersTbody = ordersTable.querySelector('tbody');
    const emptyMessage = document.querySelector('.empty-orders-message');

    // Проверка на случай, если элементы не найдены (на всякий)
    if (!ordersTable || !ordersTbody || !emptyMessage) {
        console.error('Не найдены необходимые элементы на странице заказов');
        return;
    }

    // Массив с заказами
    let orders = [];

    // Функция поиска блюда по id
    function findDishById(id) {
        if (!window.dishes) return null;
        return window.dishes.find(dish => dish.id === id);
    }

    async function loadOrders() {
        try {
            const response = await fetch(ORDERS_API_URL);
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            const data = await response.json();
            
            // Сортировка от новых к старым
            orders = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            
            displayOrders();
        } catch (error) {
            console.error('Ошибка загрузки заказов:', error);
            showModalWindow('Не удалось загрузить историю заказов. Попробуйте позже.');
        }
    }

    function displayOrders() {
        ordersTbody.innerHTML = '';

        if (orders.length === 0) {
            emptyMessage.style.display = 'block';
            ordersTable.style.display = 'none';
            return;
        }

        emptyMessage.style.display = 'none';
        ordersTable.style.display = 'table';

        orders.forEach((order, index) => {
            const row = document.createElement('tr');

            const numCell = document.createElement('td');
            numCell.textContent = index + 1;

            const dateCell = document.createElement('td');
            const date = new Date(order.created_at);
            dateCell.textContent = date.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const dishesCell = document.createElement('td');
            const dishNames = [];

            if (order.soup_id) { const d = findDishById(order.soup_id); if (d) dishNames.push(d.name); }
            if (order.main_course_id) { const d = findDishById(order.main_course_id); if (d) dishNames.push(d.name); }
            if (order.salad_id) { const d = findDishById(order.salad_id); if (d) dishNames.push(d.name); }
            if (order.drink_id) { const d = findDishById(order.drink_id); if (d) dishNames.push(d.name); }
            if (order.dessert_id) { const d = findDishById(order.dessert_id); if (d) dishNames.push(d.name); }

            dishesCell.textContent = dishNames.length > 0 ? dishNames.join(', ') : '—';

            const priceCell = document.createElement('td');
            let totalPrice = 0;
            [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id].forEach(id => {
                if (id) {
                    const dish = findDishById(id);
                    if (dish) totalPrice += dish.price;
                }
            });
            priceCell.textContent = totalPrice + '₽';

            const deliveryCell = document.createElement('td');
            deliveryCell.textContent = order.delivery_type === 'now' 
                ? 'Как можно скорее' 
                : (order.delivery_time ? order.delivery_time.slice(0, 5) : '—');

            const actionsCell = document.createElement('td');
            // Создаём обёртку для иконок
            const actionsWrapper = document.createElement('div');
            actionsWrapper.classList.add('actions-wrapper');
            actionsWrapper.innerHTML = `
                <i class="bi bi-eye" title="Подробнее"></i>
                <i class="bi bi-pencil" title="Редактировать"></i>
                <i class="bi bi-trash" title="Удалить"></i>
            `;
            actionsCell.appendChild(actionsWrapper);

            row.append(numCell, dateCell, dishesCell, priceCell, deliveryCell, actionsCell);
            ordersTbody.appendChild(row);
        });
    }

    // Функция для обновления списка заказов (вызывается из модалки)
    window.loadOrdersFromModal = async function() {
        await loadOrders(); // просто перезагружаем с сервера
    };

    // Делегирование кликов по иконкам действий
    ordersTable.addEventListener('click', (event) => {
        const icon = event.target.closest('i.bi');
        if (!icon) return;

        // Находим строку таблицы
        const row = icon.closest('tr');
        if (!row) return;

        // Находим индекс строки в tbody
        const index = Array.from(ordersTbody.children).indexOf(row);
        if (index === -1) return;

        // Получаем объект заказа из массива orders
        const order = orders[index];

        // Определяем действие по классу иконки
        if (icon.classList.contains('bi-eye')) {
            showOrderModal(order, 'view');
        } else if (icon.classList.contains('bi-pencil')) {
            showOrderModal(order, 'edit');
        } else if (icon.classList.contains('bi-trash')) {
            showOrderModal(order, 'delete');
        }
    });

    // Запускаем загрузку заказов
    // Ждём, пока блюда загрузятся (нужны для названий и цен)
    if (window.dishes && window.dishes.length > 0) {
        loadOrders();
    } else {
        window.addEventListener('dishesLoaded', loadOrders);
    }
});