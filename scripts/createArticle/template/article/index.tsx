// created time is <{{date}}/>.
// title is <{{name}}>.
// tag is <[javascript, module]>.
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
         <TopNavComponent
          title="{{name}}"
          warning_content="未完成"/>
      </div>
    );
  }
}

export default hot(module)(ArticleContent);