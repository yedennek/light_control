require "sinatra"
require "json"

get '/' do
  haml :index
end

get "/rooms" do
  content_type :json
  { rooms: [
    {id: "room-1", room: "Office", on: true, colour: "#ff0000"},
    {id: "room-2", room: "Porch", on: false },
    {id: "room-3", room: "Kitchen", on: true, colour: "#0066ff"},
  ] }.to_json
end
