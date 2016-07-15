

$(document).ready(function(){
  var currentQuote="";

	$("#button").click(function(currentQuote){
    $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous',
      type: 'POST', // The HTTP Method
      data: {}, // Additional parameters here
      datatype: 'json',
      success: function(data,currentQuote) {

        var obj = $.parseJSON(data);

        var rawquote=obj.quote;

        var quoteArr= rawquote.split(' ');
        var chop= Math.floor(quoteArr.length/2.5);
        var temp= quoteArr.slice(Math.floor(Math.random()*chop), quoteArr.length-Math.floor(Math.random()*chop));
        var misquote=temp.join(' ');
        var author=obj.author;
        $("#quote").text('"...'+misquote+'..."');
        $("#speaker").text("-"+obj.author+' (Sort of)');
        currentQuote='"...'+ misquote +'..." -'+ author +' (Sort of)';
        console.log(currentQuote);

      },
      error: function(err) { alert(err); },
      beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Mashape-Authorization', 'cqHXUJnBr2msh0tlL06vUMpjyTI3p1Cuqpyjsn48IBVtfWMBoT');
      }
    });
  });

  $("#link").click(function(){
    console.log(currentQuote);
      if (currentQuote!=""){
        $(this).attr("href", "http://twitter.com/home?status="+ currentQuote);
        return false;
      }
      if (currentQuote == ""){
        $(this).attr("href", "http://twitter.com/home?status=Check out -No Context- a cool new quote generator!");
        return false;
      }
  });
});
