import db
import jinja2
import os
import webapp2
from google.appengine.api import users


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])

class SaveHandler(webapp2.RequestHandler):
  def post(self):
    config = self.request.get('config')
    data = self.request.get('data')
    
    chart = db.StoreChart(users.get_current_user(),
                          config,
                          data)

    self.response.out.write('id = %s<br/>chart.data_sha224 = %s<br/>config = %s\n' % (
        chart.key().id(), chart.data_sha224, chart.options))


class ViewHandler(webapp2.RequestHandler):
  def get(self):
    id = self.request.get('id')
    chart = db.LoadChart(int(id))

    self.response.out.write('id = %s<br/>chart.data_sha224 = %s<br/>config = %s\n' % (
        chart.key().id(), chart.data_sha224, chart.options))


class AdminListHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {
      'keys' : db.ListChartKeys()
    }
    template = JINJA_ENVIRONMENT.get_template('templates/admin-list.html')
    self.response.out.write(template.render(template_values))

class FooHandler(webapp2.RequestHandler):
  def get(self):
    user = users.get_current_user()
    self.response.out.write('You are: %s\n' % user)


app = webapp2.WSGIApplication([
    ('/save', SaveHandler),
    ('/view', ViewHandler),
    ('/foo', FooHandler),
    ('/admin-list', AdminListHandler)
], debug=True)
