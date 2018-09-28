const Variety = require('./models/variety.js');

// generate lorem ipsum text
/**
 * Generates lorem ipsum text.
 * @param {int} quantity - How many items to generate
 * @param {String} selected - What to generate (paragraphs, words, lists)
 * @param {String} variety - Which lorem ipsum generator to use
 * @param {Function} callback - Callback function
 */
function generateText(quantity, selected, variety, callback) {
  // empty content array to receive content
  let content = [];

  Variety.findOne({name: variety})
      .exec(function(error, result) {
        // set full text
        const loremIpsum = result.fullText;

        // set paragraphs
        const paragraphs = result.paragraphs;

        // start words function
        const words = (count) => {
          let generatedWords = '';
          let startIndex = 0;
          let endIndex = 0;
          let nextWord;

          for (let i = 0; i < count; i++) {
            // var for resetting @ reach end of text
            let reset = false;

            // find index of first space (' ')
            endIndex = loremIpsum.indexOf(' ', startIndex + 1);

            // handle if reached end of lorem ipsum
            // -> set end index as last character in lorem ipsum string
            if (endIndex === -1) {
              endIndex = loremIpsum.length - 1;
              reset = true;
            }

            // retrieve word
            nextWord = loremIpsum.substring(startIndex, endIndex);

            // add to generated words string
            generatedWords += nextWord;

            // handle reset
            if (!reset) {
              // update start index
              startIndex = endIndex;
            } else {
            // reset indexes
              startIndex = 0;
              endIndex = 0;
              reset = false;
            }
          }

          console.log(` + +  Ending generate words, count: ${count}  + +`);
          return (generatedWords);
        }; // END WORDS FUNCTION

        // start lists funciton
        const lists = (count) => {
          let generatedLists = [];
          let startIndex = 0;
          let endIndex = 0;
          let nextListItem;

          for (let i = 0; i < count; i++) {
            // log start and end index

            // handle if reached end of lorem ipsum -> reset
            if (startIndex === loremIpsum.length) {
              // start index includes (+1) from below
              startIndex = 0;
            }

            // find index of first period ('.')
            endIndex = loremIpsum.indexOf('.', startIndex);

            // retrieve sentence and add to new list item
            // (+1) includes '.'
            nextListItem = loremIpsum.substring(startIndex, endIndex + 1);

            // add to generated lists string
            generatedLists.push(nextListItem);

            // update start index
            startIndex = endIndex + 1; // (+1) includes '.'
          }

          return (generatedLists);
        }; // END LISTS FUNCTION

        // ------------ START TEXT GENERATION -------------

        // PARAGRAPHS
        if (selected === 'Paragraphs') {
          for (let i = 0; i < quantity; i++) {
            content.push(paragraphs[i%5]);
          }

          // WORDS
        } else if (selected === 'Words') {
          content.push(words(quantity));

          // LISTS
        } else { // selected === 'lists'
          content = lists(quantity);
        }

        return callback(content);
      }); // END EXEC FUNCTION
}


module.exports.generateText = generateText;
