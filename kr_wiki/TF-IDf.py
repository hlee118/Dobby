from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
import sys
import wikipediaapi
from numpy import dot
from numpy.linalg import norm
import numpy as np
from konlpy.tag import Komoran
import pandas as pd
cv = CountVectorizer()

#Word2vector
#import gensim
#model = gensim.models.Word2Vec.load('ko.bin') #ko.bin 파일은 이미 학습된 모델

#자연어 질의
komoran = Komoran()
query = sys.argv[1]
#print(komoran.morphs(query))
query_matrix = komoran.morphs(query)
q = cv.fit_transform(query_matrix)

#tfidfv = TfidfVectorizer().fit(q)

#객관식 문제들
answer1 = sys.argv[2]
answer2 = sys.argv[3]

#정답 후보 지식 추출
wiki_ko = wikipediaapi.Wikipedia('ko')

page_py = wiki_ko.page(answer1)
q1 = page_py.summary[0:]
#q1 = komoran.morphs(q1)
#tdm1 = cv.fit_transform(q1) #Term Document Matirx
#TF1 = tdm1.sum(axis=0) #Term Frequency
#print(TF1.shape)

page_py = wiki_ko.page(answer2)
q2 = page_py.summary[0:]
#q2 = komoran.morphs(q2)
#tdm2 = cv.fit_transform(q2)
#TF2 = tdm2.sum(axis=0)
#print(TF2.shape)

X = np.array(cv.fit_transform([query, q1, q2]).todense()) # TDM
print(X)

#정답 후보 순위 결정
#TF-IDF

vector = CountVectorizer()
#docs1 = vector.fit_transform(corpus).toarray()
#docs2 = vector.fit_transform(corpus2).toarray()

#tfidfv = TfidfVectorizer().fit(corpus)

#tfidfv1 = TfidfVectorizer().fit(q1)
#print(tfidfv1.transform(q1).toarray())
#print(tfidfv1.vocabulary_)


#tfidfv2 = TfidfVectorizer().fit(q2)
#print(tfidfv2.transform(q2).toarray())
#print(tfidfv2.vocabulary_)
#a = model.wv.most_similar(q2)
#print(a)

def cos_sim(A, B):
       return dot(A, B)/(norm(A)*norm(B))

#정답 결정 # cosine similar
#tfidf_matrix = tfidfv.fit_transform(q)

#tfidf_matrix1 = tfidfv1.fit_transform(q1)

#tfidf_matrix2 = tfidfv2.fit_transform(q2)

#a = cos_sim(tfidf_matrix, tfidf_matrix1)
#print(a)
#from sklearn.metrics.pairwise import linear_kernel
#cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix1)
#print(cosine_sim)