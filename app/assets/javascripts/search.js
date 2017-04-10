function triggerValueSearch(helper) {
  $('#search-box').on('keyup', function() {
    var currentSearchValue = $(this).val();
    helper.setQuery(currentSearchValue).search();
  });
}