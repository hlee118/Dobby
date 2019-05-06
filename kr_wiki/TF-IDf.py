from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer

from numpy import dot
from numpy.linalg import norm
import numpy as np
from konlpy.tag import Komoran
komoran = Komoran()
print(komoran.morphs(u'임진왜란 시기에 거북선을 만든 조선의 장군은?'))
def cos_sim(A, B):
       return dot(A, B)/(norm(A)*norm(B))


'''
vector = CountVectorizer()
docs1 = vector.fit_transform(corpus).toarray()
docs2 = vector.fit_transform(corpus2).toarray()

tfidfv = TfidfVectorizer().fit(corpus)
print(tfidfv.transform(corpus).toarray())
print(cos_sim(docs1, docs2))
'''