import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
const style = require('./style');

interface TopNavProps {
  title:string;
}
@CSSModules(style, { allowMultiple: true })
class TopNavComponent extends React.Component<TopNavProps, {}> {
  render() {
    return (
      <>
        <h1>Jandou's Blog For FrontEnd</h1>
        <hr />
        <nav styleName="nav">
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              Relate
            </li>
          </ul>
        </nav>
        <h3>{this.props.title}</h3>
        <hr style={{ borderTop: '2px solid #000' }} />
      </>
    );
  }
}

export default hot(module)(TopNavComponent);