---
Title: Most popular python packages in November 2019
Date:   2019-12-14 20:00:00 +0100
Category: blog
Tags: python packages stats
URL: python/packages/stats/2019/12/14/most-popular-python-packages-in-november-2019.html
SAVE_AS: python/packages/stats/2019/12/14/most-popular-python-packages-in-november-2019.html
---

I want to start to promote new and exciting python packages. To do so, I started this series of posts about the most popular Python packages of the previous month.

The idea is to select all the packages that had over one thousand downloads in the past two months and in the previous month experienced a significant increase in downloads.

Here is the list of this month:

1. [seleniumbase](https://pepy.tech/project/seleniumbase) is a library that combines Selenium Webdriver and pytest with the result of doing end to end tests, web automation, and website tours.
2. [pyhull](https://pepy.tech/project/pyhull) is a Python wrapper to Qhull for the computation of the convex hull, Delaunay triangulation, and Voronoi diagram.
3. [protego](https://pepy.tech/project/protego) is a pure-Python robots.txt parser with support for modern conventions.
4. [cupy-cuda100](https://pepy.tech/project/cupy-cuda100) is an implementation of NumPy-compatible multi-dimensional array on CUDA.
5. [sigopt](https://pepy.tech/project/sigopt) is a standardized, scalable, enterprise-grade optimization platform and API designed to unlock the potential of your modeling pipelines.
6. [readerwriterlock](https://pepy.tech/project/readerwriterlock) is a python implementation of the three Reader-Writer problems. It is also compliant with the Python lock interface.
7. [manhole](https://pepy.tech/project/manhole) is an in-process service that accepts Unix domain socket connections and presents the stacktraces for all threads and an interactive prompt.
8. [scikit-build](https://pepy.tech/project/scikit-build) is an improved build system generator for CPython C, C++, Cython, and Fortran extensions.
9. [bok-choy](https://pepy.tech/project/bok-choy) is a Python framework for writing robust Selenium tests.
10. [pymeeus](https://pepy.tech/project/pymeeus) is a Python implementation of Jean Meeus astronomical routines


Here is the full data:

|name|d. october|d. november|increase|
|----|----------|-----------|--------|
|seleniumbase| 52,478| 848,859|0.884|
|pyhull| 10,250| 119,192|0.842|
|protego| 11,427| 115,009|0.819|
|cupy-cuda100| 19,551| 185,499|0.809|
|sigopt| 16,359| 124,764|0.768|
|readerwriterlock| 19,604| 128,759|0.736|
|manhole| 19,803| 126,763|0.730|
|scikit-build| 22,141| 137,848|0.723|
|bok-choy| 10,472|59,126|0.699|
|pymeeus| 72,664| 400,360|0.693|

And here is the query that that I executed: 
```sql
select
 nd.name,
 od.total as "d. october",
 nd.total as "d. november",
 round((nd.total - od.total)/(nd.total + od.total)::numeric, 3) as increase
from
 november_downloads nd
join october_downloads od on
 od."name" = nd."name"
where
 od.total > 10000
order by
 (nd.total - od.total)/(nd.total + od.total)::float desc
limit 10
```