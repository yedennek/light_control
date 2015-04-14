$(document).ready(function() {

  var rooms = $(".rooms");

  var appendRooms = function(data, status, request){
      var roomsArray = data.rooms;
      for (var room in roomsArray) {
        rooms.append("<div id=\"room-" + room + "\"><p>" + roomsArray[room].room
                           + " <span class=\"state\">"
                           + roomsArray[room].state + "</span></p> \
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

  rooms.on({'click': toggleSwitch}, ".switch");
  rooms.on({'click': toggleText}, ".switch");
});
