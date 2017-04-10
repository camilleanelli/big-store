  //display the hits
  function renderHits(content) {
    $('#container').html(function() {
      if(content.nbHits > 0) {
        $('.categories-select, #info-results, .title-facet, #pagination, .result-select, #select-pages, #filter-select, .filter-select, #reset').css('display', 'block');
        return $.map(content.hits, function(hit) {
          return renderHit(hit);
       });
      }else {
        $('.categories-select, #info-results, .title-facet, #pagination, .result-select, #select-pages, #filter-select, .filter-select, #reset').css('display', 'none');
        return '<div class="text-center pd-100 col-sm-8 offset-xs-1"><p>Sorry, no apps found </p>' +
        '<br><p class="fs-40"> ❨╯°□°❩╯︵┻━┻</p></div>';
      }
    });
  }

  // html code for a hit
  function renderHit(hit) {
    return '<div class="hit-card col-xs-12 col-sm-6 col-md-4">'+ 
    '<a href="' + hit.link + '" target="_blank">' + 
      '<div class="ar-1-1 hit" style="background-image: url(\'https://placeimg.com/175/175/'+hit.name+'\');">'+
        '<div class="filter">'+
          '<p class="title-hit text-white">'+ hit._highlightResult.name.value +'</p>'+
            '<div class="details"><span class="label font-montserrat fs-11">'+ hit.category +'</span></div>'+
            '<div class="text-white link">Buy now!</div>' +
          '</div>'+
        '</div>' +
      '</a>' +
    '</div>'
  }

  // select number of results per page 
  function resultsPerPage(helper) {
    $('#select-pages').on('change', function() {
      var number = $(this).val();
      helper.setQueryParameter('hitsPerPage', number).search();
    })
  }

   //display number of results and number of ms
  function infoResults(content) {
    var html =  "<strong>"+content.nbHits + " results</strong> found in " + content.processingTimeMS + " ms";
    $('#info-results').html(html);
  }