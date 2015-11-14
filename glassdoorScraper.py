import webapp2
import app_global

import sys
sys.path.insert(0, 'lib')
from bs4 import BeautifulSoup
import requests





class getSalaries(webapp2.RequestHandler):

	def get(self):
		#url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
		hdr = {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
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
		jobTitle = jobTitle.replace(' ', '-')

		lowerBound = str(0)
		middleBound = str(len(city))
		upperBound = str(1 + len(city) + len(jobTitle))

		### EX URL
		### url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
		### city = pitturgh, jobTitle = Software Engineer, lowerBound = 0, middleBound = 10, urlLocatiorStr[city] = _IM684_KO11,, upperBound = 28
		url = 'http://www.glassdoor.com/Salaries/' + city + '-' + jobTitle + '-salary-SRCH_IL.' +lowerBound +',' +middleBound + urlLocatorStr[city] + upperBound + '_IP1.htm'
		page = requests.get(url, headers= hdr)
		soup = BeautifulSoup(page.content, 'html.parser')

		#print soup
		#print soup.div


		#salaryRows = salaryRows.findChild("div", class_="srchNavContainer tbl fill")
		companyRows = soup.find_all("div", class_="tbl fill salaryRow ")

		for company in companyRows:
			companyName = company.find("span", class_="i-emp minor").get_text()
			salary = company.find("div", class_="meanPay alignRt h2 i-cur").get_text()

			print companyName + salary


		# get city Area Avg, and National Avg for salaries
		avgSalaries = soup.find_all('div', class_='meanPay nowrap positive')
		nationaAvgSalary = avgSalaries[0].get_text()
		cityAvgSalary = avgSalaries[1].get_text()
		





