---
Title: Usage of Python 2
Date: 2020-01-04 18:00:00 +0100
Category: blog
Tags: python
URL: python/2020/01/04/usage-of-python-2.html
SAVE_AS: python/2020/01/04/usage-of-python-2.html
---

The main question that we want to answer in this article is that if Python 2 is still used. Then we will try to analyze the evolution of Python 2 and Python 3.

I based all the data on the downloads of packages. When you do a `pip install pytest`, this request is logged into BigQuery with the version of pip, the operating system, and the python version.

The query executed in BigQuery was the following:

```sql
SELECT
 DATE(timestamp) as date,
 details.implementation.version AS python_version,
 COUNT(*) AS downloads
FROM
 `the-psf.pypi.downloads2019*`
GROUP BY
 date, python_version
```

Then for each day, we will have the python version and the number of downloads of that version.

# Python 2 usage
At the beginning of 2019, the usage of Python 2 was having a peak of 60% of all downloads, while Python 3 was having the rest 40%.

By the end of 2019, Python 2 represented 44% of PyPi downloads. So in a year, the usage of Python 2 decreased by 15%. In the next chart, you can see the evolution week by week. 

![Usage of Python 2 and Python 3]({static}/static/2020_usage_of_python2_and_python3.svg)

Some interesting thing to notice here is that in the week number 30 of the year, that corresponds to the middle of July, for the first time Python 3 had more downloads than Python 2.

# Evolution of downloads

Now, we only now the percentages of people using Python 2 and Python 3, but we don't know if the number of downloads is increasing or decreasing.

Take a look at the following chart:

![Downloads of Python 2 and Python 3]({static}/static/2020_downloads_of_python2_and_python3.svg)

Analyzing the number of downloads, we can observe that the downloads of Python 2 are still increasing. At the beginning of 2019, 280 million packages were installed using Python 2 in a week. At the end of the same year, the number of downloads increased to 370 million downloads. Python 2 is growing like 2 million downloads per week.

Python 3 also increased the number of downloads, but at a faster pace. At the beginning of 2019, 218 million packages were installed using Python 3, and at the end, more than 500 million packages. The number of Python 3 downloads grows like 6 million per week, three times more than the growth of Python 2.

# Comments
Take into account that this data is not entirely accurate. There are a lot of factors that can vary these numbers, some of them are:

* Mirrors, there are a lot of companies having their private python repositories.
* Cache, pip and other package managers have a cache in place.
* Bots, there are bots downloading packages and increasing the number of downloads.


I hope this article was interesting :-)