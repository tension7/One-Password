import cgi
import string
import logging
import urllib
import os
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util

class MainPage(webapp.RequestHandler):
  def get(self):
    templatePath = os.path.join(os.path.dirname(__file__), "main.html")
    self.response.out.write(template.render(templatePath, {}))
    
application = webapp.WSGIApplication(
                   [('/', MainPage)],
                   debug=True)

def main():
  util.run_wsgi_app(application)

if __name__ == "__main__":
  main()
