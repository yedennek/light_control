$(document).ready(function() {

  $.ajax({
    url: "/rooms",
    dataType: "json",
    success: function(data, status, request){
      var rooms = data.rooms;
      for (var room in rooms) {
        $(".rooms").append("<p>" + rooms[room].room + " <span>" + rooms[room].state + "</span></p>");
      }
    }
  });

  $("#office").click(function() {
    if ($(this).find("span").text() == "OFF") {
      $(this).find("span").text("ON");
      $("rect").attr("fill", "black");
    } else {
      $(this).find("span").text("OFF");
      $("rect").attr("fill", "white");
    }
  });

});
