import sys
from sklearn.feature_extraction.text import TfidfVectorizer
corpus = [
    'you know I want your love',
    'I like you',
    'what should I do ',
]
tfidfv = TfidfVectorizer().fit(corpus)
# print(tfidfv.transform(corpus).toarray())
# print(tfidfv.vocabulary_)

# # 입력된 단어들
query = input();
#
# # 출력 대답
print("result", 100)
