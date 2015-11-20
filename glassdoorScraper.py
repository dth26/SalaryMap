import webapp2
import app_global
import json

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
			'baltimore': '_IM63_KO10',
			'boston': '_IM109_KO7',
			'herndon': '_IM911_KO14',
			'houston': '_IM394_KO8',
			'philadelphia': '_IM676_KO13',
			'pittsburgh': '_IM684_KO11',
			'new-york': '_IM615_KO14',
			'san-francisco': '_IM759_KO14',
			'washington-dc': '_IM911_KO14'
		}

		city = self.request.get('city')
		city = city.replace(' ','-').lower()
		jobTitle = self.request.get('searchPhraseIn')
		jobTitle = jobTitle.replace(' ', '-')

		lowerBound = str(0)
		middleBound = str(len(city))
		upperBound = str(1 + len(city) + len(jobTitle))

		print city
		print jobTitle
		print lowerBound
		print middleBound
		print upperBound

		### EX URL
		### url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
		### city = pitturgh, jobTitle = Software Engineer, lowerBound = 0, middleBound = 10, urlLocatiorStr[city] = _IM684_KO11,, upperBound = 28
		url = 'http://www.glassdoor.com/Salaries/' + city + '-' + jobTitle + '-salary-SRCH_IL.' +lowerBound +',' +middleBound + urlLocatorStr[city] + ',' + upperBound + '_SDAS.htm'
		page = requests.get(url, headers= hdr)
		soup = BeautifulSoup(page.content, 'html.parser')

		print url
		#print soup
		#print soup.div


		#salaryRows = salaryRows.findChild("div", class_="srchNavContainer tbl fill")
		companyRows = soup.find_all("div", class_="tbl fill salaryRow ")

		companyJSON = list()
		for company in companyRows:
			companyName = company.find("span", class_="i-emp minor").get_text().strip()
			salary = company.find("div", class_="meanPay alignRt h2 i-cur").get_text().strip()
			companyJobTitle = company.find("span", class_="i-occ strong noMargVert ").get_text().strip()


			if salary != 'n/a':
				company = dict()
				company['companyName'] = companyName
				company['jobTitle'] = companyJobTitle
				company['salary'] = salary

				companyJSON.append(company)


		nationalAvgSalary = 'none'
		cityAvgSalary = 'none'

		# get city Area Avg, and National Avg for salaries
		avgSalaries = soup.find_all('div', class_='meanPay nowrap positive')

		if(len(avgSalaries)==2):
			nationalAvgSalary = avgSalaries[0].get_text()
			cityAvgSalary = avgSalaries[1].get_text()


		salaryJSON = dict()
		salaryJSON['nationalAvgSalary'] = nationalAvgSalary
		salaryJSON['cityAvgSalary'] = cityAvgSalary

		results = dict()
		results['companies'] = companyJSON
		results['salaryData'] = salaryJSON
		
		self.response.out.write(json.dumps(results))





