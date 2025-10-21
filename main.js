const Gameboard = (function() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push('');
        }
    }
    function setMarker(mark, row, col) {
        if (board[row][col] === '') board[row][col] = mark;
    }

    const getBoard = () => board;

    function printBoard() {
        console.log(board);
    }

    return {setMarker, getBoard, printBoard};

})();

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

const GameController = () => {
    const board = Gameboard();
    const p1 = new Player("Player 1", 'X');
    const p2 = new Player("Player 2", 'O');

    let activePlayer = p1;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === p1 ? p2 : p1;
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
    
    const playRound = (row, col) => {
        board.setMarker(activePlayer.marker, row, col);

        let winner = null;
        let tie;
        const grid = board.getBoard();
        const winningCombos = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
   
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
  
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]],
        ];

        for (const combo of winningCombos) {
            const [r0, c0] = combo[0];
            const [r1, c1] = combo[1];
            const [r2, c2] = combo[2];

            

            if(grid[r0][c0] != '' && grid[r0][c0] == grid[r1][c1] && grid[r1][c1] == grid[r2][c2]) {
                winner = activePlayer;
                console.log(`${activePlayer.name} wins!`);
                break;
            }
        }

        if (!winner) {
            tie = true; 
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (grid[i][j] === '') {
                        tie = false; 
                        break;
                    }
                }
                if (!tie) break;
            }           
        }

        if (tie) {
            console.log("It's a tie!");
        } 
        else if (!winner) {
            switchPlayerTurn();
            printNewRound();
        }
    }

};

