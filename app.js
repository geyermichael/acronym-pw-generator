/**
 * Simple Password Generator
 *
 * @description Take a given phrase and generate a password.
 * @author Michael Geyer
 * @version 1.0.0
 */

// GLOBAL VARIABLES
const inputPhrase = document.querySelector("#phrase");
const btnGenerate = document.querySelector("#btn-generate");
const pwOutput = document.querySelector("#pw-output");

/**
 * @function generatePassword
 *
 */
function generatePassword() {
  // take the given phrase and trim it
  let phrase = inputPhrase.value.trim();
  // set value of phrase input to timmed phrase
  inputPhrase.value = phrase;
  // split phrase into words
  let words = phrase.split(" ");

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

btnGenerate.addEventListener("click", generatePassword);
