function getSortedArray(array, key) {
    let size_arr = 0;
    while (array[size_arr] != undefined)
    {
        size_arr++;
    }

    let copy_arr = [];
    for (let i = 0; i < size_arr; i++)
    {
        copy_arr[i] = array[i];
    }

    for (let i = 0; i < size_arr; i++)
    {
        for (let j = 0; j < (size_arr - 1); j++) {
            if (copy_arr[j][key] > copy_arr[j+1][key]) {
                let temp = copy_arr[j];
                copy_arr[j] = copy_arr[j+1];
                copy_arr[j+1] = temp;
            }
        }
    }

    return copy_arr;
}

let people = [
    {name: "Maria", age: 25},
    {name: "Anna", age: 18},
    {name: "Dima", age: 36},
    {name: "Tony", age: 14},
    {name: "Boris", age: 42},
    {name: "Diana", age: 22},
    {name: "Mark", age: 19}
];

console.log(getSortedArray(people, "age"));
console.log(getSortedArray(people, "name"));