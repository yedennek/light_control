require "sinatra"
require "json"
require_relative "rooms_state"

before do
  @rooms_state = RoomsState.new
end

get '/' do
  haml :index
end

get "/rooms" do
  content_type :json
  @rooms_state.rooms.to_json
end

patch "/rooms" do
  request.body.rewind
  data = JSON.parse request.body.read
  @rooms_state.rooms = { rooms: data }
end
