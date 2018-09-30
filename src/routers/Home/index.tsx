import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
const style = require('./style');
import { Link } from 'react-router-dom';
@CSSModules(style, {allowMultiple: true})
class HomeComponent extends React.Component {
  render() {
    return (
      <div styleName="home-page">
        <h1>List</h1>
        <hr/>
        <nav styleName="nav">
          <ul>
            <li>
              Home
            </li>
            <li>
            <Link to={'/about'}>About</Link>
            </li>
            <li>
              Relate
            </li>
          </ul>
        </nav>
        <hr/>
        <ul styleName="article-list">
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <li styleName="article-item" key={item}>
              <div styleName="article-content">
                <h4>文章{item}</h4>
                <time>{ this.render_date() }</time>
              </div>
          </li>
          );
        })}
        </ul>
      </div>
    );
  }

  render_date() {
    const date = new Date();
    return `${date.getFullYear()}-${ date.getMonth() + 1 }-${date.getDate()}`;
  }
}

export default hot(module)(HomeComponent);