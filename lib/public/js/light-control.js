$(document).ready(function() {

  var rooms = $(".rooms");

  var appendRooms = function(data, status, request){
      var roomsArray = data.rooms;
      roomsArray.forEach(function(room) {
        var roomString = "<div id='" + room.id + "'>";
        roomString += "<p>" + room.room;
        roomString += "  <span class='state'>" + stateString(room.on) + "</span>";
        roomString += "</p>";
        roomString += "<span class='switch" + switchClasses(room.on) + "' data-light-colour='" + room.colour + "'></span>";
        roomString += "</div>";

        rooms.append(roomString);
      });
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

  var switchClasses = function(state) {
    if (state) {
      return " active";
    } else {
      return "";
    }
  }

  var stateString = function(state) {
    if (state) {
      return "ON";
    } else {
      return "OFF";
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
