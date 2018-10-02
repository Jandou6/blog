import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
const style = require('./style');

@CSSModules(style, { allowMultiple: true })
class WarningComponent extends React.Component {
  render() {
    return (
      <>
        <div styleName="waring-wrap">{ this.props.children }</div>
      </>
    );
  }
}

export default hot(module)(WarningComponent);