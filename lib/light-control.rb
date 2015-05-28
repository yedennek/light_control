require "sinatra"
require "json"

rooms = { rooms:
    [
      {id: "room-1", room: "Office",  on: true,    colour: "#ff0000"},
      {id: "room-2", room: "Porch",   on: false,   colour: "#ff66ff"},
      {id: "room-3", room: "Kitchen", on: true,    colour: "#0066ff"},
    ]
  }

get '/' do
  haml :index
end

get "/rooms" do
  content_type :json
  rooms.to_json
end

post "/rooms" do
  request.body.rewind
  rooms[:rooms].each do |room|
    room[:on] = params[:on] if room[:room] == params[:room]
  end
  rooms.to_json
end
