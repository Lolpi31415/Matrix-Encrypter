function processinfo() {
    const plaintext = document.getElementById("input").value.toUpperCase();
    const cleanText = plaintext.replace(/[^A-Z]/g, "");
    const output = document.getElementById("output");
    const gridInfo = document.getElementById("gridInfo");
    const gridContainer = document.getElementById("matrixGridContainer");
    const traversalMode = document.getElementById("traversalMode").value;

    if (!cleanText) {
        output.value = "";
        gridInfo.textContent = "Enter letters to encrypt.";  //prompt user if no text in input
        gridContainer.innerHTML = "";
        return;
    }
//gets how big the matrix should be
    const n = Math.ceil(Math.sqrt(cleanText.length));
    output.value = matrixEncrypt(cleanText, n, traversalMode);
    gridInfo.textContent = `Encryption matrix: ${n} x ${n}. Read pattern: ${getTraversalLabel(traversalMode)}. Spaces and punctuation are ignored; X fills empty cells.`;
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


function matrixEncrypt(cleanText, n, traversalMode = "columns") {
    let totalCells = n * n;
    while (cleanText.length < totalCells) {
        cleanText += 'X';
    }

    const grid = [];
    for (let i = 0; i < n; i++) {
        grid.push(cleanText.slice(i * n, (i + 1) * n).split(""));
    }

    return getTraversal(n, traversalMode)
        .map(([row, col]) => grid[row][col])
        .join("");
}

function getTraversal(n, traversalMode) {
    const cells = [];

    if (traversalMode === "diagonal") {
        for (let diagonal = 0; diagonal < 2 * n - 1; diagonal++) {
            const minRow = Math.max(0, diagonal - n + 1);
            const maxRow = Math.min(n - 1, diagonal);
            if (diagonal % 2 === 0) {
                for (let row = maxRow; row >= minRow; row--) {
                    cells.push([row, diagonal - row]);
                }
            } else {
                for (let row = minRow; row <= maxRow; row++) {
                    cells.push([row, diagonal - row]);
                }
            }
        }
        return cells;
    }

    if (traversalMode === "spiral") {
        let top = 0;
        let bottom = n - 1;
        let left = 0;
        let right = n - 1;

        while (top <= bottom && left <= right) {
            for (let col = left; col <= right; col++) cells.push([top, col]);
            top++;
            for (let row = top; row <= bottom; row++) cells.push([row, right]);
            right--;
            if (top <= bottom) {
                for (let col = right; col >= left; col--) cells.push([bottom, col]);
                bottom--;
            }
            if (left <= right) {
                for (let row = bottom; row >= top; row--) cells.push([row, left]);
                left++;
            }
        }
        return cells;
    }

    const startCol = traversalMode === "shifted-columns" && n > 1 ? 1 : 0;
    for (let offset = 0; offset < n; offset++) {
        const col = (startCol + offset) % n;
        for (let row = 0; row < n; row++) {
            cells.push([row, col]);
        }
    }
    return cells;
}

function getTraversalLabel(traversalMode) {
    const labels = {
        columns: "columns",
        diagonal: "diagonal zigzag",
        spiral: "clockwise spiral",
        "shifted-columns": "columns shifted left by one"
    };
    return labels[traversalMode] || labels.columns;
}



document.getElementById("button").addEventListener("click", processinfo);

//will add decrypter later