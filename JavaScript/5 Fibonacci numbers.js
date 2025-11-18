function fibb(n) {
    if (n%1 == 0 && n>= 0 && n <= 1000) {
        if (n == 0 || n == 1) {
            return n
        }
        else {
            let one_p = 0;
            let two_p = 1;
            for (let i = 2; i <= n; i++) {
                let temp = one_p + two_p;
                one_p = two_p;
                two_p = temp;
            }
            return two_p;
        }
    }
    else {
        return 'Ошибка: число n должно быть целым и не отрицательным';
    }
}

console.log(fibb(-5));
console.log(fibb(215.32));
console.log(fibb(0));
console.log(fibb(1));
console.log(fibb(2));
console.log(fibb(3));
console.log(fibb(5));
console.log(fibb(10));
console.log(fibb(385));
console.log(fibb(824));
console.log(fibb(1000));
console.log(fibb(1002));