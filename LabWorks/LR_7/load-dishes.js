let dishes = null; //переменная, где будут храниться блюда с сервера
window.dishes = null; //доступ к массиву в других скриптах проекта

async function loadDishes() {
    const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

    //ФЕЙКОВЫЙ АПИ ДЛЯ ТЕСТИРОВКИ ОШИБОК (модалка загружается)
    //const API_URL = 'htgqgwwqqps://edu.std-900.ist.fwqwfqmospolytech.ru/labfqwfqs/api/dishes';

    //console.log('Загрузка блюд с сервера: ', API_URL);

    try {
        const response = await fetch(API_URL);
        if(!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json(); //тело ответа в js-обьект (массив)

        dishes = data;
        window.dishes = data;

        console.log(`Блюда успешно загружены с сервера! Загружено: ${data.length} элементов`);
        return data;
    }
    catch (error) {
        console.error('Ошибка при загрузке блюд:', error);

        //модальное окно с ошибкой (функция из order-manager.js (в 6 лабе создавали))

        //возвращаем пустоту, хотя бы что-нибудь показалось
        dishes = [];
        window.dishes = [];
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes();

    if(window.dishes && window.dishes.length > 0) {      
        //отправляем своё событие, что данные готовы
        window.dispatchEvent(new Event('dishesLoaded'));
    }
    else {
        //вызываем модальное окно с ошибкой для клиента
        showModalWindow('Меню недоступно. Попробуйте позже.');
    }
})