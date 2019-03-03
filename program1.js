 
 var input = document.querySelectorAll('textarea')[0],
	wordCount = document.querySelector('#wordCount'),
	keywordsDiv = document.querySelectorAll('.keywords')[0],
	topKeywords = document.querySelector('#topKeywords');


input.addEventListener('keyup', function() {

  console.clear(); 

  var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
  console.log(words);
  if (words) {
    wordCount.innerHTML = words.length;
  } else {
    wordCount.innerHTML = 0;
  }

   if (words) {

    var nonStopWords = [];
       var stopWords = ["pühapäev"];
    for (var i = 0; i < words.length; i++) {

      if (stopWords.indexOf(words[i].toLowerCase()) === -1 && isNaN(words[i])) {
        nonStopWords.push(words[i].toLowerCase());
      }
    }

    var keywords = {};
    for (var i = 0; i < nonStopWords.length; i++) {

      if (nonStopWords[i] in keywords) {
        keywords[nonStopWords[i]] += 1;
      } else {
        keywords[nonStopWords[i]] = 1;
      }
    }

    var sortedKeywords = [];
    for (var keyword in keywords) {
      sortedKeywords.push([keyword, keywords[keyword]])
    }
    sortedKeywords.sort(function(a, b) {
      return b[1] - a[1]
    });


    topKeywords.innerHTML = "";
    for (var i = 0; i < sortedKeywords.length && i < 10; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + sortedKeywords[i][0] + "</b>: " + sortedKeywords[i][1];
      topKeywords.appendChild(li);
    }
  }


  if (words) {
    keywordsDiv.style.display = "block";
  } else {
    keywordsDiv.style.display = "none";
  }

});
