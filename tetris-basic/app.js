document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0

  // The Tetrominoes

  const lTetromino = [

    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]

  ]

  const zTetromino = [

    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]

  ]

  const tTetromino = [

    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]

  ]

  const oTetromino = [

    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]

  ]

  const iTetromino = [

    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]

  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  // Randomnly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length)
  console.log(random)
  let current = theTetrominoes[random][currentRotation]

  // draw the Tetromino

  function draw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  draw()

  // undraw the Tetrimino

  function undraw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // make the tetromino move down every second, which is 1000 milliseconds
  timerId = setInterval(moveDown, 1000)

  // Assign function to keyCodes
  function control(e) {

    if (e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate ()
    } else if (e.keyCode === 39) {
      moveRight ()
    } else if (e.keyCode === 40) {
      moveDown ()
    }
  }

  document.addEventListener ('keyup', control)

  // Move Down function
  function moveDown () {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  // Freeze function
  function freeze () {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))

      // Start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
    }
  }

  // Move the tetromino left, unless it's at the edge or there is a blockage
  function moveLeft () {

    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge) currentPosition -= 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }

    draw()
  }

  // Move the tetromino right, unless it's at the edge or there is a blockage
  function moveRight () {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

    if (!isAtRightEdge) currentPosition += 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }
    draw()
  }

  // Rotate the Tetromino
  function rotate () {
    undraw()
    currentRotation++
    if (currentRotation === current.length) { // if the current rotation position reaches 4, this will make it go back to position 0
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  // Show UP-NEXT Tetromino in Mini-Grid
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0


  // The Tetrominoes without Rotations
  const upNextTentrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
  ]
  // Display the shape in the mini Grid
  function displayShape () {
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    upNextTentrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }

})
