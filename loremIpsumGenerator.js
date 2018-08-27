const Variety = require('./models/variety.js');

// generate lorem ipsum text
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
      const words = count => {
        //console.log('\nStarting get words(count)');
        let generatedWords = '';
        let startIndex = 0;
        let endIndex = 0;
        let nextWord;
      
        //console.log('\nStarting for-loop');
        for (let i = 0; i < count; i++) {
      
          // var for resetting @ reach end of text
          let reset = false;
      
          // log start and end index
          //console.log(`startIndex: ${startIndex}`);
          //console.log(`endIndex: ${endIndex}`);
          
          // find index of first space (' ')
          endIndex = loremIpsum.indexOf(' ', startIndex + 1);
          //console.log(`End index changed to ${endIndex}`);
      
          // handle if reached end of lorem ipsum -> set end index as last character in lorem ipsum string
          if (endIndex === -1) {
            endIndex = loremIpsum.length - 1;
            reset = true;
          }
      
          // retrieve word
          nextWord = loremIpsum.substring(startIndex, endIndex);
          //console.log(`Word retrieved: ${nextWord}`);
      
          // add to generated words string
          generatedWords += nextWord;
          //console.log(`generatedWords: ${generatedWords}`);
      
          // handle reset
          if (!reset) {
            // update start index
            startIndex = endIndex;
            //console.log(`Start index changed to ${startIndex}`);
          } else {
            // reset indexes
            startIndex = 0;
            endIndex = 0;
            reset = false;
          }
        }
      
        console.log(` + +  Ending generate words, count: ${count}  + +`);
        //console.log(generatedWords);
        return(generatedWords);
      } // END WORDS FUNCTION

      // start lists funciton
      const lists = count => {
        // console.log('\nStarting get lists(count)');
        let generatedLists = [];
        let startIndex = 0;
        let endIndex = 0;
        let nextListItem;
      
        // console.log('\nStarting for-loop');
        for (let i = 0; i < count; i++) {
      
          // log start and end index
          // console.log(`\nstartIndex: ${startIndex}`);
          // console.log(`endIndex: ${endIndex}`);
          
          // handle if reached end of lorem ipsum -> reset
          if (startIndex === loremIpsum.length) { // start index includes (+1) from below
            startIndex = 0;
          }
      
          // find index of first period ('.')
          endIndex = loremIpsum.indexOf('.', startIndex);
          // console.log(`End index changed to ${endIndex}`);
      
          // retrieve sentence and add to new list item
          nextListItem = loremIpsum.substring(startIndex, endIndex + 1);  // (+1) includes '.'
          // console.log(`List item created: ${nextListItem}`);
      
          // add to generated lists string
          generatedLists.push(nextListItem);
          //console.log(`generatedLists: ${generatedLists}`);
         
          // update start index
          startIndex = endIndex + 1; // (+1) includes '.'
          // console.log(`Start index changed to ${startIndex}`);
        }
      
        //console.log(` + + Ending generate lists, count: ${count}+ +`);
        //console.log(generatedLists);
        return(generatedLists);
      } // END LISTS FUNCTION

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
      } else {  // selected === 'lists'

        content = lists(quantity);
        
      }

      return callback(content);

    }); // END EXEC FUNCTION
}


module.exports.generateText = generateText;