---
layout: post
title:  "How to Build A Webcrawler and Scraper for Craigslist Using Scrapy"
date:   2017-04-29 12:19:00
categories: [web scraping]
comments: true
---

When I built my Hackbright project, the biggest setback for me was obtaining data for it. When an API doesn't provide what you need, what can you do? The answer: build your own web crawler and scraper. This is where Scrapy, a framework written in Python, comes into play.

(BeautifulSoup is another commonly used web scraper, but it isn't as robust as Scrapy. I actually did a lightning tech talk on web scraping using BeautifulSoup and Scrapy, and you can [check out the slides here][slides], or keep reading for the verbose tutorial version.)

**WHAT** is a web crawler and scraper? In short, a crawler (aka spider) "crawls" or surfs the web for you, and a scraper extracts data from a particular web page. Put the two together and you can get data from multiple pages automatically and very, very quickly. It's some powerful shit.

**WHY** choose BeautifulSoup or Scrapy? The major advantage here is Python. If this is your language of choice, chances are you'll want to use BeautifulSoup or Scrapy. There are amazing tutorials out there for BeautifulSoup. In fact, it's relatively simple to use so for the remainder of this I will only be diving into how to use Scrapy. This is intended to be a beginner's guide and we'll just be scraping (haha) the surface of what Scrapy can be used for.

Helpful things to know before you get started:
- Python (and an understanding of object oriented programming and callbacks)
- CSS selectors or prefably XPATH selectors

**HOW** this is all done:

The below tutorial is a demonstration of how to use Scrapy to crawl and scrape Craigslist for available rentals on the market. If this tutorial is more than a few years old, the code may not work if the structure of the DOM structure of Criagslist has changed. This is built using Scrapy version 1.3.1 and Python 2.7.

### Objective
1. Scrape Craigslist data from the San Francisco apartment rental listings. I want to retrieve the following data for each listing:
- The unique craigslist ID
- The price
- The home attributes such as bedrooms, bathrooms, and sqft.
- The neighborhood
- The latitude and longitude location of the listing
- The date posted
2. Stream data into my PostgreSQL database directly from scraping

### Initial Setup
1. I assume you have a [virtualenv][virtualenv] setup, and you know how to activate one of those. Do that now. If not the rest of the steps should work fine, but it's highly advisable to use a virtualenv.
2. Install Scrapy.
`$ pip install scrapy`
3. Create your project and give it a name. This will create a folder for that project.
`$ scrapy startproject insert-name-of-your-project`
4. Change directory into your project folder.
`$ cd name-of-you-project-you-created-in-step-3`
5. Create your spider by giving it a name and a start URL.
`$ scrapy genspider insert-name-of-your-spider insert-url-to-start-crawling-at`

You should now have a directory folder that looks something like this:
├── project-name
│   └── project-name
│       ├── __init__.py
│       ├── __init__.pyc
│       ├── items.py
│       ├── middlewares.py
│       ├── pipelines.py
│       ├── settings.py
│       ├── settings.pyc
│       └── spiders
│           ├── __init__.py
│           ├── __init__.pyc
│           └── spider-name.py
└── scrapy.cfg

### Configure Your Spider
1. Go to your spiders folder and open spider-name.py. This is where you'll do the bulk of your crawling and scraping. The spider should define the initial request (site) to make, (optionally) how to follow the links from the initial request, and how to extract page content.
2. Here's the breakdown of what your code should look like and why:

```python

# You'll need the below modules to create your spider:
from scrapy.spiders import CrawlSpider, Spider, Request, Rule
from scrapy.linkextractors import LinkExtractor
from rent_scraper.items import SpiderNameItem  # Replace "SpiderNameItem" with the class name in your items.py.


class YourSpiderName(CrawlSpider):  # Make sure you're inheriting from the CrawlSpider class.
    
    name = 'spidername'  # This should already be filled with your spider's name.

    # Tells your spider to start crawling from this URL.
    start_urls = ['https://sfbay.craigslist.org/search/sfc/apa']

    rules = (
        # This rule extracts all links from the start URL page using the XPATH selector.
        # In this case it is only looking to extract links that are individual rental
        # posting links and not other links to ad sites or elsewhere on Craigslist.
        Rule(LinkExtractor(allow=(), restrict_xpaths=('//a[@class="result-title hdrlnk"]')), follow=True, callback='parse_item'),
        
        # This rule says to follow/do a GET request on the extracted link,
        # returning the response to the callback function,
        # which is the parse_tem() function below.
        Rule(LinkExtractor(allow=(), restrict_xpaths=('//a[contains(@class, "button next")]')), follow=True, callback='parse_item'),
    )

    def parse_item(self, response):
        """ Using XPATH, parses data from the HTML responses and returns a dictionary-like item. """

        # Specifies what an Item is; In this case it is referring to the items.py. class
        # and instantiating a dictionary for a single item (rental).
        item = SpiderNameItem()

        # In my item dictionary, insert the following values for each rental.
        # The below code uses XPATH selectors to select the specific data of interest
        # from the response of each rental link I crawl to.
        item['cl_id'] = response.xpath('//div/p[@class="postinginfo"]/text()').extract()
        item['price'] = response.xpath('//span/span[contains(@class, "price")]/text()').extract()
        item['attributes'] = response.xpath('//p[contains(@class, "attrgroup")]/span/b/text()').extract()
        item['neighborhood'] = response.xpath('//span/small/text()').extract()
        item['date'] = response.xpath('//time[contains(@class, "timeago")]/@datetime').extract_first()
        item['location'] = response.xpath('//a[contains(@href, "https://maps.google.com/")]/@href').extract()

        # Finally, once a single rental page and data has been scraped,
        # the crawler yields an iterator item that can later be called.
        yield item
```

### Configure Your Items.py
1. Go to your items.py file.
2. This file uses a dictionary-like API defined as a class to create a dictionary of the data that you collect for each item collected. In this case, each item is every unique rental listing I scrape. For each item, dictionary keys need to be created using `scrapy.Field()`.
3. Hint: You might want your keys labeled to be similar to your database columns. Here's what it might look like:

```python

import scrapy


class SpiderNameItem(scrapy.Item):

    # Dictionary keys created for scraping in craigslist.py.
    cl_id = scrapy.Field()
    price = scrapy.Field()
    attributes = scrapy.Field()
    neighborhood = scrapy.Field()
    date = scrapy.Field()
    location = scrapy.Field()

    # Additional dictionary keys created upon data cleanse in pipelines.py.
    # These were added fields because I created them later in the pipelines file,
    # and they were not collected in the initial scrape using my spider.
    # For example, the rental attributes actually contain data on bedrooms, bathrooms,
    # and sqft, but it was easier for me to scrape all that data in one chunk and
    # separate the code I used to clean up that data in my pipelines.py file.
    bedrooms = scrapy.Field()
    bathrooms = scrapy.Field()
    sqft = scrapy.Field()
    latitude = scrapy.Field()
    longitude = scrapy.Field()
    latlng = scrapy.Field()
```

### Configure Your Pipelines.py (If Needed)
Pipelines.py is pretty damn awesome. You can use this file to cleanse or validate your data, check for duplicates, and or write your data into a database/external file (like JSON or JSON Lines). It's what I call the place to put all that extra code. You can also get creative and make multiple pipelines for different spiders, etc. Below I'm streaming my data into PostgreSQL, using SQLAlchemy. Here's an example of what your code might look like:

``` python
from scrapy.exceptions import DropItem  # Module to handle bad items
# The below are optional - import all the libraries you need here
import re
import urllib
import geocoder

# This should be customized to import from your model
from model import connect_to_db_scrapy, Rental, UnitDetails


class RentScraperPipeline(object):
    """ Scrubs scraped data of whitespaces and interesting characters and returns it as a data maintenance-friendly dictionary. """

    def process_item(self, item, spider):

        # Gets Craigslist posting ID
        if item['cl_id']:
            item['cl_id'] = re.split('\s', ''.join(item['cl_id']))[2]

        # Finds rental price; if none supplied or if it's listed below $50, drop item
        if item['price']:
            price = int(re.sub('[^\d.]+', '', ''.join(item['price'])))
            if price > 50:
                item['price'] = price
            else:
                raise DropItem('Missing price in %s' % item)
        else:
            raise DropItem('Missing price in %s' % item)

        # Finds bedrooms, bathrooms, and sqft, if provided
        if item['attributes']:
            attrs = item['attributes']

            for i, attribute in enumerate(attrs):
                if "BR" in attrs[i]:
                    item['bedrooms'] = float(''.join(re.findall('\d+\.*\d*', attrs[i])))
                if "Ba" in attrs[i]:
                    item['bathrooms'] = float(''.join(re.findall('\d+\.*\d*', attrs[i])))
                if "BR" not in attrs[i] and "Ba" not in attrs[i]:
                    item['sqft'] = int(attrs[i])

        # Get neighborhood name, if provided
        if item['neighborhood']:
            item['neighborhood'] = re.sub('[^\s\w/\.]+', '', ''.join(item['neighborhood'])).rstrip().lstrip()

        # Get posting date in UTC isoformat time
        if item['date']:
            item['date'] = ''.join(item['date'])

        # Find Google maps web address; if none exists drop record
        if item['location']:
            location_url = urllib.unquote(''.join(item['location'])).decode('utf8')
            find_location = location_url.split('loc:')

            # If location on map is found convert to geolocation; if none exists drop record
            if len(find_location) > 1:
                location = find_location[1]
                geo_location = geocoder.google(location)

            # If a geocoded location exists get latitude and longitude, otherwise drop record
                if geo_location:
                    latitude = geo_location.lat
                    longitude = geo_location.lng
                    item['latitude'] = latitude
                    item['longitude'] = longitude
                    item['latlng'] = 'POINT(%s %s)' % (latitude, longitude)
                else:
                    raise DropItem('Missing geolocation in %s' % item)

            else:
                raise DropItem('Missing google maps location in %s' % item)

        else:
            raise DropItem('Missing google maps web address in %s' % item)

        return item


class PostgresqlPipeline(object):
    """ Writes data to PostgreSQL database. """

    def __init__(self):
        """ Initializes database connection. """

        self.session = connect_to_db_scrapy()


    def process_item(self, item, spider):
        """ Method used to write data to database directly from the scraper pipeline. """

        cl_id = item.get('cl_id')
        price = item.get('price')
        date = item.get('date')
        neighborhood = item.get('neighborhood')
        bedrooms = item.get('bedrooms')
        bathrooms = item.get('bathrooms')
        sqft = item.get('sqft')
        latitude = item.get('latitude')
        longitude = item.get('longitude')
        latlng = item.get('latlng')

        try:
            # Create rental details for unit
            rental_details = UnitDetails(
                                neighborhood=neighborhood,
                                bedrooms=bedrooms,
                                bathrooms=bathrooms,
                                sqft=sqft,
                                latitude=latitude,
                                longitude=longitude,
                                latlng=latlng
                            )

            # Add rental details to UnitDetails table
            self.session.add(rental_details)

            # Create rental unit
            rental = Rental(
                        cl_id=cl_id,
                        price=price,
                        date_posted=date,
                        unitdetails=rental_details
                    )

            # Add rental unit to Rental table
            self.session.add(rental)

            self.session.commit()

        except:
            # If the unit already exists in db or if data does not fit db model construct
            self.session.rollback()
            raise

        finally:
            self.session.close()
```

Phew! That's a lot of code! We're getting close. One last step...

### Connecting All The Pieces Together
1. Check out your settings.py folder.
2. I also really love the settings file. It will be your best friend. There's a lot of code that is commented out and embedded here is a lot of functionality you can play with, but all you have to configure is up to you. The following highlights what is necessary for this setup.
3. Uncomment ITEM_PIPELINES if you're using pipelines.py. List out the path and class name of the pipelines using dot notation, and put a number next to it. Conventionally, you use numbers in the hundreds, and each number represents the numerical order that Scrapy will complete each task. So in the below example, my scraper is set to 100 so it will complete before it tries to write to the database (300).

```python
ITEM_PIPELINES = {
   'rent_scraper.pipelines.RentScraperPipeline': 100,
   # 'rent_scraper.pipelines.JsonWriterPipeline': 200,  # I commented this out, but this is an example of what you could do.
   'rent_scraper.pipelines.PostgresqlPipeline': 300
}
```

### One More Thing
In your settings.py file, some very important features to pay attention to are AUTOTHROTTLE_* and CLOSESPIDER_*.
- AUTOTHROTTLE can be used to delay the speed at which the pages are scraped for data.
- CLOSESPIDER is useful if you want to automatically shut down the spider after you obtain a certain amount of data or have made a certain number of web requests. This is not included in the default build, but you can add one or both of the following example lines of code to do so:

```python
# Close Spider after number of items scraped
CLOSESPIDER_ITEMCOUNT = 5

# Close spider after number of crawled page responses have been requested
CLOSESPIDER_PAGECOUNT = 10
```

Why do you care? Well, most companies don't enjoy being bombarded by webcrawler requests and in fact many will ban you if they find out you're using up all their bandwidth. Some companies are even a little touchy-feely when it comes to (mis)using their data, so the best thing to do is to be respectful and use Scrapy responsibly. (This is intended to be an educational guide, and I am not responsible for your actions.) Scrape responsibily - with great power comes great responsibility!

That's all folks! Enjoy :)


[slides]: https://docs.google.com/presentation/d/1hfpXFTexe2CmSKzzQrqyKcoqw7QHfcwUruNwX2sDsZ0/edit?usp=sharing
[virtualenv]: https://virtualenv.pypa.io/en/stable
