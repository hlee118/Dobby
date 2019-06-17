import sys
import wikipediaapi
from sklearn.feature_extraction.text import TfidfVectorizer
wiki_ko = wikipediaapi.Wikipedia('ko')
# # 입력된 단어들
query = input();
page_py = wiki_ko.page(query)
q1 = page_py.summary[0:] #문서 검색 내용
print(q1)

corpus = [
    'you know I want your love',
    'I like you',
    'what should I do ',
]
tfidfv = TfidfVectorizer().fit(corpus)
# # 입력된 단어들
query = input();
#
# # 출력 대답
print("result", 100)
