Goal of the project is to define the most frequent terms in each article. This project is using MangoDB MapReduce to weight the terms in articles based on the tf-idf algorithm.

Prerequisite:
1. npm and node (>6.*.*)
2. MangoDB (>4.3.*)

Steps:
1. run stopwordsJob to load the stop words into mongoDB
2. run loadDocsJob to load the documents into mongoDB (document is wrangled by removing the special characters, stop words)
3. run tf_itf_MapReduce_Job in MangoDB shell

run the query to see the result
db.results.find({value: {$gt: 0.003}, _id:/text1/}).sort({value: -1})
db.results.find({value: {$gt: 0.003}, _id:/text2/}).sort({value: -1})
db.results.find({value: {$gt: 0.003}, _id:/text3/}).sort({value: -1})