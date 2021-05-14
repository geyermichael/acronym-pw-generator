/**
 * Simple Password Generator
 *
 * @description Take a given phrase and generate a password.
 * @author Michael Geyer
 * @version 1.0.2
 *
 * *****
 * 1) GLOBAL VARIABLES
 * 2) FUNCTIONS
 * 3) EVENTS
 */

/****************************************
 * GLOBAL VARIABLES
 *
 */
const inputQuote = document.querySelector("#quote");
const pwOutput = document.querySelector("#pw-output");
const cbNumbers = document.querySelector("#cb-numbers");
const cbSpecChars = document.querySelector("#cb-spec-chars");
const btnGenerate = document.querySelector("#btn-generate");
const btnReset = document.querySelector("#btn-reset");
const btnCheckPw = document.querySelector("#btn-check-pw");
const pwCheck = document.querySelector("#pw-check");

// Replacement Object for numbers and additional special characters
const numRepObj = {
  g: "9",
  G: "9",
  i: "1",
  I: "1",
  o: "0",
  O: "0",
  x: "10",
  X: "10",
};

const specCharRepObj = {
  u: "_",
  h: "-",
  a: "@",
};

/****************************************
 * FUNCTIONS
 *
 * @see generatePassword
 * @see resetGenerator
 *
 */

/**
 * @function generatePassword
 *
 */
function generatePassword() {
  // take the given phrase remove text wrap (new line) and trim it
  let quote = inputQuote.value.replaceAll("\n", " ");
  quote = quote.trim();
  // set value of quote input to timmed quote
  inputQuote.value = quote;
  // split quote into words
  let words = quote.split(" ");

  // push every first letter and every special char into an array 'pw'
  let pw = [];
  words.forEach((word) => {
    // using regex to find special characters at the end of word
    const regex = new RegExp(/\W$/g);
    let specChar = [];

    // special characters are always at the end of a give word
    // e.g. 'example,' or 'endofsentence!'
    // filter it out and slice it from the word
    if (regex.test(word)) {
      specChar = word.match(regex);
      word = word.slice(0, specChar.index);
    }

    // split the word, without special character, to create an array
    word = word.split("");

    // replace numbers in given numRepObj
    if (cbNumbers.checked) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] in numRepObj) word[i] = numRepObj[word[i]];
      }
    }

    // replace specCharacters in given specCharRepObj
    if (cbSpecChars.checked) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] in specCharRepObj) word[i] = specCharRepObj[word[i]];
      }
    }

    // push the first letter of the given word to the pw array
    pw.push(word[0]);

    // if there was an special character, push it next into the pw array
    if (specChar[0]) pw.push(specChar[0]);
  });

  // join every element of the array for the generated password
  pw = pw.join("");

  // output the generate password on the frontend element
  pwOutput.value = pw;
  checkPassword(pw);
  btnCheckPw.style.display = "block";
  btnReset.style.display = "block";
}

/**
 * @function resetGenerator
 *
 */
function resetGenerator() {
  inputQuote.value = "";
  pwOutput.value = "";
  btnCheckPw.style.display = "none";
  pwCheck.style.display = "none";
  btnReset.style.display = "none";
  toggleBtnGenerate();
}

/**
 * @function checkPassword
 *
 * @param pw
 * @description simple string check for given password
 *
 */

function checkPassword(pw) {
  // check if pw is defined
  if (!pw) return;

  const regexSpecChar = new RegExp(/[^a-zA-Z0-9]/g);
  const regexNums = new RegExp(/[0-9]/g);
  const simplePwSecurity = {
    low: `
        <p>Your password is not good 😕</p>
        `,
    medium: `
        <p>Your password is good 🙂 </p>
        `,
    high: `
        <p>Your password is great 🤩</p>
        `,
  };

  pwCheck.style.display = "block";

  console.log(pw);
  console.log(pw.length);
  console.log(regexSpecChar.test(pw));
  console.log(regexNums.test(pw));

  if (pw.length < 10) pwCheck.innerHTML = simplePwSecurity.low;
  if (pw.length > 10) pwCheck.innerHTML = simplePwSecurity.medium;
  if (pw.length > 10) {
    if (
      (!regexSpecChar.test(pw) && regexNums.test(pw)) ||
      (regexSpecChar.test(pw) && !regexNums.test(pw))
    )
      pwCheck.innerHTML = simplePwSecurity.medium;
  }
  if (pw.length > 10 && regexSpecChar.test(pw) && regexNums.test(pw))
    pwCheck.innerHTML = simplePwSecurity.high;
}

/**
 * @function toggleBtnGenerate
 *
 */
function toggleBtnGenerate() {
  if (inputQuote.value == "") {
    btnGenerate.disabled = true;
    return;
  }
  btnGenerate.disabled = false;
}

/****************************************
 * EVENTS
 *
 */

btnGenerate.addEventListener("click", generatePassword);
inputQuote.addEventListener("keyup", toggleBtnGenerate);
btnReset.addEventListener("click", resetGenerator);
btnCheckPw.addEventListener("click", () => checkPassword(pwOutput.value));
