import json

f = open('productions.json')

data = json.load(f)

#for i in data['productions']:
#	print(i["Play"] + " (" + i["Year"] + ")")

crewMembers = [];
castMembers = [];
directors   = [];

for i in data['productions']:
	#This section is going to get every Actor, Director, and Crew Member from every show.
	#Purpose is twofold - find typoed names, and try to trim down Actors and Crews down to one shoutout per show.

	#Crew always going to be in the main Production, never in a sub-performance, so get Crew members first.
	for crewMember in i["Crew"]:
		member = {
			"show": i["Play"],
			"name": crewMember["name"],
			"role": crewMember["role"]
		}
		crewMembers.append(member)

	#Director and Cast could either be in i, or if i["Length"] is "Collection" then it'll be under performances
	if(i["Length"] == "Collection"):
		#We have a series of smaller Performances! Go into each Performance
		for j in i["Performances"]:
			director = {
				"show": j["Play"],
				"name": j["Director"],
				"role": "Director"
			}
			directors.append(director)
			for castMember in j["Cast"]:
				castMember = {
					"show": j["Play"],
					"name": castMember["name"],
					"role": castMember["role"]
				}
				castMembers.append(castMember)

	else:
		#No subperformances! Just grab director and cast here
		director = {
			"show": i["Play"],
			"name": i["Director"],
			"role": "Director"
		}
		directors.append(director)
		for castMember in i["Cast"]:
			castMember = {
				"show": i["Play"],
				"name": castMember["name"],
				"role": castMember["role"]
			}
			castMembers.append(castMember)

print("CREW OUTPUT: ")
print("show,member,role")
for mem in crewMembers:
	print(mem["show"] + "|" + mem["name"] + "|" + mem["role"])

print("CAST OUTPUT: ")
print("show,member,role")
for mem in castMembers:
	print(mem["show"] + "|" + mem["name"] + "|" + mem["role"])

print("DIRECTORS OUTPUT: ")
print("show,member,role")
for mem in directors:
	print(mem["show"] + "|" + mem["name"] + "|" + mem["role"])