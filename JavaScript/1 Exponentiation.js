function pow(x, n) {
    if (n < 1 || n%1 != 0) {
        return 'Ошибка: число n должно быть натуральное';
    }
    else {
        let res = 1;
        for (let i = 1; i <= n; i++) {
            res *= x;
        }
        return res;
    }
}

console.log('Результат 2^4:' , pow(2, 4));
console.log('Результат -5^3:' , pow(-5, 3));
console.log('Результат 2^-7:' , pow(2, -7));
console.log('Результат 3^4.66:' , pow(3, 4.66));
console.log('Результат 2^0:' , pow(2, 0));
