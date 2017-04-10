
  function displayByRanks(helper) {
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