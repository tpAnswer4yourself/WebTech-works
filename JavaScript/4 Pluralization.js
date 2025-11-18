function pluralizeRecords(n) {
    if (n % 1 == 0 && n >= 0) {
        let lastDigit = n % 10;
        let lastTwoDigits = n % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'В результате выполнения запроса было найдено ' + n + ' записей';
        }
        else if (lastDigit == 1) {
            return 'В результате выполнения запроса была найдена ' + n + ' запись';
        }
        else if (lastDigit >= 2 && lastDigit <= 4) {
            return 'В результате выполнения запроса было найдено ' + n + ' записи';
        }
        else {
            return 'В результате выполнения запроса было найдено ' + n + ' записей';
        }
    }
    else {
        return 'Ошибка: число n должно быть целым и не отрицательным';
    }
}

console.log(pluralizeRecords(-5));
console.log(pluralizeRecords(3.2));
console.log(pluralizeRecords(0));
console.log(pluralizeRecords(1));
console.log(pluralizeRecords(2));
console.log(pluralizeRecords(3));
console.log(pluralizeRecords(4));
console.log(pluralizeRecords(5));
console.log(pluralizeRecords(6));
console.log(pluralizeRecords(7));
console.log(pluralizeRecords(8));
console.log(pluralizeRecords(9));
console.log(pluralizeRecords(10));
console.log(pluralizeRecords(11));
console.log(pluralizeRecords(12));
console.log(pluralizeRecords(13));
console.log(pluralizeRecords(14));
console.log(pluralizeRecords(15));
console.log(pluralizeRecords(21));
console.log(pluralizeRecords(27));
console.log(pluralizeRecords(33));
console.log(pluralizeRecords(101));
console.log(pluralizeRecords(128));
console.log(pluralizeRecords(700));
console.log(pluralizeRecords(453));