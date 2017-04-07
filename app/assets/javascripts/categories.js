
  function renderFacetList(content) {
    $('#facet-list').html(function() {
      return $.map(content.getFacetValues('category'), function(facet) {
        var checkbox = $('<input type=checkbox>')
          .data('facet', facet.name)
          .attr('id', 'fl-' + facet.name);
        if(facet.isRefined) checkbox.attr('checked', 'checked');
        var label = $('<label>').html(facet.name + ' (' + facet.count + ')')
          .attr('for', 'fl-' + facet.name);
        return  $('<li>').append(checkbox).append(label);
      });
    });
  } 

  //trigger category selected
  $('#facet-list').on('click', 'input[type=checkbox]', function(e) {
    var facetValue = $(this).data('facet');
    helper.toggleRefinement('category', facetValue).search();
  });

   // for mobile device
  function renderFacetSelect(content) {
      var html = '<option selected>Choose category</option>';
      $.map(content.getFacetValues('category'), function(facet) {
        return html +='<option>' + facet.name + '</option>';
      });
      $("#facetselect").html(html);
   }


   // trigger category selected
  $('#facetselect').on('change', function() {
    var facetValue = $(this).val();
    helper.toggleRefinement('category', facetValue).search();
  })
