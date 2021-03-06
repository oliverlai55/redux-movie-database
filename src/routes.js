import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsShow from './components/posts_show';
import About from './components/about';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="movie/:id" component={PostsShow} />
    <Route path="/about" component={About} />
  </Route>
);
