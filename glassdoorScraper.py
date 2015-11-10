import webapp2
import app_global

import sys
sys.path.insert(0, 'lib')
from bs4 import BeautifulSoup
import requests
import mechanize
import urllib2


def getSalaries():
	url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
	hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
       'Accept-Encoding': 'none',
       'Accept-Language': 'en-US,en;q=0.8',
       'Connection': 'keep-alive'}

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