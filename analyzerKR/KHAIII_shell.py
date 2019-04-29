import sys
from khaiii import KhaiiiApi

api = KhaiiiApi()
query = sys.argv[1]
for word in api.analyze(query):
        print(word)
