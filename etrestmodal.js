   
$(function() {       
  $("#dialog").dialog({           
    modal: true,
               autoOpen: false,
               title: "jQuery UI Modal Dialog Box with REST for SharePoint",
               width: 600,
               height: 600       
  });       
  $("#btnShow").click(function() {           
    $('#dialog').dialog('open');       
  });
  $("#btnShowListItems").click(function() {            //append list items
    getListItems(complete, failure);       
  });   
});

function getListItems(complete, failure) {

  // Executing our items via an ajax request
  $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Recursion')/items",
    method: "GET",
    //headers: { "Accept": "application/json; charset=utf-8" },
    headers: {
      "Accept": "application/json; odata=verbose"
    },
    success: function(data) {
      complete(data); // Returns JSON collection of the results              

    },
    error: function(data) {
      failure(data);
    }
  });

}

var complete = function(data) {


  //var div = document.getElementById('ShowListItems');

  $.each(data.d.results, function(index, value) {

    $("#demo").append("<p>" + value.Title + "</p>");
  });
}
var failure = function(data) {
  alert(data);
}
