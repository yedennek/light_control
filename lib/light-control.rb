require "sinatra"
require "json"

get '/' do
  haml :index
end

get "/rooms" do
  content_type :json
  { rooms: [
    {room: "Office", state: "ON", colour: "#ff0000"},
    {room: "Porch", state: "OFF" },
    {room: "Kitchen", state: "ON", colour: "#0066ff"},
  ] }.to_json
end
