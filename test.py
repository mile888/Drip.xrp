import json

with open("config.json") as json_data_file:
    data = json.load(json_data_file)
print(data)

event_1 = data["event_1"]
print(event_1)

for i in data:
    print(data[f'{i}']["name"])
