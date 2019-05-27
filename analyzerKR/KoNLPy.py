#-*- coding:utf-8 -*-

import sys
# reload(sys)
# sys.setdefaultencoding('utf-8')
query = sys.argv[1]
print(sys.argv[0])

print(u"한글")
print(type(query).__name__)
print(bytes(query, 'utf-8'));

# 유니코드로 다루기 예제3
foo = u'한글'
print(str(foo.encode('utf-8')))

from konlpy.tag import Hannanum
hannanum = Hannanum()
print(str(hannanum.nouns(query)))
