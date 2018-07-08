---
layout: post
title:  "React <span>Code Splitting</span>"
subtitle:  "With React Loadable"
date:   2018-07-07 20:41:55
categories: Javascript
image: /img/react.png
image-alt: React Js
disqus_id: "minifying-css-and-javascript"
---

I have been working on some large complex React based applications for the last while. It's been awesome. Although as per modern Javascript single page applications.
Javascript bundles get big and loading gets slow.

That where code splitting comes in. This is something webpack does out of the box. See [Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/ "Webpack Code Splitting"). Webpack has a few ways to handle this. I will go over the ways I used below.

So the first thing I wanted to do was split out all the third party libraries from my node modules folder. Chances are this code doesn't get updated as much as your actual application code. And if you ship it as a separate file it can be cached and the user only has to download our application code again when we ship updates which don't add or change dependencies.

To do this I set about using the [Webpack CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/ "Webpack CommonsChunkPlugin") it's a webpack feature which is designed for this purpose. 

In your `webpack.config` plugins array: `plugins: []` you can declare a `new webpack.optimize.CommonsChunkPlugin()` and pass it some configuration.

{% highlight javascript %}
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor', // filename = "vendor.js"
  minChunks: ({ resource }) => {
    return (
      resource &&
      resource.match(/\.(js|png|json)$/) &&
      resource.indexOf('node_modules') >= 0
    );
  }
});
{% endhighlight %}

Here is how my code ended up looking. `name: 'vendor'` was the name of the file that will end up containing all our common libraries code. The function passed to minChunks will tell it to look in the `node_modules` folder for `.js`, `.png` and `.json` files and add them to the file.

Alright we now have two files and can cache the third party libraries great! My main javascript file had turned from one `700kb` file when gzipped into a `400kb` vendor file and a `300kb` main file containing my application code happy days.

But when a user loads the dashboard of my application they don't actually need all of that application code. This is where a library called [react-loadable](https://github.com/jamiebuilds/react-loadable "react-loadable")  and a little bit of webpack magic come into play.

So we can start by installing `react-loadable` either `yarn add react-loadable` or `npm i react-loadable --save` depending on your flavour.

Webpack 2+ will let you code split modules by importing them like `import('./Foo/Bar')`. But how do we tell react when we need to load these modules. That's what React Loadable will do for us.

Lets say you had a React application that looked something like this:

{% highlight javascript %}
import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav';
import Foo from './pages/Foo';
import Bar from './pages/Bar';

export default class App extends Component {
  render() {
    <div>
      <Nav />
      <div>
        <Route path="/foo" component={Foo} />
        <Route path="/bar" component={Bar} />
      </div>
    </div>;
  }
}
{% endhighlight %}

We can use React Loadable to know when to load the components for our routes like so:

{% highlight javascript %}
import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Nav from './Nav';
import Loader from './Loader';

// Code Splitting with react-loadable
const Foo = Loadable({
  loader: () => import('./pages/Foo'),
  loading() {
    return <Loader />;
  }
});
const Bar = Loadable({
  loader: () => import('./pages/Bar'),
  loading() {
    return <Loader />;
  }
});

export default class App extends Component {
  render() {
    <div>
      <Nav />
      <div>
        <Route path="/foo" component={Foo} />
        <Route path="/bar" component={Bar} />
      </div>
    </div>;
  }
}
{% endhighlight %}


So what we have done is change the `Foo` and `Bar` components to be imported via `import()` so webpack will know to split them into their own chunks.
We have done this in the `Loadable` Higer order component so React Loadable will know know when they are needed and download the chunks. 
The `<Loader />` compoent is what will get displayed while the chunk is downloaded. 

It's pretty awesome and makes something that could be really tricky pretty straight foward. Have fun seeing how best you can optimize your application.

