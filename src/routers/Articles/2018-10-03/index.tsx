// created time is <2018-10-03/>.
// title is <React的服务器渲染（SSR）和预渲染（Pre-render）>.
// tag is <[react,ssr, pre-render]>.
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
          title="React的服务器渲染（SSR）和预渲染（Pre-render）"
          warning_content="未完成"/>
        <div className="article-body">
          <section>
            <strong>服务器渲染和预渲染都有相同的目的：</strong>
            <ol>
              <li>加速浏览器显示页面的速度， 减少白屏时间。</li>
              <li>针对（搜索引擎对HTML）SEO进行处理</li>
            </ol>
          </section>
          <section>
            <strong>SSR与Pre-render的区别：</strong>
            <ol>
              <li>SSR的数据是动态数据，适合根据数据要动态改变网站内容的网站，如购物网站，新闻网站。</li>
              <li>预渲染数据是静态的，适合工具类网站，如Prossone, 脑图，在线office.</li>
            </ol>
            <strong>但是SSR有一个些的缺点，</strong>
            <ol>
              <li>服务器负载大</li>
              <li>前后端耦合</li>
            </ol>
            但是说是缺点，更多的是对前端工程师的技术的要求提高了。使用服务端渲染的话，使用缓存减少服务器的负载。
        </section>

        <section>
          <strong>预渲染的实现：</strong>
        </section>
        <section>
          <strong>SSR实现：</strong>
        </section>
        </div>
      </div>
    );
  }
}

export default hot(module)(ArticleContent);