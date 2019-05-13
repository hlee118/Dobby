import sys
import wikipediaapi

# 입력된 단어들
query = sys.argv[1]

# 출력 대답

wiki_ko = wikipediaapi.Wikipedia('ko')
page_py = wiki_ko.page(query)

print("Page - Title: %s" % page_py.title)

print("Page - Summary: %s" % page_py.summary[0:])
