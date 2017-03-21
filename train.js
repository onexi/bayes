// keep track of documents per language
var documents = {
    french  : 0,
    spanish : 0,
    english : 0,
    german  : 0,
    basque  : 0
};

// words instances across all languages
// e.g. {banana: 13, and: 5, blanco: 2, en: 6}
var wordsTotal = {};

// word instances per language
// e.g. banana : {english: 5, french: 4, spanish: 4}
var wordsPerLanguage = {};

// process training documents
var train = function (document, language) {

    // increment document count
    documents[language] += 1;

    // extract word array from document
    var words = tokenize(document);
    var length = words.length;

    // increment words total and words per language
    for (var i = 0; i < length; i++)
        incrementWords(words[i], language);
};

// filtering function, removes duplicates
function unique(value, index, self) { 
    return self.indexOf(value) === index;
}

// create tokens from document
var tokenize = function (text) {
    text = text.toLowerCase();
    // remove non-alphanumeric chars
    text = text.replace(/\W/g, ' '); 
    // replace blank segments with single blank space
    text = text.replace(/\s+/g, ' ');
    // remove leading/trailing whitespace
    text = text.trim();
    // create array using empty space as separator
    text = text.split(' ');
    // remove duplicate words
    text = text.filter(unique);    
    return text;
};

// add to words total and words per language
var incrementWords = function (word, language) {

    // add to wordsTotal
    if (word in wordsTotal){
        wordsTotal[word] += 1;
    }
    else{
        wordsTotal[word] = 1;
    }

    // add wordsPerLanguage
    if (word in wordsPerLanguage){
        if (language in wordsPerLanguage[word]){
            wordsPerLanguage[word][language] += 1;
        }
        else{
            wordsPerLanguage[word][language] = 1;
        }        
    }
    else{
        wordsPerLanguage[word] = {};
        wordsPerLanguage[word][language] = 1;
    }
};

function trainingCounts(){
    var training            = {};
    training.docCounts      = documents;
    training.docNotInCounts = {};

    var count = 0;
    for(var language in documents){
        count += documents[language];
    }
    training.totalDocCount = count;

    for(language in documents){
        training.docNotInCounts[language] = 
            training.totalDocCount - documents[language];
    }
    return training;
}

function wordTotalCount(word){    
    var count = 0;
    if(wordsTotal[word]){
        count = wordsTotal[word];
    } 
    return count;
}

function wordCountInLanguage(word,language){    
    var count = 0;
    if(wordsPerLanguage[word]){
        if (wordsPerLanguage[word][language]){
            count = wordsPerLanguage[word][language];
        }
    } 
    return count;
}

var wordNotInLanguageCount = function (word, language) {
    var total = 0;
    for (var document in documents) {
        if (document === language) 
            continue;
        total += wordCountInLanguage(word, document);
    }
    return total;
};

function calculateProbability(word,language,training){

    // probability that word shows up in a language
    // e.g. the probability that "bonjour" shows up in a French document
    // ----------------------------------------------------------
    //      YOUR CODE
    // ----------------------------------------------------------             


    // probability that word is not in language
    // ----------------------------------------------------------
    //      YOUR CODE
    // ----------------------------------------------------------             

    // probability that document is in a "language" given that "word" is in it
    // e.g. probability that document is french given that "bonjour" is in it
    // http://en.wikipedia.org/w/index.php?title=Naive_Bayes_spam_filtering#Computing_the_probability_that_a_message_containing_a_given_word_is_spam
    // ----------------------------------------------------------
    //      YOUR CODE
    // ----------------------------------------------------------                


    // avoid 0 and 1 for later log calculations
    if (probability === 0) probability = 0.01;
    else if (probability === 1) probability = 0.99;
    return probability;    
}




