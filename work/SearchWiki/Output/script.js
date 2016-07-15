$(document).ready( function()
{
	$('form').submit(function(event)
  {

		var $input = $(event.target).find('input');
		var search = $input.val();
    if (search != "")
   {
		$('#list').empty();
		$('#listDiv').prepend('<center>Searching for <b>"'+search+'"</b>...</center>');
    var link ="https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cextracts&list=&generator=search&utf8=1&inprop=url%7Cdisplaytitle&exsentences=5&exlimit=10&exintro=1&explaintext=1&gsrsearch="+search
  $.ajax({
    type: 'GET',
    url: link,
    jsonp: "callback", //adds '?callback=?" to link
    dataType: "jsonp",
    cache: true, //needed to store data
    success: function(data) {
       //successful return
			if (data.query==undefined){//test is results are blank
				$('#listDiv').html('<center>No results found.</center>');
				$input.val("");//clear search field
			}
	    $.each(data.query.pages,
	    function(key, value){
	      //parsing JSON
	    var item = value.title;
	    var itemDesc = value.extract.substr(0,150);
	    var url = value.fullurl;
	     //consstructing <li> html
			var card= '<li><a class="title" target="_blank" href="'+url+'"><h3>'+item+'</h3></a><p>"'+itemDesc+'..."<br/><a class="readMore" target="_blank" href="'+url+'">Read More...</a></p></li>';
				$('#list').append(card);//add card to list
				$input.val("");//clear search field
	    });//close each
		},//close success
		error: function() {
			$('#listDiv').html('<center>Ooh no! Something went wrong with your search. Please try again later.</center>');
			$input.val("");//clear search field
		}//close error
    });//close ajax
   }//close blank check

	});//close form event

});//close ready function
