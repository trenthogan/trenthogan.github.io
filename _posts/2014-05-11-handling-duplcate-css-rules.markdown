---
layout: post
title:  "CSS<span>CSS</span>"
subtitle:  "Handling Duplicating Css Rules"
date:   2013-05-11 22:22:55
categories: css
disqus_id: "handling-duplcate-css-rules"
---

What is csscss? It's [Github Pages Reference](http://zmoazeni.github.io/csscss/ "CSSCSS") refers to it as "A CSS redundancy analyzer that analyzes redundancy." Basically it is a Ruby Gem which can find duplicating rules in your css or sass files and help you to write cleaner more maintainable css.

To install as of the 11th of May 2014 you will need Ruby 1.9 or greater installed on your system. 
Fire up your terminal and install the gem.

{% highlight bash %}

gem install csscss

{% endhighlight %}

If you want to test a sass file you will also need to install sass.

{% highlight bash %}

gem install sass

{% endhighlight %}

Just for testing lets create a css or sass file. I'm going to call mine test.scss and will add two duplcating sets of rules to the file so it looks like this.

{% highlight css %}

.test-selector{

	font-family: sans-serif;
	font-size: 2em;
	margin: 2em 0;

}

.test-selector-2{

	font-family: sans-serif;
	font-size: 2em;
	margin: 2em 0;

}

{% endhighlight %}

Ok now lets run Csscss on this file and see what happens.

{% highlight bash %}

csscss path/to/test.scss

{% endhighlight %}

Your terminal should display.

{% highlight bash %}

{.test-selector} AND {.test-selector-2} share 3 rules

{% endhighlight %}

If you would like Csscss to tell you what the conflicting rules are you can run it in verbose mode.

{% highlight bash %}

csscss -v path/to/test.scss

{% endhighlight %}

And the output should now be.

{% highlight bash %}

{.test-selector} AND {.test-selector-2} share 3 rules
  - font-family: sans-serif
  - font-size: 2em
  - margin: 2em 0

{% endhighlight %}

Over on [Css Tricks](http://css-tricks.com/csscss/ "Css Tricks Csscss") it is recommended if you have 5 or more conflicting rules it maybe time to look at optimization. I think this sounds like a pretty good rule. 

Also knowing that the duplicating rules exist can help you to write better css in the future. This could be a great tool to come back and optimize legacy code or code you may have inherited from another developer etc.

For more info on csscss such as how to use with Less etc check it out [here](http://zmoazeni.github.io/csscss/ "CSSCSS")

