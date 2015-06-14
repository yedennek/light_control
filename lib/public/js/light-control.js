var SwitchList = React.createClass({
  getInitialState: function() {
    return { rooms: [], masterOn: true }
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
  handleMasterClick: function() {
    var oldRooms = this.state.rooms;
    var newRooms = oldRooms.map(function(r) {
      r.on = !r.on;
      this.postRoomToServer(r);
      return r;
    }, this);
    this.setState({rooms: newRooms});
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
          <MasterSwitch name="Master" active={this.state.masterOn} onButtonClick={this.handleMasterClick}/>
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
      <div className="room">
        <p className="switch-label">
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
    this.setState({masterOn: !this.props.active});
    this.props.onButtonClick();
  },
  render: function() {
    var activeClass = this.props.active ? 'master active' : 'master';
    return (
      <div className="master-switch">
        <p className="switch-label">
          Master
        </p>
        <span onClick={this.handleClick} className={activeClass}></span>
      </div>
    );
  }
});

React.render(<SwitchList url="/rooms" pollInterval={5000} />, document.getElementById('switches'));
