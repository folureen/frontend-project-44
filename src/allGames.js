import * as readlineSync from 'readline-sync';

let GameOver;
let userName;
let CorrectAnswer;
let firstRandomNumber;
let secondRandomNumber;
let sign;

let ProgressionNumber;
let stepProgress;

// Приветствие
const greetings = () => {
  userName = readlineSync.question('Welcome to the Brain Games! \nMay I have your name? ');
  console.log(`${'Hello,'} ${userName}${'!'}`);
};

// Определение имени
function getUsersName() {
  return userName;
}

// Правила игры
const rulesOfGame = (nameGame) => {
  switch (nameGame) {
    case 'brain-even':
      console.log('Answer "yes" if the number is even, otherwise answer "no".');
      break;
    case 'brain-calc':
      console.log('What is the result of the expression?');
      break;
    case 'brain-gcd':
      console.log('Find the greatest common divisor of given numbers.');
      break;
    case 'brain-progression':
      console.log('What number is missing in the progression?');
      break;
    case 'brain-prime':
      console.log('Answer "yes" if given number is prime. Otherwise answer "no".');
      break;
    default:
  // do nothing
  }
};

// Вывод рандомного числа
function getRandom(min, max) {
  const minCopy = Math.ceil(min);
  const maxCopy = Math.floor(max);
  return Math.floor(Math.random() * (maxCopy - minCopy)) + minCopy;
}

// Рандомный математический знак
const getRandomMathSign = () => {
  const arr = ['+', '-', '*'];
  const i = Math.floor(Math.random() * arr.length);
  const operator = arr[i];
  return operator;
};

// Доп функция в игре brain-progression
const progression = () => {
  stepProgress = getRandom(2, 10);
  const hideOfIndexNumber = getRandom(1, 10);
  let arr = [];
  const endProgression = firstRandomNumber + stepProgress * 10;
  for (
    let i = firstRandomNumber;
    i < endProgression;
    i += stepProgress
  ) {
    arr.push(i);
  }
  ProgressionNumber = arr.splice(hideOfIndexNumber, 1, '..');
  arr = arr.join(' ');
  return arr;
};

// Вопрос игроку
const question = (nameGame) => {
  firstRandomNumber = getRandom(2, 100);
  secondRandomNumber = getRandom(1, 100);
  sign = getRandomMathSign();
  let questionResult;
  switch (nameGame) {
    case 'brain-even':
      questionResult = console.log(`${'Question:'} ${firstRandomNumber}`);
      break;
    case 'brain-calc':
      questionResult = console.log(`${'Question:'} ${firstRandomNumber} ${sign} ${secondRandomNumber}`);
      break;
    case 'brain-gcd':
      questionResult = console.log(`${'Question:'} ${firstRandomNumber} ${secondRandomNumber}`);
      break;
    case 'brain-progression':
      questionResult = console.log(`${'Question:'} ${progression(firstRandomNumber, stepProgress)}`);
      break;
    case 'brain-prime':
      questionResult = console.log(`${'Question:'} ${firstRandomNumber}`);
      break;
    default:
      console.log('Sorry, something wrong');
      break;
  }
  return questionResult;
};

// Ответ от пользователя
const getUsersAnswer = () => readlineSync.question('Your answer: ');

// Расчет правильно ответа brain-even
const brainEvenCorrectAnswer = (a) => {
  if (a % 2 === 0) {
    CorrectAnswer = 'yes';
  } else if (a % 2 !== 0) {
    CorrectAnswer = 'no';
  }
  return CorrectAnswer;
};

// Правельный ответ brain-calc
const brainCalcCorrectAnswer = (a, b) => {
  if (sign === '+') {
    CorrectAnswer = a + b;
  } else if (sign === '-') {
    CorrectAnswer = a - b;
  } else {
    CorrectAnswer = a * b;
  }
  return CorrectAnswer;
};

// Расчет правильно ответа  brain-gcd

const brainGcdCorrectAnswer = (a, b) => {
  if (!b) {
    return a;
  }
  return brainGcdCorrectAnswer(b, a % b);
};

// Расчет правильно ответа  brain-prime
const brainPrimeCorrectAnswer = (a) => {
  for (let i = 2; i < a; i += 1) {
    if (a % i === 0) {
      return 'no';
    }
  }
  return 'yes';
};

// Правельный ответ в зависимости от игры
const correctAnswer = (nameGame) => {
  switch (nameGame) {
    case 'brain-even':
      brainEvenCorrectAnswer(firstRandomNumber);
      break;
    case 'brain-calc':
      brainCalcCorrectAnswer(firstRandomNumber, secondRandomNumber);
      break;
    case 'brain-gcd':
      CorrectAnswer = brainGcdCorrectAnswer(firstRandomNumber, secondRandomNumber);
      break;
    case 'brain-progression':
      CorrectAnswer = ProgressionNumber;
      break;
    case 'brain-prime':
      CorrectAnswer = brainPrimeCorrectAnswer(firstRandomNumber);
      break;
    default:
      console.log('Sorry, something wrong');
      break;
  }
  return CorrectAnswer.toString();
};

const textOfcorrectAnswer = () => {
  console.log('Correct!');
};

const compareOfAnswer = (nameGame) => {
  const userAnswer = getUsersAnswer();
  const answer = correctAnswer(nameGame);
  if (answer === userAnswer) {
    textOfcorrectAnswer();
  } else {
    console.log(`${userAnswer} ${'is wrong answer ;(. Correct answer was'} ${answer}.\n${"Let's try again,"} ${getUsersName()}!`);
    GameOver = 'true';
  }
};

const runGameWithCounter = (nameGame) => {
  greetings();
  rulesOfGame(nameGame);
  const count = 3;
  let i = 0;
  while (i < count && GameOver !== 'true') {
    question(nameGame);
    correctAnswer(nameGame);
    compareOfAnswer(nameGame);
    i += 1;
  }
  if (i === 3 && GameOver !== 'true') {
    console.log(`${'Congratulations,'} ${getUsersName()}!`);
  }
};

export default runGameWithCounter;
