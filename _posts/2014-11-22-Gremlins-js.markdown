---
layout: post
title:  "Gremlins <span>JS</span>"
subtitle:  "Monkey testing with Javascript"
date:   2016-11-22 10:41:55
categories: Javascript
disqus_id: "gremlins-javascript"
---

So for a for a Dev Monday project ( Every second Monday at my work Developers can work on a project they think will benefit the company and tech stack. ) I decided to test the Angular Js application had been working on using [Gremlins.js](https://github.com/marmelab/gremlins.js/blob/master/README.md "Gremlins.js"). This library will test your UI for error's by generating random user input and collecting the results.

Below I will document my journey.

So I am starting off by including gremlins.js as a dependancy of my project. We are using [Yarn](https://yarnpkg.com/ "Yarn") so:

{% highlight bash %}

yarn add --dev gremlins.js

{% endhighlight %}

If you were using npm you would do a :

{% highlight bash %}

npm install gremlins.js --save-dev

{% endhighlight %}
