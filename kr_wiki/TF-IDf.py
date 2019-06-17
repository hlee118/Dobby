from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import linear_kernel
import sys
import wikipediaapi
from numpy import dot
from numpy.linalg import norm
import numpy as np
from konlpy.tag import Komoran
import pandas as pd
import pickle
import os
f = open("wiki_space_tokenizer.txt",'r')
#data = f.load()
#print(data)

#자연어 질의
komoran = Komoran()
query = input()
# 거북선을 만든 사람은 누구인가요?

#query = komoran.morphs(query)
#query = query.replace(",","")
#print(query)

#객관식 문제들
answer1 = sys.argv[2]
answer2 = sys.argv[3]

#정답 후보 지식 추출
wiki_ko = wikipediaapi.Wikipedia('ko')

page_py = wiki_ko.page(answer1)
q1 = page_py.summary[0:] #문서 검색 내용
#q1 = komoran.morphs(q1)
#q1 = cv.fit_transform(q1)

#tdm1 = cv.fit_transform(q1) #Term Document Matirx
#TF1 = tdm1.sum(axis=0) #Term Frequency
#print(TF1.shape)

page_py = wiki_ko.page(answer2)
q2 = page_py.summary[0:] #문서 검색 내용
#q2 = komoran.morphs(q2) #형태소 분석기
#q2 = cv.fit_transform(q2)

#tdm2 = cv.fit_transform(q2)
#TF2 = tdm2.sum(axis=0)
#print(TF2.shape)
cv = CountVectorizer()

corpus = [query, q1, q2]
#print(corpus)
#cv.fit_transform(corpus)
#print(cv.fit_transform(corpus).toarray())
#print(cv.vocabulary_)

tfidfv = TfidfVectorizer().fit(corpus)
#print(tfidfv.transform(corpus).toarray())
tfidfv_matrix = tfidfv.transform(corpus)
#print(tfidfv.vocabulary_)

cosine_sim = linear_kernel(tfidfv_matrix, tfidfv_matrix)
#print(cosine_sim)

cos1 = cosine_sim[0,1]
cos2 = cosine_sim[0,2]
#print(cos1, cos2)

if(cos1>cos2):
       print(answer1)
else:
       print(answer2)
