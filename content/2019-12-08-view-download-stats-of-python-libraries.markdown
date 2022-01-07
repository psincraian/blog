---
Title: View download stats of Python libraries
Date:   2019-12-08 11:46:42 +0100
Category: blog
Tags: pepy.tech
URL: pepy.tech/2019/12/08/view-download-stats-of-python-libraries.html
SAVE_AS: pepy.tech/2019/12/08/view-download-stats-of-python-libraries.html
---
I remember when I started my project Climoji, I wanted to see how many downloads it had and if it was useful.

The problem is that data was removed from PyPI, and it isn't easy to get download stats of that project. If you want this data, you should query the data in the official download stats repository, and it is tedious. Also, if you want to add a fantastic badge like the one below, it was impossible.

To solve that problem, I created [pepy.tech](pepy.tech). It queries the official data for you, and also it generates a badge to insert into your README.md, like this one: ![Requests Downloads Badge](https://pepy.tech/badge/requests).

Now it is quite popular in the Python community, as a lot of popular libraries use this badge to display download stats. Some of these libraries are:

* Requests
* Pinject
* OpenCV
* PySampleGUI
* Masonite

Here is the number of users visiting [pepy.tech](pepy.tech) each week from the beginning of the project. Currently, the site has over 1000 weekly visitors.

![Visitors of pepy.tech until Desember of 2019]({static}/static/2019_desember_usage_of_pepy.png)

I hope this project helped the community. I will try to improve it in the future.