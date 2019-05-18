from numpy import dot
from numpy.linalg import norm
import numpy as np
import sys

POSTResult = sys.argv[1]
documents = sys.argv[2]

max_similarity = 0
for doc in documents:
    total = max([len(doc), len(POSTResult)])
    count = 0
    for value in POSTResult:
        if value in doc:
            count++
    similarity.append(count/total)

def cos_sim(A, B):
       return dot(A, B)/(norm(A)*norm(B))
