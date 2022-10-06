AUTHOR = 'Petru Rares Sincraian'
SITENAME = "Petru's blog"
SITEURL = ''

PATH = 'content'
THEME = 'themes/current'

TIMEZONE = 'Europe/Madrid'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

STATIC_PATHS = ['static']
EXTRA_PATH_METADATA = {'static/favicon.ico': {'path': 'favicon.ico'},}


# Blogroll
LINKS = (('pepy.tech', 'https://pepy.tech/'),)

# Social widget
SOCIAL = (('Twitter', 'https://twitter.com/psincraian'),)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True