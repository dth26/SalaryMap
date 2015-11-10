import webapp2
import app_global
import glassdoorScraper 

class indexHandler(webapp2.RequestHandler):
    def get(self):
    	glassdoorScraper.getSalaries()
        app_global.render_template(self, 'index.html', {})