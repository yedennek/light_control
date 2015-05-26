var SwitchBox = React.createClass({});

var SwitchList = React.createClass({
  render: function() {
    var switchNodes = this.props.data.map(function (switch) {
      return (
        <Switch >
        //TODO: Make switch classes etc what they need to be
        </Switch>
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
      var activeClass = this.state.active ? 'switch active' : 'switch';
      return <span onClick={this.handleClick} className={activeClass}></span>;
    }
});

React.render(<Switch name="room" />, document.getElementById('switches'));
