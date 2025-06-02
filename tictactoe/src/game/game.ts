// Tic Tac Toe Game Engine


// gameState
// move(gameState) -> gameState
// endCondition(gameState) -> endResult | undefined

type Player = 'x' | 'o'
type Cell = Player | null
type Board = Cell[][]
type EndState = Player | 'tie' | undefined
type Game = {
    board: Board,
    currentPlayer: Player
    endState?: EndState
}

const initialGameState = (): Game => {
    const game: Game = {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        currentPlayer: 'x'
    }
    return game
}
