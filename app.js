/**
 * Simple Password Generator
 *
 * @description Take a given phrase and generate a password.
 * @author Michael Geyer
 * @version 1.0.0
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
  quote.trim();
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
      console.log("numbers is checked");
      console.log(word);
      for (let i = 0; i < word.length; i++) {
        if (word[i] in numRepObj) word[i] = numRepObj[word[i]];
      }
    }

    // replace specCharacters in given specCharRepObj
    if (cbSpecChars.checked) {
      console.log("spec chars is checked");
      console.log(word);
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
}

/**
 * @function resetGenerator
 *
 */
function resetGenerator() {
  inputQuote.value = "";
  pwOutput.value = "";
}

/****************************************
 * EVENTS
 *
 */

btnGenerate.addEventListener("click", generatePassword);
btnReset.addEventListener("click", resetGenerator);
