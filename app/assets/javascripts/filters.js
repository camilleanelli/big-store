// choose number of results par pages
function resultsPerPage(helper) {
  $('#select-pages').on('change', function() {
    var number = $(this).val();
    helper.setQueryParameter('hitsPerPage', number).search();
  })
}

//display results by popularity
function searchByRank(helper) {
  $("#filter-select").on('change', function() {
    if($(this).val() === "Most relevant") {
      helper.setIndex('big-store').search();
    } else if($(this).val() === "Less populare") {
      helper.setIndex('big-store_rank_desc').search();
    } else if($(this).val() === "Most populare") {
      helper.setIndex('big-store_rank_asc').search();
    }
  });
}
