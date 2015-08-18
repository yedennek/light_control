require "sinatra"
require "json"
require "milight"

get '/' do
  haml :index
end

get "/rooms" do
  content_type :json
  lights = JSON.load File.new(File.dirname(__FILE__) + "/db/room_state.json")
  lights.to_json
end

post "/rooms" do
  lights = JSON.load File.new(File.dirname(__FILE__) + "/db/room_state.json")

  lights_controller = Milight::Controller.new '192.168.0.10'
  lights_controller.group(1).on

  lights["rooms"].each do |room|
    on = params[:on] == "true" ? true : false
    room["on"] = on if room["room"] == params[:room]
  end

  File.open(File.dirname(__FILE__) + "/db/room_state.json", "w") do |f|
    f.write(lights.to_json)
  end
  lights.to_json
end
