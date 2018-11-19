// created time is <2018-11-19/>.
// title is <react源码分析（二）———— ReactDOM.render>.
// tag is <[react]>.
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
          title="react源码分析（二）———— ReactDOM.render" />
        <div className="article-body">
          <section>
            <h4>放一张ReactDom.render的调用栈截图， 镇压一下</h4>
            <br />
            <img src={require('./imgs/codeStack.png')} alt="reactdom.render stack" />
            <p>数不清的调用栈，看着就有点可怕咯。。。好吧，现在我们一步步揭开他的面目。</p>
          </section>
          <section>
            <h4>在开始分析<i className="inline-code">ReactDOM.render</i>的一些声明</h4>
            <ol>
              <li>
                <p>一下内容仅仅代表我个人的想法，错误之处希望能给我指出，可以通过github提issues的方式进行互动 </p>
                <p>issues地址：
                  <a target="_brank" href="https://github.com/Jandou6/blog/issues">https://github.com/Jandou6/blog/issues</a>
                </p>
              </li>
              <li>
                <p>为了更加减少干扰，更快地理解代码, 会跳过__DEV__的代码。</p>
                <p>为了不让整篇文章都是代码，在此声明一下，下面贴出来的代码照片都是我认为的关键函数的代码，代码细节请查看调用栈。</p>
              </li>
            </ol>
            <p>这里一开始我是打算先绕过react.fiber然后去看ReactDOM.render的代码，但是看完render的代码发现。
根本不能先绕过ReactFiber, reactFiber在整个render, 都是一个类似基础的组成元素。我们先聊聊fiber吧~</p>
          </section>
          <div styleName="img-wrap">
            <img src={require('./imgs/fiber.png')}></img>
          </div>
          <section>
            <h4>Fiber的属性有点多，下面我们来解析几个重要的属性</h4>
            <ol>
              <li>
                <p>reture</p>
                <p>返回当前fiberNode的父节点</p>
              </li>
              <li>
                <p>updateQueue</p>
                <p>存放着要更新的内容</p>
              </li>
              <li>
                <p>alternate</p>
                <p>指向一个未来用来替换的fiberNode, 新的fiber会放在这里,他是一个循环结构体，alternate里面的</p>
              </li>
            </ol>
            <p>建议先看看<a href="https://www.youtube.com/watch?v=ZCuYPiUIONs" target="_brank"> Lin Clark - A Cartoon Intro to Fiber - React Conf 2017 </a>(需要翻墙)</p>
            <div styleName="img-wrap">
              <img src={require('./imgs/cartoonFiber.png')}></img>
            </div>
            <p>解析一下整个过程：workInProgress其实就是Fiber里面的alternate</p>
          </section>
          <h4>render总体流程</h4>
          <div styleName="img-wrap">
            <img src={require('./imgs/ReactDOM.render.png')}></img>
          </div>
          <p>
            这里说明一下，ReactDOM.render是首先经过prefrom阶段创造fiberRoot，然后通过renderRoot计算出整个fiberRoot结构(补充子节点，兄弟节点，等待更新的内容等，可以看做是创造一个虚拟DOM结构)，再通过completeRoot，把fiberRoot里面的内容映射到DOM上面。
            </p>
          <section>
            <img src={require('./imgs/legacyRenderSubtreeIntoContainer.png')} alt="legacyRenderSubtreeIntoContainer" />
            <p><strong>legacyRenderSubtreeIntoContainer</strong></p>
            <p>第一部分：作用是创建并初始化一个reactRoot，然后把整个reactRoot绑定在DOM节点的_reactRootContainer上。reactRoot上整个虚拟DOM的根节点</p>
            <p>第二部分：进入计算阶段，因为初始化reactRoot并没有根据组件的内容进行赋值，接下来的很长一部分都是为了补全reactRoot</p>
            <p>下图为reactRoot的属性</p>
            <img src={require('./imgs/ReactRoot.png')}></img>
          </section>

          <section>
            <p><strong>scheduleRootUpdate</strong></p>
            <p>该函数的主要作用是，把要更新的内容放在reactRoot.current.updateQueue里面</p>
            <div styleName="img-wrap">
              <img src={require('./imgs/updateQueue.png')} alt="updateQueue"></img>
            </div>
            <br></br>
            <img src={require('./imgs/scheduleRootUpdate.png')} alt="scheduleRootUpdate" />
            <p>第一部分： 创建更新内容，把上一章说到的内容 <a href="/article_2018_10_10" target="_brank">react源码分析（一）</a> ReactElement用上，放在payloa里面</p>
            <div styleName="img-wrap">
              <img src={require('./imgs/updateObj.png')} alt="updateObj" />
            </div>
            <p>第二部分：enqueueUpdate就是把 update 放在reactRoot.current.updateQueue里面，然后继续计算reactRoot</p>
          </section>

          <section>
            <p><strong>performWorkOnRoot</strong></p>
            <p>这是一个很长的函数, 但是我们可以先关注<strong>同步部分</strong></p>
            <img src={require('./imgs/performWorkOnRoot.png')} alt="performWorkOnRoot" />
            <p>第一部分： 到completeRoot阶段的时候reactRoot已经收集好要更新的“材料”了，现在他要做的就是把这些“材料”，整理放在finishedWork里面，到了构建workInProgress的时候了！也就是reactRoot.current.alternate这部分</p>
            <p>就是下面图片，<span style={{ color: 'blue' }}>蓝色部分</span></p>
            <div styleName="img-wrap">
              <img src={require('./imgs/cartoonFiber.png')} alt="cartoonFiber"></img>
            </div>
            <p>第二部分：将整理好的finishedWork,映射到真实DOM节点上</p>

            <p>这两部分比较重要，它们的展开计划在这个星期内整理出来，因为这两部分涉及到的内容会比较多，所以分别整理成两篇文章。</p>
          </section>

          <section>
            <h4>总结：</h4>
            <p>上述知识描述了render的大概结构，还没进行深入。
              预计一个星期后会更新completeRoot阶段和renderRoot到真实DOM阶段。
              因为react的异步渲染还没正式发布的原因，而且也为了不让一开始阅读源码不那么难，所以后面有时间再深入。
              如果上述文章有错误的欢迎指出，会马上纠正。如果有什么建议也欢迎提出来。
            </p>
            <p>issues地址：
              <a target="_brank" href="https://github.com/Jandou6/blog/issues">https://github.com/Jandou6/blog/issues</a>
            </p>
          </section>

          <section>
            <strong>参考内容</strong>
            <ul>
              <li><a target="_blank" href="https://github.com/facebook/react">react 代码</a></li>
              <li><a target="_blank" href="https://www.youtube.com/watch?v=ZCuYPiUIONs">A Cartoon Intro to Fiber ( https://www.youtube.com/watch?v=ZCuYPiUIONs )</a></li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default hot(module)(ArticleContent);