$(document).ready(function() {

  var rooms = $(".rooms");
  var roomsState;

  var getState = function(data, status, request){
    roomsState = data.rooms;
    renderInitialRoomState();
  };

  var renderInitialRoomState = function(){
    roomsState.forEach(function(room) {
      var roomString = "<div id='" + room.id + "'>";
      roomString += "<p>" + room.room;
      roomString += "  <span class='state'>" + stateString(room.on) + "</span>";
      roomString += "</p>";
      roomString += "<span class='switch" + switchClasses(room.on) + "' data-light-colour='" + room.colour + "'></span>";
      roomString += "</div>";

      rooms.append(roomString);
    });
  };

  var rerenderRooms = function(){
    roomsState.forEach(function(room) {
      $('#' + room.id).find('.state').text(stateString(room.on));

      var roomString = "<span class='switch" + switchClasses(room.on) + "' data-light-colour='" + room.colour + "'></span>";
      $('#' + room.id).find('.switch').replaceWith(roomString);
    });
  };

  var toggleSwitch = function(event) {
    var btn = event.target;
    $(btn).toggleClass('active');
  };

  var toggleText = function(event) {
    var node = event.target;
    var room_id = $(node).parent().attr('id');
    var room = selectRoom(room_id);

    room.on = !room.on

    rerenderRooms();
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

  var selectRoom = function(room_id) {
    var foundRoom;
    roomsState.forEach(function(room) {
      if (room.id == room_id) {
        foundRoom = room;
      }
    });
    return foundRoom;
  };

  $.ajax({
    url: "/rooms",
    dataType: "json",
    success: getState
  });

  rooms.on({'click': toggleSwitch}, ".switch");
  rooms.on({'click': toggleText}, ".switch");
});
