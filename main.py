
import webapp2
import app_global
import indexController
import glassdoorScraper
import urllib2


app = webapp2.WSGIApplication([
    ('/', indexController.indexHandler),
    ('/scrapeGlassdoor', glassdoorScraper.testRequests)
], debug=True)
