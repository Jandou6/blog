// created time is <2018-10-010/>.
// title is <react源码分析（一）>.
// tag is <[react]>.
import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
import TopNavComponent from '../../../components/top_nav';
const style = require('./style');
const code_img_1 = require('./imgs/code_1.png');
@CSSModules(style, { allowMultiple: true })
class ArticleContent extends React.Component {
  render() {
    return (
      <div className="page">
        <TopNavComponent
          title="react源码分析（一）" />
        <div className="article-body">
          <section>
            <strong>前言</strong>
            <p>为了认真学习react, 决定又一次阅读源码。之前阅读过一次，因为一开始研究的是setState工作原理，巨长无比的调用栈导致我无耐心地阅读下去。所以这次决定，从简单的入手，一步步地来，并且记录下写成博客。希望这次能成功把React摸个透吧。</p>
          </section>

          <section>
            <strong>先来一份简单的react代码</strong>
            <pre>{`
 var dom = React.createElement('div', null, 'Hello world');

 ReactDOM.render(dom,document.getElementById('root'))
            `}</pre>
            <p>以下会根据第一句代码进行分析，因为ReactDom.render会涉及到挺多的调用内容，所以第二句代码会在下一篇文章详细描述</p>
          </section>

          <section>
            <strong>React.createElement</strong>
            <p>可能很多人不会直接调用<i className="inline-code">React.createElement</i>,
              因为一般会写成jsx的语法格式：
            </p>
            <pre>
              {`var dom = function() {
  return <div>Hello world</div>
}


//or ES6

class ExampleComponent extends React.component {
  render() {
    return (<div>Hello world</div>)
  }
}
`}</pre>
            <p>
              但是毕竟jsx最终还是会通过babel转换成js才能运行，为了更容易理解React的工作原理和方便源码的理解，我将jsx的表现形式更改成用JS来书写。
            </p>
            <p>
              放一张Chrome调试<i className="inline-code">React.createElement</i>的截图，嗯:( 似乎有一定的篇幅，不喜欢的可以<b>暂时</b>跳过.（手机用户就手动滑稽了。）
            </p>
            <img src={code_img_1} alt="React.createElement code"/>
            <p>
              上述代码的意思总得来说就是构建一个<i className="inline-code">ReactElement</i>的对象，最后一句代码：
            </p>
            <pre>{`return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);`}</pre>
            <p>
              最终得到的对象结构是：
            </p>
            <pre>{`
{
  $$typeof: Symbol(react.element)
  key: null
  props: {children: "Hello world"}
  ref: null
  type: "div"
  _owner: null
  _store: {validated: false}
  _self: null
  _source: null
  __proto__: Object
}
            `}
            </pre>
            <p>因为我们的<i className="inline-code">React.createElement</i>就带了2个不为空的参数，所以得到的对象不是很复杂。值得注意的是<i className="inline-code">props</i>属性对象里面自动为我们添加了children的属性。
            所以为什么我们可以每次调用<i className="inline-code">props.children</i>不用声明也会存在。</p>
            <p>至于<i className="inline-code">key、ref</i>的挂载其实那就要慢慢去研究了，这里我就不展开。另外，<i className="inline-code">_owner,_self,_source,_store</i>这几个属性暂时不知道是用来干什么的，等以后一步步揭开的用途吧</p>
          </section>
          <section>
            <strong>结语</strong>
            <p>这一节的内容可能不多，毕竟开个头嘛。 初步看了一下<i className="inline-code">ReactDOM.rend</i>的代码，发现还是挺多内容的，希望在下星期能总结出来，哟~，这注定是一个漫长的react源码阅读过程~，晚安。</p>
          </section>
        </div>
      </div>
    );
  }
}

export default hot(module)(ArticleContent);