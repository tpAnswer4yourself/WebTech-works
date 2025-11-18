function cesar(str, shift, action) {
    str = str.toLowerCase();
    const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const n = 33;

    let result = '';

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let found = false;

        for (let position = 0; position < n; position++) {
            if (alphabet[position] === char) {
                let newposition;
                if (action === 'encode') {
                    newposition = (position + shift) % n;
                }
                else if (action === 'decode')
                {
                    newposition = (position - shift + n) % n;
                }

                result += alphabet[newposition];
                found = true;
                break;
            }
        }

        if (!found) {
            result += char;
        }
    }
    return result;
}

// расшифровка фразы перебором всех сдвигов
for (let i = 0; i <= 32; i++)
{
    console.log(cesar('эзтыхз фзъзъз', i, 'decode'), " | shift = " + i);
}

console.log('Расшифрованная фраза: "хакуна матата", сдвиг 8')