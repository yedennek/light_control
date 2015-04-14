$(document).ready(function() {

  var appendRooms = function(data, status, request){
      var rooms = data.rooms;
      for (var room in rooms) {
        $(".rooms").append("<div id=\"room-" + room + "\"><p>" + rooms[room].room
                           + " <span class=\"state\">"
                           + rooms[room].state + "</span></p> \
                           <span class=\"switch\"></span></div>");
      }
    };

  var toggleSwitch = function(event) {
    var btn = event.target;
    $(btn).toggleClass('active');
  };

  var toggleText = function(event) {
    var node = event.target;
    var state = $(node).parent().find("span.state");

    if (state.text() == "OFF") {
      $(state).text("ON");
    } else {
      $(state).text("OFF");
    }
  }

  $.ajax({
    url: "/rooms",
    dataType: "json",
    success: appendRooms
  });

  $(".switch").on('click', toggleSwitch);
  $(".switch").on('click', toggleText);
});
