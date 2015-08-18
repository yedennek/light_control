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
