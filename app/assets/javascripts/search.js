// trigger results of the search box
function triggerSearch(helper) {
  $('#search-box').on('keyup', debounce(function(e) {
    var currentSearchValue = $(this).val();
    helper.setQuery(currentSearchValue).search();
  }, 400));
}


// debounce() function to limit number of queries
function debounce(callback, delay){
  var timer;
  return function(){
    var args = arguments;
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function(){
        callback.apply(context, args);
    }, delay)
  }
}

//display the hits
function renderHits(content) {
  console.log(content);
  $('#container').html(function() {
    if(content.nbHits > 0) {
      $('.categories-select, #info-results, .title-facet, #pagination, .result-select, #select-pages, #filter-select, .filter-select, #reset').css('display', 'block');
      return $.map(content.hits, function(hit) {
        return renderHit(hit);
     });
    }else {
      $('.categories-select, #info-results, .title-facet, #pagination, .result-select, #select-pages, #filter-select, .filter-select, #reset').css('display', 'none');
      return '<div class="text-center pd-100 col-sm-8 offset-xs-1"><p>Sorry, no apps found </p>' +
      '<br><p class="blank-state"> ❨╯°□°❩╯︵┻━┻</p></div>';
    }
  });
}

// html code for a hit
function renderHit(hit) {
  return '<div class="hidden-xs-down hit-card col-xs-12 col-sm-6 col-md-4">'+ 
  '<a href="' + hit.link + '" target="_blank">' + 
    '<div class="ar-1-1 hit" style="background-image: url(\'https://placeimg.com/175/175/'+hit.name+'\');">'+
      '<div class="filter">'+
        '<p class="title-hit text-white">'+ hit._highlightResult.name.value.substring(0,20) +'</p>'+
          '<div class="details"><span class="label font-montserrat fs-11">'+ hit.category +'</span></div>'+
          '<div class="text-white link">Buy now!</div>' +
        '</div>'+
      '</div>' +
    '</a>' +
  '</div>' +
  '<div class="hidden-sm-up col-12 pd-top-20 results-mobile">' + 
    '<a href="' + hit.link + '" target="_blank">' +
      '<div class="row">' +   
        '<div class="col-2 img-hit-mobile" style="background-image: url(\'https://placeimg.com/100/100/'+hit.name+'\');">' + 
      '</div>' +
        '<div class="col-7">' + hit._highlightResult.name.value.substring(0,20) + 
          '<p class="color-font">Show more</p>' +
        '</div>' +
        '<div class="col-3"><span class="label font-montserrat fs-11">'+ hit.category +'</span></div>' +
      '</div>' + 
    '</a>' + 
  '</div>';
}

//display number of results and number of ms
function infoResults(content) {
  var html =  "<strong>"+ content.nbHits + " results</strong> found in " + content.processingTimeMS + " ms";
  $('#info-results').html(html);
}