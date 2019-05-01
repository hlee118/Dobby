import sys

query = sys.argv[1]

from konlpy.tag import Kkma
from konlpy.utils import pprint
kkma = Kkma()
print(kkma.sentences(query))
