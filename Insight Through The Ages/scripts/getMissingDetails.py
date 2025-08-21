import json

missing = []

with open('../data/productions.json') as json_data:
	d = json.load(json_data)
	for production in d["productions"]:
		if(production["Length"] == 'Full Slot'):
			# No need to go into subproductions
			if(len(production["Cast"]) == 0 | len(production["Crew"]) == 0):
				missing.append(production)
		elif(production["Length"] == 'Collection'):
			if(len(production["Crew"]) == 0):
				missing.append(production)
			for sub in production["Performances"]:
				if(len(sub["Cast"]) == 0):
					missing.append(production)

csv = ''

for play in missing:
	print("Get details for " + play["Play"] + " [" + play["Year"] + "]")