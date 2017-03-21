function guess(){
    var inputString = document.getElementById('inputString').value;
    run(inputString);
}

function run(text){
    var input           = tokenizeInput(text);
    var training        = trainingCounts();
    var word            = '';    
    var scores          = {};    
    var probability     = 0;

    // loop though languages in documents
    for(var language in documents){

        // stores the probability of document in language
        var logSum = 0;        
       
        // loop through the words in the input text
        for (var i = 0; i < input.words.length; i++) {
            word = input.words[i];

            // instaces of the word across all languages
            var _wordTotalCount = wordTotalCount(word);

            // if zero, no info on word, jump to next loop iteration
            if (_wordTotalCount === 0) { continue; } 

            // calculate probability
            probability = calculateProbability(word,language,training);
       
            // Underflow Prevention
            // http://en.wikipedia.org/wiki/Naive_Bayes_spam_filtering#Other_expression_of_the_formula_for_combining_individual_probabilities
            // ----------------------------------------------------------
            //      YOUR CODE
            // ----------------------------------------------------------            

            // debugging feedback
            console.log(language + "icity of " + word + ": " + probability + ", logSum: " + logSum);
        }

        // The combined probability
        // ----------------------------------------------------------
        //      YOUR CODE
        // ---------------------------------------------------------- 

    }
    displayPretty(scores);    
    return scores;
}

function tokenizeInput(text){
    // create array of words from input text
    var input    = {};
    input.words  = tokenize(text);
    return input;
}

function displayPretty(scores){    
    var element = document.getElementById('result');
    var html = '<div>';

    for (var language in scores) {
        html += '<span class="language">' + language + " </span>: " + 
                '<span class="score">' + scores[language] + " </span><br>";
    }
    html += '</div>';    
    element.innerHTML = html;
}

