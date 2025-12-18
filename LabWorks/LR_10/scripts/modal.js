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

//делаем глобальной
window.showModalWindow = showModalWindow;