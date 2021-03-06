import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
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
const article_2018_10_03 = Loadable({
  loader: () => import('./Articles/2018-10-03' /* webpackChunkName:"article_2018_10_03" */),
  loading: loadingComponent,
});
const article_2018_10_10 = Loadable({
  loader: () => import('./Articles/2018-10-10' /* webpackChunkName:"article_2018_10_10" */),
  loading: loadingComponent,
});

const article_2018_11_19 = Loadable({
  loader: () => import('./Articles/2018-11-19' /* webpackChunkName:"article_2018_11_19" */),
  loading: loadingComponent,
});

// append article.

export class RouterComp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/about" component={AboutComponent} />
          <Route exact path="/article_2018_10_01" component={article_2018_10_01} />
          <Route exact path="/article_2018_10_03" component={article_2018_10_03} />
          <Route exact path="/article_2018_10_10" component={article_2018_10_10} />
          <Route exact path="/article_2018_11_19" component={article_2018_11_19} />
        </Switch>
      </Router>
    );
  }
}

export const RouterCompnent = hot(module)(RouterComp);