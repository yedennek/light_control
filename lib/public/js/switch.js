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
