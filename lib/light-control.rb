require "sinatra"
require "json"

get '/' do
  haml :index
end

get "/rooms" do
  content_type :json
  { rooms: [
    {room: "Office", state: "ON", colour: "red"},
    {room: "Porch", state: "OFF" },
    {room: "Kitchen", state: "ON", colour: "blue"},
  ] }.to_json
end
