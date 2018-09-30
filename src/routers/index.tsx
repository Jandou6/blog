import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import '../assets/css/base';
import { hot } from 'react-hot-loader';

import * as Loadable from 'react-loadable';

const loadingComponent = () => (<div>Loading....</div>);

const HomeComponent = Loadable({
  loader: () => import('./Home' /* webpackChunkName:"home" */),
  loading: loadingComponent,
});

const AboutComponent = Loadable({
  loader: () => import('./About' /* webpackChunkName:"about" */),
  loading: loadingComponent,
});

const article_2018_10_01 = Loadable({
  loader: () => import('./Articles/2018-10-01' /* webpackChunkName:"article_2018_10_01" */),
  loading: loadingComponent,
});

export class RouterComp extends React.Component {
  render() {
    return (
      <div className="web-size">
        <Router>
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route exact path="/article_2018_10_01" component={article_2018_10_01} />
          </Switch>
        </Router>
      </div>

    );
  }
}

export const RouterCompnent = hot(module)(RouterComp);