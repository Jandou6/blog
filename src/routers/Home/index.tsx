import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
import TopNavComponent from '../../components/top_nav';
import { Link } from 'react-router-dom';
import { article_list } from '../Articles';
const style = require('./style');

@CSSModules(style, { allowMultiple: true })
class HomeComponent extends React.Component {
  render() {
    return (
      <div className="page" styleName="home-page" >
        <TopNavComponent title="最近文章" />
        <ul styleName="article-list">
          {article_list.map((item) => {
            return (
              <li styleName="article-item" key={item.title}>
                <Link to={ item.link }>
                  <div styleName="article-content">
                    <h4>{item.title}</h4>
                    <time>{this.render_date(item.date)}</time>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render_date(date:Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}

export default hot(module)(HomeComponent);