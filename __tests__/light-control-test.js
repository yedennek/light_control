jest.dontMock('../lib/public/js/switch.js');

describe('Switch', function(){
  it('changes the text after click', function() {
    var React = require('react/addons');
    var Switch = require('../lib/public/js/switch.js');
    var TestUtils = React.addons.TestUtils;

    var light_switch = TestUtils.renderIntoDocument(
      <Switch/>
    );

    var label = TestUtils.findRenderedDOMComponentWithClass(
        light_switch, 'switch-label');
    expect(label.getDOMNode().textContent).toEqual(' OFF');

    var input = TestUtils.findRenderedDOMComponentWithClass(
        light_switch, 'room');
    TestUtils.Simulate.click(input);
    expect(label.getDOMNode().textContent).toEqual(' ON');
  });
});
