class RoomsState

  attr_accessor :rooms

  def initialize
    @rooms = { rooms:
               [
                 {id: "room-1", room: "Office",  on: true,    colour: "#ff0000"},
                 {id: "room-2", room: "Porch",   on: false,   colour: "#ff66ff"},
                 {id: "room-3", room: "Kitchen", on: true,    colour: "#0066ff"},
               ]
             }
  end
end
