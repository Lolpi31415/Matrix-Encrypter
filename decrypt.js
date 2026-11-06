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

    output.value = `Decrypt: ${decrypt(cleanText, n)}\nSpiral decrypt: ${decryptSpiral(cleanText, n)}`;
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

function decryptSpiral(cleanText, n) {
    const grid = Array(n).fill("").map(() => Array(n).fill(""));
    let index = 0;
    let top = 0, bottom = n - 1, left = 0, right = n - 1;

    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) {
            grid[top][i] = cleanText[index++];
        }
        top++;
        for (let i = top; i <= bottom; i++) {
            grid[i][right] = cleanText[index++];
        }
        right--;
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                grid[bottom][i] = cleanText[index++];
            }
            bottom--;
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                grid[i][left] = cleanText[index++];
            }
            left++;
        }
    }

    return grid.map(row => row.join("")).join("");
}

document.getElementById("button").addEventListener("click", getinfo);
