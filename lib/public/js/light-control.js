var SwitchList = React.createClass({
  getInitialState: function() {
    return { rooms: [] }
  },
  loadRoomsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({rooms: data.rooms});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  postRoomToServer: function(room){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: room,
      success: function(data){
        console.log(data.rooms);
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadRoomsFromServer();
    setInterval(this.loadRoomsFromServer, this.props.pollInterval);
  },
  handleButtonClick: function(room) {
    var oldRooms = this.state.rooms;
    $.each(oldRooms, function() {
      if(this.room == room.room){
        this.on = room.on;
      }
    });
    this.setState({rooms: oldRooms});
    this.postRoomToServer(room);
  },
  render: function() {
    var switchNodes = this.state.rooms.map(function(btn) {
      return (
        <Switch room={btn.room} on={btn.on} colour={btn.colour} onButtonClick={this.handleButtonClick}/>
      );
    }, this);
    return (
      <div className="rooms">
        {switchNodes}
      </div>
    );
  }
});

var Switch = React.createClass({
  handleClick: function(event){
    this.props.onButtonClick({room: this.props.room, on: !this.props.on});
  },
  render: function() {
    var activeClass = this.props.on ? 'switch active' : 'switch';
    var activeText = this.props.on? 'ON' : 'OFF';
    var colour = this.props.on? this.props.colour : '#fff';
    var btnStyle = {background: colour}
    return (
      <div>
        <p>
          {this.props.room}
          <span className="state"> {activeText}</span>
        </p>
        <span onClick={this.handleClick} className={activeClass} style={btnStyle}/>
      </div>
    );
  }
});

React.render(<SwitchList url="/rooms" pollInterval={5000} />, document.getElementById('switches'));
