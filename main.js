
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
]

function createMatrix(w, h) {
    const matrix = []
    while (h--) {
        matrix.push(new Array(w).fill(0))
    }
    return matrix
}


function merge(matrix, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                matrix[y + player.pos.y][x + player.pos.x] = value
            }
        })
    })
}



function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] =
            [matrix[y][x], matrix[x][y]]
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse()
    }
}


const tetrisManager = new TetrisManager(document)
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local')
localTetris.run()
const connectionMananger = new ConnectionMananger(tetrisManager);
connectionMananger.connect('ws://sid-tetris.herokuapp.com:9000')


const keyListener = (event) => {
  [[65, 68, 81, 69, 83], [72, 75, 89, 73, 74]].forEach((key, index) => {
    const player = localTetris.player
    if (event.type === 'keydown') {
    if (event.keyCode === key[0]) {
        player.move(1)
    } else if (event.keyCode === key[1]) {
      player.move(-1)
    } else if (event.keyCode === key[2]) {
        player.rotate(-1)
    }  else if (event.keyCode === key[3]) {
         player.rotate(1)
  }
} 
  if (event.keyCode === key[4]) {
        if (event.type === 'keydown') {
          if (player.dropInterval !== player.DROP_FAST) {
            player.drop()
            player.dropInterval = player.DROP_FAST
          }
        } else {
          player.dropInterval = player.DROP_SLOW
        }
   }
  })
}




document.addEventListener('keydown', keyListener)
document.addEventListener('keyup', keyListener)




