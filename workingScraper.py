######################################################################################################################
################################################## SELENIUM ##########################################################
######################################################################################################################
Daniels-MacBook-Pro-2:~ hui$ python
Python 2.7.10 (v2.7.10:15c95b7d81dc, May 23 2015, 09:33:12) 
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from selenium import webdriver
>>> from bs4 import BeautifulSoup
>>> driver = webdriver.Firefox()
>>> driver.get("http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm")
>>> time.sleep(10)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'time' is not defined
>>> import time
>>> time.sleep(10)
>>> soup = BeautifulSoup(driver.page_source)


######################################################################################################################
################################################# DRYSCRAPE ##########################################################
######################################################################################################################
>>> import dryscrape
>>> session = dryscrape.Session()
>>> from bs4 import BeautifulSoup
>>> url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
>>> session.visit(url)
>>> response = session.body()
>>> soup = BeautifulSoup(response)




######################################################################################################################
################################################# REQUESTS ###########################################################
######################################################################################################################
>>> import requests
>>> url = 'http://www.glassdoor.com/Salaries/pittsburgh-software-engineer-salary-SRCH_IL.0,10_IM684_KO11,28_IP1.htm'
>>> hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11','Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3','Accept-Encoding': 'none','Accept-Language': 'en-US,en;q=0.8','Connection': 'keep-alive'}
>>> page = requests.get(url, headers=hdr).content