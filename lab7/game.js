// hangman.js
document.getElementById('startButton').addEventListener('click', startGame);

const questions = ['Biggest Mammal?', 'Fastest vehicle?'];
const answers = ['Whale', 'Jet'];

let selectedQuestion;
let selectedAnswer;
let guessedLetters = [];
let wrongGuesses = 0;

const maxAttempts = 6;

function startGame() {
  // Choose a random question and answer
  const randomIndex = Math.floor(Math.random() * questions.length);
  selectedQuestion = questions[randomIndex];
  selectedAnswer = answers[randomIndex];

  // Display the question
  document.getElementById('question').textContent = `Question: ${selectedQuestion}`;

  // Initialize guessed letters
  guessedLetters = [];
  wrongGuesses = 0;

  // Reset the display
  document.getElementById('answer').innerHTML = '';
  document.getElementById('dangle').textContent = '';

  // Create the display for the answer
  for (let i = 0; i < selectedAnswer.length; i++) {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('guessed-letter');
    letterDiv.setAttribute('id', `letter-${i}`);
    document.getElementById('answer').appendChild(letterDiv);
  }

  // Create letter buttons
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const lettersContainer = document.getElementById('letters');
  lettersContainer.innerHTML = '';
  letters.forEach(letter => {
    const letterButton = document.createElement('button');
    letterButton.textContent = letter;
    letterButton.classList.add('letter-button');
    letterButton.addEventListener('click', () => guessLetter(letter));
    lettersContainer.appendChild(letterButton);
  });
}

function guessLetter(letter) {
  if (guessedLetters.includes(letter) || wrongGuesses >= maxAttempts) {
    return;
  }

  guessedLetters.push(letter);

  let isCorrect = false;

  // Check if the guessed letter is in the answer
  for (let i = 0; i < selectedAnswer.length; i++) {
    if (selectedAnswer[i].toUpperCase() === letter) {
      document.getElementById(`letter-${i}`).textContent = letter;
      isCorrect = true;
    }
  }

  if (isCorrect) {
    // Check if the whole word is guessed
    if (document.querySelectorAll('.guessed-letter:empty').length === 0) {
      alert('You won! The answer is ' + selectedAnswer);
      resetGame();
    }
  } else {
    // Wrong guess
    wrongGuesses++;
    document.getElementById('dangle').textContent = `Wrong guesses: ${wrongGuesses}`;

    if (wrongGuesses >= maxAttempts) {
      alert('Game Over! The answer was ' + selectedAnswer);
      resetGame();
    }
  }
}

function resetGame() {
  setTimeout(() => {
    startGame();
  }, 2000);
}
