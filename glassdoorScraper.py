import webapp2
import app_global

import sys
sys.path.insert(0, 'lib')
from bs4 import BeautifulSoup
import requests
import mechanize
import urllib2


class getSalaries(webapp2.RequestHandler):

	# required by glassdoor URL
	# urlLocatorStr = {
	# 	'Philadelphia': '_IM676_KO13,',
	# 	'Pittsburgh': '_IM684_KO11,',
	# 	'San Francisco': '_IM759_KO14',
	# 	'Washington DC': '_IM911_KO14,'
	# }


	def get(self):
		# http request header
		hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
		       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
		       'Accept-Encoding': 'none',
		       'Accept-Language': 'en-US,en;q=0.8',
		       'Connection': 'keep-alive'
		}

		urlLocatorStr = {
			'Philadelphia': '_IM676_KO13,',
			'Pittsburgh': '_IM684_KO11,',
			'San Francisco': '_IM759_KO14',
			'Washington DC': '_IM911_KO14,'
		}

		city = self.request.get('city')
		jobTitle = self.request.get('searchPhraseIn')

		jobTitle.replace(' ', '-')

		lowerBound = str(0)
		middleBound = str(len(city))
		upperBound = str(1 + len(city) + len(jobTitle))

		#url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
		url = 'http://www.glassdoor.com/Salaries/' + city + jobTitle + '-salary-SRCH_IL.' +lowerBound +',' +middleBound + urlLocatorStr[city] + upperBound + '_IP1.htm'


		response = urllib2.Request(url, headers= hdr)

		try:
		    page = urllib2.urlopen(response)
		except urllib2.HTTPError, e:
			pass
		    #print e.fp.read()

		soup = BeautifulSoup(page.read())
		print soup
		# url = 'http://www.glassdoor.com/Salaries/company-salaries.htm'
		# page = requests.get(url)
		# soup = BeautifulSoup(page.text)

		# print soup	


# class scrapeSalariesHandler(webapp2.RequestHandler):
#     def getSalaries(self):
# 		url = 'http://www.glassdoor.com/Salaries/company-salaries.htm'
# 		#page = urllib2.urlopen(url)
# 		soup = BeautifulSoup(page.read())

# 		print soup
 		#   	requestData  = requests.get("http://")

		# browser = mechanize.Browser()
		# browser.open("http://www.glassdoor.com/Salaries/index.htm")

		# browser.select_form(name='')

		# print br.geturl()