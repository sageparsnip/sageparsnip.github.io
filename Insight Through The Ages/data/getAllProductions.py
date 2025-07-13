import json

f = open('productions.json')

data = json.load(f)

for i in data['productions']:
	print(i["Play"] + " (" + i["Year"] + ")")