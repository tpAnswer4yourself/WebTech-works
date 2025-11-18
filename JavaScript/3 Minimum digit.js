function minDigit(x)
{
    if (x < 0 || x%1 != 0)
    {
        return 'Ошибка: число должно быть положительным и целым!'
    }
    else if (x == 0)
    {
        return 0;
    }
    else {
        let min = 9;

        while (x > 0) {
            let digit = x%10;
            if (digit < min) {
                min = digit
            }
            x = (x - (x%10))/10;
        }
        return min;
    }
}

console.log('Наименьшая цифра числа 8395: ', minDigit(8395));
console.log('Наименьшая цифра числа 0: ', minDigit(0));
console.log('Наименьшая цифра числа 6: ', minDigit(6));
console.log('Наименьшая цифра числа -35: ', minDigit(-35));
console.log('Наименьшая цифра числа 407.23: ', minDigit(407.23));
