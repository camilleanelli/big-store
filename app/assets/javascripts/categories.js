 //display categories list
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

  //display results by categories
  function triggerResultsCategories(helper) {
    $('#facet-list').on('click', 'input[type=checkbox]', function(e) {
      var facetValue = $(this).data('facet');
      helper.toggleRefinement('category', facetValue).search();
    });
  }
 

  // categories select for mobile
  function renderFacetSelect(content) {
    var categories = content.getFacetValues('category');
    var selectedCategory = (categories.length == 1) ?  "selected" : "";
    var html = "";
    html += '<option selected value="">Choose a category</option>';
    $.map(categories, function(facet) {
      html += '<option '+selectedCategory+'>' + facet.name + '</option>';        
    });
    $("#facetselect").html(html);

   }

  // trigger results by categories on mobile device
  function triggerResultsCategoryOnMobile(helper) {
    $('#facetselect').on('change', function() {
      var facetValue = $(this).val();
      helper.toggleRefinement('category', facetValue).search();
      // reset on default option
      if(facetValue === "") {
        helper.clearRefinements('category').search();
      } 
    })
  }


  //reset categories
  function resetCategories(helper) {
    $('#reset, #reset-mobile').on('click', function() {
      helper.clearRefinements('category').search();
    });
  } 