window.BigStore || (window.BigStore = {});

//display pagination
BigStore.displayPagination = function(helper, content) {
  if(content.nbPages <= 1) {
    return;
  }
  var paginationResult = BigStore.buildPagination(content.page + 1, content.nbPages, 5);
  var html = "";
  // no 'previous' on the first page
  if( content.page !== 0) {
    html += BigStore.displayPageItem('previous', 'Previous');
  }
  // go to the beginning
  if(!paginationResult.startFromFirstPage) {
    html += BigStore.displayPageItem('first-page', '<<');
  }
  for(var i = 0; i < paginationResult.pages.length; i++) {
    var pageItem = paginationResult.pages[i];
    var activeClass = pageItem.isCurrent ? "active" : "";
    html += '<li class="page-item '+ activeClass +'"><a class="page-link numbers " href="#">' + pageItem.page + '</a></li>';
  }
  // go to the beginning
  if(!paginationResult.endAtLastPage) {
    html += BigStore.displayPageItem('last-page', '>>');
  }
  // not on the last page
  if(content.page + 1 !== content.nbPages) {
    html += BigStore.displayPageItem('next', 'Next');
  }
  $('.pagination').html(html);
}

// https://gist.github.com/trantorLiu/5924389
BigStore.buildPagination = function(currentPage, totalPage, size) {
  var startPage, endPage, context;
  startPage = currentPage - Math.floor(size / 2);
  endPage = currentPage + Math.floor(size / 2);
  if (startPage <= 0) {
    endPage -= (startPage - 1);
    startPage = 1;
  }
  if (endPage > totalPage) {
    endPage = totalPage;
    if (endPage - size + 1 > 0) {
      startPage = endPage - size + 1;
    } else {
      startPage = 1;
    }
  }
  context = {
    startFromFirstPage: false,
    pages: [],
    endAtLastPage: false,
  };
  if (startPage === 1) {
    context.startFromFirstPage = true;
  }
  for (var i = startPage; i <= endPage; i++) {
    context.pages.push({
      page: i,
      isCurrent: i === currentPage,
    });
  }
  if (endPage === totalPage) {
    context.endAtLastPage = true;
  }
  return context;
}

BigStore.attachPaginationListener = function(helper){
  $('.pagination').on('click','.numbers', function(e) {
    e.preventDefault();
    var link = parseInt($(this).text()) - 1;
    helper.setPage(link).search();
  });
  $('.pagination').on('click', '.previous', function(e) {
    e.preventDefault();
    helper.previousPage().search();
  });
  $('.pagination').on('click', '.next', function(e) {
    e.preventDefault();
    helper.nextPage().search();
  });
  $('.pagination').on('click', '.first-page', function(e) {
    e.preventDefault();
    helper.setPage(0).search();
  });
  $('.pagination').on('click', '.last-page', function(e) {
    e.preventDefault();
    helper.setPage(helper.lastResults.nbPages - 1).search();
  });
}

 

BigStore.displayPageItem = function(cssClass, text) {
  return '<li class="page-item"><a class="page-link '+ cssClass +'" href="#">'+ text +'</a></li>';
}

  