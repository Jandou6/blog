import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
import TopNavComponent from '../../../components/top_nav';
const style = require('./style');

@CSSModules(style, { allowMultiple: true })
class ArticleContent extends React.Component {
  render() {
    return (
      <div className="page">
        <TopNavComponent title="最近文章" />
        <div className="article-body">
          博客重做。
          主体内容。
        </div>
      </div>
    );
  }
}

export default hot(module)(ArticleContent);