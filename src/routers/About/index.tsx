import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
const style = require('./style');
import TopNavComponent from '../../components/top_nav';
@CSSModules(style, {allowMultiple: true})
class AboutComponent extends React.Component {
  render() {
    return (
      <div styleName="about-page">
        <TopNavComponent title="About ME"/>
        <ul styleName="info-wrap">
          <li>
            <h4>github:</h4> <a href="https://github.com/Jandou6" target="_brank">https://github.com/Jandou6</a>
          </li>
          <li>
            <h4>ISSUES:</h4>
            <a href="https://github.com/Jandou6/blog/issues"  target="_brank">https://github.com/Jandou6/blog/issues</a>
          </li>
        </ul>
      </div>
    );
  }
}
export default hot(module)(AboutComponent);