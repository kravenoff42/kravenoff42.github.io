$(document).ready(function() {
var location = "http://ip-api.com/json",
    whtrP=$("#wthr").text();

$.getJSON(location, function(data) {
   var lat = data.lat;
   var lon = data.lon;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=40f0f26e9e38315c0289d7f901281c8f", function(data) {

      // Our Data

      var icon = data.weather[0].icon;
      var icon_replace = $("#icon").attr("src");
      $("#city").html(data.name);

      var tempF = Math.round(data.main.temp * 9 / 5 - 459.67);
      var description = data.weather[0].description;
      var cDescription = description.charAt(0).toUpperCase() + description.slice(1);
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: description +', nature',
            tagmode: "all",
            format: "json"
        },
        function(data1) {
            var rnd = Math.floor(Math.random() * data1.items.length);

            var image_src = data1.items[rnd]['media']['m'].replace("_m", "_b");

            $('body').css('background-image', "url('" + image_src + "')");

        });
      // Apply Data To Page
      $("#icon").attr("src", icon_replace.replace("#", "http://openweathermap.org/img/w/" + icon + ".png"));


      $("#temp").html(tempF + '\xB0F');
      $("#desc").html(cDescription);


    })
  })


});
