import webapp2
from google.appengine.api import users
from google.appengine.ext.webapp import template


import db


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
    chart = db.LoadChart(id)

    self.response.out.write('id = %s<br/>chart.data_sha224 = %s<br/>config = %s\n' % (
        chart.key().id(), chart.data_sha224, chart.options))


class AdminListHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {
      'keys' : db.ListChartKeys()
    }
    self.response.out.write(template.render('templates/admin-list.html', template_values))

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
