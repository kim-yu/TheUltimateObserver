import os
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from urllib import urlopen
from bs4 import BeautifulSoup
from tabulate import tabulate
import re

def getTeamPage(division, gender, team, search):
  results = []
  url = urlopen('http://play.usaultimate.org/teams/events/team_rankings/?RankSet='+division+'-'+gender+'&F_'+search+'Name='+team)
  content = url.read()
  soup = BeautifulSoup(content, "html5lib")
  table = soup.find("table", { "class": "global_table" })
  tableBody = table.find('tbody')
  try:
    tr = tableBody.find('tr', { "class": "row" })
    cols = tr.find_all('td')
    teamPage = str('http://play.usaultimate.org'+cols[1].find('a').get('href'))
  except:
    print "no team page found"
  return teamPage

def getRoster(teamPage):
  roster = []
  url = urlopen(teamPage)
  content = url.read()
  soup = BeautifulSoup(content, "html5lib")
  table = soup.find("table", { "class": "global_table" })
  tableBody = table.find('tbody')
  rows = tableBody.find_all('tr')
  for r in rows[1:]:
    info = r.find_all('td')
    number = info[0].text
    first, last = info[1].text.lower().split()
    cleanedName = first[0].upper()+first[1:] + ' ' + last[0].upper()+last[1:]
    roster.append((cleanedName, number))
  return roster

def createRosterFile(roster, team):
  f = open(team[0].upper()+team[1:]+'.txt', 'w+')
  for player in roster:
    f.write('#'+player[1]+' '+player[0]+'\n')
  f.close()

if __name__ == '__main__':
  division = sys.argv[1]
  gender = sys.argv[2]
  team = sys.argv[3]
  if division.lower() == 'college':
    search = 'School'
  else:
    search = 'Team'
  
  teamPage = getTeamPage(division, gender, team, search)
  roster = getRoster(teamPage)  
  createRosterFile(roster, team)
  print tabulate(roster, headers=['Name', 'Number'])