# import json

# with open("config.json") as json_data_file:
#     data = json.load(json_data_file)
# print(data)

# event_1 = data["event_1"]
# print(event_1)

# for i in data:
#     print(data[f'{i}']["name"])

products = {
    'megatutorial': {
        'name': 'The Flask Mega-Tutorial',
        'price': 3900,
    },
    'support': {
        'name': 'Python 1:1 support',
        'price': 20000,
        'per': 'hour',
    },
}

for id in products:
     print(id)
     print(products[id])
     