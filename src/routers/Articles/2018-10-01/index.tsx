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
        <TopNavComponent title="JavaScript模块化的历史" />
        <div className="article-body">
          <section>
            <h2>无模块的时代</h2>
            <br></br>
            <strong>背景</strong>
            <p>过去的JS，只是单纯地操作一下表单的检测，dom的一些基本的click操作之类的. 但是，2006年，ajax的概念被提出来。“传统网页”开始转向“富客户端”的方向发展，前端JS的业务代码越来越多，代码一多，就开始出现了问题。</p>
            <strong>出现的弊端</strong>
            <ol>
              <li>全局变量过多</li>
              <li>函数名冲突，</li>
              <li>{`文件依赖关系混乱，<script/>标签需要顺序，`}</li>
            </ol>
            <strong>当时的解决方法</strong>
            <ol>
              <li>使用命名空间的方法，写成app.util.modA = xxx.(java风格的命名方法)；</li>
              <li>使用匿名自执行函数（jq的风格）</li>
            </ol>
            <pre>
              {`(function(window){
//代码

    window.jQuery = window.$ = jQuery;//通过给window添加属性而暴漏到全局
})(window);`}
            </pre>
          </section>

          <section>
            <h2>{`后端模块化的需求 & 前端模块化的萌生`}</h2>
            <br></br>
            <strong>背景</strong>
            <p>2009年，nodejs出现，促使，javascript也可以写服务端。但是服务端的代码复杂度，不等不引入模块化（我个人认为就是后端因为要处理各种网页传过来的信息，所以不等不要划分各种模块，调用不同的数据接口服务等）。所以适用于服务端的模块化的Modules/1.0被制定了。CommonJs出现了。</p>
            <strong>用法</strong>
            <pre>
              {`//math.js
exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i < l) {
        sum += args[i++];
    }
    return sum;
};`}
            </pre>
            <pre>{`//increment.js
var add = require('math').add;
exports.increment = function(val) {
    return add(val, 1);
};`}</pre>
            <pre>{`//program.js
var inc = require('increment').increment;
var a = 1;
inc(a); // 2`}</pre>
            <strong>出现的弊端</strong>
            <ol>
              <li>{`如var add = require('math').add;这一句，完成没有函数包裹的话，add将会变成全局变量。`}</li>
              <li>由于后端，获取资源模块是使用，读取本地文件磁盘或者是内存，中间消耗的时间比较少。但是在前端，资源都要重服务器拉取，每一个资源都要消耗时间，所以不会使用同步加载。总的来说，CommonJs，比较适合后端的nodejs的处理，前端的话，不适合。</li>
            </ol>
          </section>

          <section>
            <h2>AMD/RequireJs的出现</h2>
            <br></br>
            <strong>背景</strong>
            <p>正是由于上述的CommonJs不适用于前端，符合AMD规范的requirejs出现了。</p>
            <strong>作用</strong>
            <p>把CommonJs同步加载资源，变成异步加载，实现模块化。</p>
            <strong>例子</strong>
            <pre>{`//a.js
define(function(){
     console.log('a.js执行');
     return {
          hello: function(){
               console.log('hello, a.js');
          }
     }
});`}</pre>
            <pre>{`//b.js
define(function(){
     console.log('b.js执行');
     return {
          hello: function(){
               console.log('hello, b.js');
          }
     }
});`}</pre>
            <pre>{`//main.js
require(['a', 'b'], function(a, b){
     console.log('main.js执行');
     a.hello();
     $('#b').click(function(){
          b.hello();
     });
})`}</pre>
            <strong>弊端</strong>
            <ol>
              <li>预先加载，就算不用触发的资源，也会被加载进来，就如上面的b.js，没有触发按钮，也会在最开始的时候下载。造成资源浪费。</li>
              <li>当依赖很长的时候,会出现很难看的代码。</li>
            </ol>
            <pre>{`define(['a', 'b', 'c', 'd', 'e', 'f', 'g'], function(a, b, c, d, e, f, g){ ..... })`}</pre>
          </section>

          <section>
            <h2>兼容并包的CMD/seajs</h2>
            <br></br>
            <strong>背景</strong>
            <p>由于requireJs导致的不优雅，所以才会出现seajs.</p>
            <strong>好处</strong>
            <p>借鉴了Modules/Wrappings规范和requirejs。模块化的代码更为优雅。而且为了异步加载资源，使用了提供require.async API.</p>
            <strong>用法</strong>
            <pre>{`//a.js
define(function(require, exports, module){
     console.log('a.js执行');
     return {
          hello: function(){
               console.log('hello, a.js');
          }
     }
});`}</pre>
            <pre>{`//b.js
define(function(require, exports, module){
     console.log('b.js执行');
     return {
          hello: function(){
               console.log('hello, b.js');
          }
     }
});`}</pre>
            <pre>{`//main.js
define(function(require, exports, module){
     console.log('main.js执行');

     var a = require('a');
     a.hello();

     $('#b').click(function(){
          var b = require('b');
          b.hello();
     });
});`}</pre>
          </section>
          <section>
            <h2>ES6规范的模块化</h2>
            <br></br>
            <strong>背景</strong>
            <p>以上所说的，其实都可以称为“民间的规范”。随着前端模块化呼声，官方ECMA在ES6的时候制定了，JavaScript的模块化。</p>
            <strong>用法</strong>
            <p>使用export进行暴露接口。</p>
            <pre>{`//方式一, a.js
export var a = 1;
export var obj = {name: 'abc', age: 20};
export function run(){....}`}</pre>
            <pre>{`//方式二, b.js
var a = 1;
var obj = {name: 'abc', age: 20};
function run(){....}
export {a, obj, run}`}</pre>
            <pre>{`//使用import进行调用
import { run } from  'a'
run();`}</pre>
            <strong>好处</strong>
            <p>代码优雅，简洁，易读性很强。</p>
            <strong>缺点</strong>
            <p>现代浏览器的兼用问题，要支持ES6的浏览器，才能使用。</p>
            <strong>解决方法</strong>
            <p>使用babel 讲ES6的代码转成ES5。</p>
          </section>
        </div>
      </div>
    );
  }
}

export default hot(module)(ArticleContent);