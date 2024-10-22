let solutions = [];
let step = 0;
let board = document.getElementById('board');

function startVisualization() {
    let nInput = document.getElementById('n');
    const N = parseInt(nInput.value);
    speak(`Enter ${N}`);

    if (isNaN(N) || N <= 0) {
        alert("Please enter a valid number greater than 0.");
        speak("Please enter a valid number greater than 0.");
        return;
    }

    solutions = [];
    step = 0;
    document.getElementById('board').innerHTML = '';
    solveNQueens(N);
    if (solutions.length > 0) {
        drawBoard(solutions[0], N);
    }
}

function nextStep() {
    let nInput = document.getElementById('n');
    const N = parseInt(nInput.value);

    if (solutions.length > 0) {
        step = (step + 1) % solutions.length;
        drawBoard(solutions[step], N);
    }
}

function drawBoard(solution, N) {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${N}, 40px)`;

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            if (solution[row] === col) {
                let queen = document.createElement('div');
                queen.className = 'queen';
                queen.innerHTML = '&#9818;'; // Unicode for chess queen
                cell.appendChild(queen);
            }
            board.appendChild(cell);
        }
    }
}

function solveNQueens(N) {
    let board = Array.from({ length: N }, () => -1);
    backtrack(board, 0, N);
}

function isSafe(board, row, col, N) {
    for (let i = 0; i < row; i++) {
        if (board[i] === col || 
            board[i] - i === col - row || 
            board[i] + i === col + row) {
            return false;
        }
    }
    return true;
}

function backtrack(board, row, N) {
    if (row === N) {
        solutions.push([...board]);
        return;
    }
    for (let col = 0; col < N; col++) {
        if (isSafe(board, row, col, N)) {
            board[row] = col;
            backtrack(board, row + 1, N);
            board[row] = -1;
        }
    }
}
function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}