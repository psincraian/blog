---
Title: pepy.tech architecture
Date: 2022-10-06 08:00:00 +0100
Category: blog
Tags: python,pepy
---

<center><img src="{static}/static/pepy-architecture.png" alt="pepy.tech architecture" width="60%"/></center>

Hey! In this blog post, we'll explain the pepy.tech architecture and show you all the pieces that make pepy.tech work.

The infrastructure of pepy.tech is simple. We want to maintain it simple to reduce costs and improve maintainability. In the next subsections, you can find all the components that we use.

## DNS
A Domain Name Service or DNS is a service that its main responsibility is to map domain names, like pepy.tech or api.pepy.tech, to server IP addresses. We use Cloudflare as our DNS.

## CDN
A Content Delivery Network or CDN is a service that is used to distribute content. We mainly use it to cache static content like images or JavaScript files and distribute them more easily to the users.

In our case, almost 70% of the requests are served by the CDN! This takes a lot of pressure off from the backend servers.

## Backend server
The backend server is the piece of the software that provides all the answers to the client, like the download stats. Also, the backend is in charge to update the downloads daily. The backend mainly runs all the Python code that you can see in [our repository](https://github.com/psincraian/pepy).

The servers are provided by DigitalOcean, and it has only 1 vCPU and 1 GB of RAM. With this small server, we serve all the requests to the world! 

## Database
Our database is a MongoDB database. This is also a server provided by DigitalOcean, in this case it has 1 vCPU and 2 GB of RAM. 

## Database volume
The data of the database is stored in a DigitalOcean Volume. This volume is only a disk that can be easily scalable. So if the data that we store grows, we can easily add more capacity to it.

## BigQuery
This service is a service provided by Google, and it’s mainly a database that can work with huge number of data. All the PyPi download stats are stored there. We use this service to analyze and extract the data.

## NewRelic

NewRelic is a service that helps us monitor all of our services. Here we have all the metrics, like CPU usage, disk usage, etc. We have some alerts that some of this metrics are not correct, we get alerted.


Hopefully, you got an idea of what services do we use in pepy.tech. If you have any question, contact me on twitter @psincraian.


Help us mantaining the project live:

👉 Star our repo  <a class="github-button" href="https://github.com/psincraian/pepy" data-icon="octicon-star" data-show-count="true" aria-label="Star psincraian/pepy on GitHub">Star</a> 

👉 Sponsor us <a class="github-button" href="https://github.com/sponsors/psincraian" data-icon="octicon-heart" aria-label="Sponsor @psincraian on GitHub">Sponsor</a>


<script async defer src="https://buttons.github.io/buttons.js"></script>
<script async defer src="https://buttons.github.io/buttons.js"></script>
