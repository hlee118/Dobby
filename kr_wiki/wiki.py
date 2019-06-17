import sys
import wikipediaapi
from sklearn.feature_extraction.text import TfidfVectorizer
wiki_ko = wikipediaapi.Wikipedia('ko')

## 입력된 단어들
query = sys.argv[1];
page_py = wiki_ko.page(query)
q1 = page_py.summary[0:] #문서 검색 내용
print(q1.split('\n')[0])
print(1)
