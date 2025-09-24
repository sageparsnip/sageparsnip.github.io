import json

Managers = []

with open('../data/productions.json') as json_data:
	d = json.load(json_data)
	for production in d["productions"]:
		if(len(production["Crew"]) != 0):
			for crewMember in (production["Crew"]):
				# Iterate over crew members, if Stage Manager add to list
				if("Stage Manager" in crewMember["role"]):
					Managers.append(crewMember["name"])

csv = ''

for member in Managers:
	print(member)