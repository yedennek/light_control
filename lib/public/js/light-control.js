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
  handlePartyClick: function(room) {
    alert("Party!");
  },
  handleMasterClick: function(room) {
    alert("Turning off!");
  },
  render: function() {
    var switchNodes = this.state.rooms.map(function(btn) {
      return (
        <Switch key={btn.id} room={btn.room} on={btn.on} colour={btn.colour} onButtonClick={this.handleButtonClick}/>
      );
    }, this);
    return (
      <div>
        <div className="masters">
          <MasterSwitch name="Master" on={false} onButtonClick={this.handleMasterClick}/>
          <MasterSwitch name="Party" on={false} onButtonClick={this.handlePartyClick}/>
        </div>
        <div className="rooms">
          {switchNodes}
        </div>
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

var MasterSwitch = React.createClass({
  handleClick: function(event){
    this.props.onButtonClick({room: this.props.room, on: !this.props.on});
  },
  render: function() {
    var activeClass = this.props.on ? 'switch active' : 'switch';
    var colour = this.props.on? this.props.colour : '#fff';
    return (
      <span onClick={this.handleClick} className={activeClass}>{this.props.name}</span>
    );
  }
});

React.render(<SwitchList url="/rooms" pollInterval={5000} />, document.getElementById('switches'));
