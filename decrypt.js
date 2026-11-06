function getinfo(){
    const cyphertext = document.getElementById("input").value;
    const output = document.getElementById("output");
    const cleanText = cyphertext.replace(/[^a-zA-Z]/g, "").toUpperCase();

    if (!cleanText) {
        output.value = "";
        return;
    }

    const n = Math.sqrt(cleanText.length);
    if (!Number.isInteger(n)) {
        output.value = "Ciphertext length must form a square matrix.";
        return;
    }

    output.value = decrypt(cleanText, n);
}

function decrypt(cleanText, n){
    const grid = Array(n).fill("").map(() => Array(n).fill(""));
    let index = 0;
    for (let col = 0; col < n; col++) {
        for (let row = 0; row < n; row++) {
            grid[row][col] = cleanText[index++];
        }
    }

    let plaintext = '';
    for (let row = 0; row < n; row++) {
        plaintext += grid[row].join('');
    }
    return plaintext;
}

document.getElementById("button").addEventListener("click", getinfo);
