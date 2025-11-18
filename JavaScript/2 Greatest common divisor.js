function gcd(a, b) {
    if (a >= 0 && b >= 0) {
        if (a == 0)
        {
            return b;
        }
        else if (b == 0) {
            return a;
        }
        else {
            let min = a < b ? a:b;
            for (let i = min; i > 0; i--)
            {
                if (a%i == 0 && b%i == 0)
                {
                    return i;
                }
            }
        }
    }
    else {
        return 'Ошибка: числа a и b должны быть не отрицательными!';
    }
}

console.log('НОД 36 и 8: ', gcd(36, 8));
console.log('НОД -4 и 12: ', gcd(-4, 12));
console.log('НОД 5 и 0: ', gcd(5, 0));
console.log('НОД 124 и 122: ', gcd(124, 122));