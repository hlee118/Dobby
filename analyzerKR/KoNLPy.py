import sys
from konlpy.tag import Hannanum

query = input()
hannanum = Hannanum()
print(str(hannanum.nouns(query)))
