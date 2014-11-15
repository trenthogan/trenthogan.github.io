---
layout: post
title:  "MYSQL And The<span>Command Line</span>"
subtitle:  "A Few Simple Commands"
date:   2013-07-21 22:41:55
categories: Mysql
disqus_id: "mysql-in-the-command-line"
---

Lately I have been trying to do more of my database work from the command line instead of using tools like phpmyadmin or MySQL Workbench. Although I mainly enjoy frontend development sometimes it is nice to think databases...

I decided to list out a few simple commands to help me commit them to memory and also help anyone else who may stumble accross this.

**Open MySql in terminal - For Mac Using MAMP**

{% highlight bash %}

/Applications/MAMP/Library/bin/mysql -uroot -p

{% endhighlight %}

This command will fire up the Mamp Mysql Command line socket your a mac. You might have to adjust the path if your system is setup differently. 

Remeber to make sure Mysql is running on your version of Mamp before you do this.


**List All Databases**

{% highlight bash %}

show databases;

{% endhighlight %}

Will do just what it says and will show you a list of all the databases on your server.


**Select A Database**

{% highlight bash %}

use your_database_name_here;

{% endhighlight %}

Will select whatever database you specify.


**View Tables**

{% highlight bash %}

show tables;

{% endhighlight %}

Will show all the tables in your selected database.


**View Database Structure**

{% highlight bash %}

desc your_table_name_here;

{% endhighlight %}

This shows the tables structure along with primary keys etc.


**Create Database**

{% highlight bash %}

create database your_database_name_here;

{% endhighlight %}

Does just what it says :) 


**Import Sql file**

{% highlight bash %}

source /Path/to/your-sql-file.sql;

{% endhighlight %}

Just set your path and filename and you are away.
