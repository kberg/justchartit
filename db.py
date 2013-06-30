import hashlib
from google.appengine.ext import db
from google.appengine.api import users

# Information about a graph is stored in two places:
# The CSV/TSV data is stored in the TabularData object
# The options, and reference to the TabularData, are stored
# in the Chart object.

class TabularData(db.Model):
  # key is the SHA224 hex checksum of data.
  # TODO(konigsberg): Text is better for text data than Blobs.
  data = db.BlobProperty(required=True)


class Chart(db.Model):
  owner = db.UserProperty(required=True)
  data_sha224 = db.StringProperty(required=True)
  options = db.TextProperty(required=True)


def ComputeChecksum(data):
  sha = hashlib.sha224()
  sha.update(data)
  return sha.hexdigest()


def GetEntityForTabularData(data):
  checksum = ComputeChecksum(data)
  return TabularData.get_or_insert(checksum, data=data.encode('utf-8'))


def StoreChart(user, options, data):
  tabular_data = GetEntityForTabularData(data)

  chart = Chart(
      data_sha224=tabular_data.key().name(),
      owner=user,
      options=options
  )
  key = chart.put()
  assert key.id()
  return chart

def LoadChart(id):
  return Chart.get_by_id(id)

def LoadData(key):
  return TabularData.get_by_key_name(key).data.decode('utf-8')

def ListChartKeys():
  keys = []
  q = Chart.all(keys_only=True)
  for key in q.run():
    keys.append(key.id())
  return keys