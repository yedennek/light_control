var SwitchBox = React.createClass({
  getInitialState: function() {
    return { rooms: [] }
  },
  loadRoomsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({rooms: data.rooms});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadRoomsFromServer();
  },
  render: function() {
    return (
      <SwitchList rooms={this.state.rooms} />
    );
  }
});

var SwitchList = React.createClass({
  render: function() {
    var switchNodes = this.props.rooms.map(function(btn) {
      return (
        <Switch room={btn.room} on={btn.on} colour={btn.colour} />
      );
    });
    return (
      <div className="rooms">
        {switchNodes}
      </div>
    );
  }
});

var Switch = React.createClass({
    getInitialState: function(){
        return {active: false};
    },
    handleClick: function(event){
      this.setState({active: !this.state.active})
    },
    render: function() {
      var activeClass = this.props.on ? 'switch active' : 'switch';
      var activeText = this.props.on? 'ON' : 'OFF';
      return (
        <div>
          <p>
            {this.props.room}
            <span className="state">{activeText}</span>
          </p>
          <span onClick={this.handleClick} className={activeClass}/>
        </div>
      );
    }
});

React.render(<SwitchBox url="/rooms" />, document.getElementById('switches'));
