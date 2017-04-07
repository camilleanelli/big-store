 function infoResults(content) {
    var html =  "<strong>"+content.nbHits + " results</strong> found in " + content.processingTimeMS + " ms";
    $('#info-results').html(html);
  }