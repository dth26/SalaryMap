import webapp2
import app_global

import sys
sys.path.insert(0, 'lib')
from bs4 import BeautifulSoup
import requests
# import mechanize
# import urllib2
# import gzip
# import StringIO
# import zlib

# import urllib3
# from google.appengine.api import urlfetch

#github shazow
# class testurllib3(webapp2.RequestHandler):

# 	def get(self):

# 		url = "http://www.google.com/"
# 		result = urlfetch.fetch(url)
# 		if result.status_code == 200:
# 		  doSomethingWithResult(result.content)

# 		http = urllib3.PoolManager()
# 		url ='http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'

# 		response = http.request('GET', 'http://nhl.com')

# 		print response






class testRequests(webapp2.RequestHandler):

	def get(self):
		url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
		hdr = {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
			'Accept-Encoding': 'none',
			'Accept-Language': 'en-US,en;q=0.8',
			'Connection': 'keep-alive'
		}
		page = requests.get(url, headers= hdr)


		soup = BeautifulSoup(page.content, 'html.parser')

		#print soup
		#print soup.div

		salaryRows = soup.find_all("div", class_="pageContentWrapper")
		salaryRows = soup.find_all("div", class_="cell alignLt minor padBotLg")
		salaryRows = soup.find(id="SalarySearchResults")
		salaryRows = soup.find(id="MainCol")
		#salaryRows = salaryRows.findChild("div", class_="srchNavContainer tbl fill")
		salaryRows = soup.find_all("span", class_="i-emp minor")

		print salaryRows


# class testDryScape(webapp2.RequestHandler):

# 	def get(self):
# 		my_url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
# 		session = dryscrape.Session()
# 		session.visit(my_url)
# 		response = session.body()
# 		soup = BeautifulSoup(response)
# 		print soup






class getSalaries(webapp2.RequestHandler):

	# required by glassdoor URL
	# urlLocatorStr = {
	# 	'Philadelphia': '_IM676_KO13,',
	# 	'Pittsburgh': '_IM684_KO11,',
	# 	'San Francisco': '_IM759_KO14',
	# 	'Washington DC': '_IM911_KO14,'
	# }
	global StringIO

	def decode (self, page):
	    encoding = page.info().get("Content-Encoding")    
	    if encoding in ('gzip', 'x-gzip', 'deflate'):
	    	print encoding
	        content = page.read()
	        if encoding == 'deflate':
	        	data = StringIO.StringIO(zlib.decompress(content))
	        else:
	            data = gzip.GzipFile('', 'rb', 9, StringIO.StringIO(content))
	        page = data.read()

	    return page


	def openPage(self, url):
		opener = urllib2.build_opener()
		opener.addheaders = [
			('Referer', 'http://www.glassdoor.com'),
			('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:42.0) Gecko/20100101 Firefox/42.0'),
			('Accept-Encoding', 'gzip, deflate'),
			('Accept',	'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'),
			('Accept-Language', 'en-US,en;q=0.5'),
			('Cookie', 'end_user_id=oeu1447196323919r0.08578792834519378'),
			('Host', '200053012.log.optimizely.com'),
			('Origin', 'http://www.glassdoor.com')
		]
		usock = opener.open(url)
		url = usock.geturl()
		data = self.decode(usock)
		usock.close() 
		return data


	def get(self):
		# http request header
		# hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
		#        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		#        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
		#        'Accept-Encoding': 'none',
		#        'Accept-Language': 'en-US,en;q=0.8',
		#        'Connection': 'keep-alive'
		# }
		hdr = {
			'Accept':	'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Encoding' :	'gzip, deflate',
			'Accept-Language' : 'en-US,en;q=0.5',
			'Cookie' : 'end_user_id=oeu1447196323919r0.08578792834519378',
			'Host' :	'200053012.log.optimizely.com',
			'Origin' :	'http://www.glassdoor.com',
			'Referer' :	'http://www.glassdoor.com',
			'User-Agent' :	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:42.0) Gecko/20100101 Firefox/42.0'
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

		print url

		page = self.openPage(url)
		# response = urllib2.Request(url, headers= hdr)
		# #response.info().get('Content-Encoding')

		# try:
		#     page = urllib2.urlopen(response)

		#    # page = self.decode(page)
		# except urllib2.HTTPError, e:
		# 	pass
		#     #print e.fp.read()

		soup = BeautifulSoup(page, 'html.parser')

		#print soup
		#print soup.div

		salaryRows = soup.find_all("div", class_="pageContentWrapper")
		salaryRows = soup.find_all("div", class_="cell alignLt minor padBotLg")
		salaryRows = soup.find(id="SalarySearchResults")
		salaryRows = soup.find(id="MainCol")
		#salaryRows = salaryRows.findChild("div", class_="srchNavContainer tbl fill")
		salaryRows = soup.find_all("span", class_="i-emp minor")
		print salaryRows
		#print soup.select("div.tbl.fill.salaryRow")

		# for employee in salaryRows:
		# 	employee = employee.find('span', class_='i-emp minor').text
		# 	salary = employee.find('div', class_='meanPay alignRt h2 i-cur').text
		# 	print employee
		# 	print salary
		# 	print ''


		#print soup
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