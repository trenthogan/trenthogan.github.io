---
layout: post
title:  "Gulp <span>JS</span>"
subtitle:  "Minifying Css & Javascript"
date:   2013-05-05 22:41:55
categories: Javascript
image: /img/gulp.png
image-alt: Gulp Js
disqus_id: "minifying-css-and-javascript"
---


After playing around with various task runners and build tools a couple of months ago I tried out Gulp Js.
It has quickly become my favourite. The syntax for me is easier to read than Grunt Json files and it offers much more flexibility than Codekit.

Here is a basic run through on how to setup Gulp to run a few basic tasks.

To use Gulp you will need to install [Node Js](http://nodejs.org/ "Node JS"). Download the installer [here](http://nodejs.org/ "Node JS") and it will get job done for you.

You can now install Gulp. I like to install it globally so in your terminal enter:

{% highlight bash %}

npm install -g gulp

{% endhighlight %}

Now we will need to install gulp locally for your project. In your project's root directory run.

{% highlight bash %}

npm install gulp

{% endhighlight %}

Now you can create a file called: gulpfile.js and place it in your projects root dirctory. In it's most basic form your gulpfile.js could look like this:

{% highlight javascript %}

var gulp = require('gulp');

gulp.task('default', function() {
	 // place code for your default task here
});

{% endhighlight %}

This won't actually run any tasks how ever so lets add a couple of plugins so we can get things moving.

First we are going to install [gulp-minify-css.](https://www.npmjs.org/package/gulp-minify-css "Gulp Minify Css") Back into your terminal and enter:

{% highlight bash %}

npm install gulp-minify-css

{% endhighlight %}

The Node Package Manager (npm) will install the plugin for us.

After we minify our css we also want to rename the file before we save it. To do this we can grab another plugin:

{% highlight bash %}

npm install gulp-rename

{% endhighlight %}

Ok we have installed the two plugins we need to minify our css lets require them in our gulpfile.js and create a task to do the minifying.

{% highlight javascript %}
//Required
var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

//Minify Css
gulp.task('minify-css', function() {

  	gulp.src('./css/main.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./css/'))
    
});

//Default Gulp Task
gulp.task('default', ['minify-css']);

{% endhighlight %}

When requiring plugins they can be assigned to variables so we can call them again later in our code by the assigned variable names. In this case minifyCSS and rename. We can then create a gulp.task assign it a name and pass it a function to run.


In our function we will first grab the file we want the task to target. In this case we are going to target a file called main.css in the css directory of our project. We can do this with gulp.src('./css/main.css'). 

Gulp can use the Node .pipe() funtion to process data. We can use this to run our funtions for this task. 

Firstly we minify our css using .pipe(minifyCSS()) and then we use the rename plugin to save the minified css to another file with .pipe(rename('main.min.css')) so we keep our main.css file easy to work with for future development. 


Finally we can use .pipe(gulp.dest('./css/')) to save our new file we are going to save it back into the css directory here.

Ok lets set a default task for Gulp to run. Set up a task and call it default and pass a javascript array of existing task names to run as the second parameter like so gulp.task('default', ['minify-css']);

Now in the terminal in the root directory of you project enter

{% highlight bash %}

gulp

{% endhighlight %}

and all your default tasks will be run. So for us we should have a nicely minified file in the css directory of our project named main.min.css.

Well thats our css sorted but what about our javascript? We can use npm again to install another plugin gulp-uglify to take care of this for us.

{% highlight bash %}

npm install gulp-uglify

{% endhighlight %}

From here we can basically repeat the same process described above for the css to handle the js. Requiring the new plugin and creating a new function using the gulp-uglify plugin.

Our gulpfile.js should now look like this:

{% highlight javascript %}

//Required
var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

//Minify Css
gulp.task('minify-css', function() {

  	gulp.src('./css/main.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./css/'))
    
});

//Uglify Js
gulp.task('compress-js', function() {
  gulp.src('./js/script.js')
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('./js/'))
    
});

//Default Gulp Task
gulp.task('default', ['minify-css', 'compress-js']);

{% endhighlight %}


Notice I added the compress-js task to the array in the second parameter of gulp.task('default', ['minify-css', 'compress-js']);

Now run 

{% highlight bash %}

gulp

{% endhighlight %}

again and we should have some minified javascript and css.


