function processinfo() {
    const plaintext = document.getElementById("input").value.toUpperCase();
    const cleanText = plaintext.replace(/[^A-Z]/g, "");
    const output = document.getElementById("output");
    const gridInfo = document.getElementById("gridInfo");
    const gridContainer = document.getElementById("matrixGridContainer");

    if (!cleanText) {
        output.value = "";
        gridInfo.textContent = "Enter letters to encrypt.";  //prompt user if no text in input
        gridContainer.innerHTML = "";
        return;
    }
//gets how big the matrix should be
    const n = Math.ceil(Math.sqrt(cleanText.length));
    output.value = matrixEncrypt(cleanText, n);
    gridInfo.textContent = `Encryption matrix: ${n} x ${n}. Spaces and punctuation are ignored; X fills empty cells.`;
    renderGrid(cleanText, n, cleanText.length);
}


function renderGrid(cleanText, n, originalLength){
    let container = document.getElementById("matrixGridContainer");

    let fullText = cleanText;
    while (fullText.length < n * n){
        fullText += "X";
    }

    let table = document.createElement("table");
    for (let row = 0; row < n; row++){
        let tr = document.createElement("tr");
        for (let col = 0; col < n; col++){
            let td = document.createElement("td");
            let charIndex = row * n + col;
            td.innerText = fullText[charIndex];

            if (charIndex >= originalLength){
                td.classList.add("padding-cell");
        }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.innerHTML = ""; // Clear previous content
    container.appendChild(table);
} 


function matrixEncrypt(cleanText, n) {
    let totalCells = n * n;
    while (cleanText.length < totalCells) {
        cleanText += 'X';
    }

    let grid = [];
    for (let i = 0; i < n; i++) {
        grid.push(cleanText.substr(i * n, n));
    }

    let cipherText = '';
    for (let col = 0; col < n; col++) {
        for (let row = 0; row < n; row++) {
            cipherText += grid[row][col];
        }
    }
    return cipherText;
}



document.getElementById("button").addEventListener("click", processinfo);

//will add decrypter later