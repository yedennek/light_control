var Switch = React.createClass({
  getInitialState: function() {
    return { isOn: false };
  },
  handleClick: function(event){
    this.setState({isOn: !this.state.isOn});
  },
  render: function() {
    var activeText = this.state.isOn? 'ON' : 'OFF';
    return (
      <div className="room" onClick={this.handleClick}>
        <p className="switch-label">
          {activeText}
        </p>
      </div>
    );
  }
});

