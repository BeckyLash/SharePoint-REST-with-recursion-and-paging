$(function() {       
  $("#dialog").dialog({           
    modal: true,
               autoOpen: false,
               title: "jQuery UI Modal Dialog Box with REST and recursion for SharePoint",
               width: 600,
               height: 600       
  });       
  $("#btnShow").click(function() {           
    $('#dialog').dialog('open');       
  });
  $("#btnShowListItems").click(function() {
              //append list items
var topItems = 20;
var query = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Recursion')/items?$select=Id,Title,Created&$orderby=Created" + '&$top=' + topItems; 
    getListItems(query, complete, failure);       
  });   
});

//topItems = how many items to get in one call, static number that doesn't change
//startItemId = (startItemId-1)

function getListItems(query, complete, failure) {

//might work var querystring="?$skiptoken=" + encodeURIComponent('Paged=TRUE&p_SortBehavior=0&p_ID=' + (startItemId-1) + '&$top=' + topItems);

  $.ajax({
    url: query,
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
//success
var complete = function(data) {
alert(data.d.__next);
var query = data.d.__next;


  $.each(data.d.results, function(index, value) {
    $("#demo").append("<p>" +value.Id + value.Title + "/" + value.Created +"</p>");
  });

getListItems(query, complete, failure);
}
var failure = function(data) {
  alert(data);
}
