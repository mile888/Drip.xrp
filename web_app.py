from flask import Flask, render_template, abort, redirect, request

from xrpl.clients import JsonRpcClient
from xrpl.wallet import generate_faucet_wallet
from xrpl.models.transactions import Payment
from xrpl.utils import xrp_to_drops
from xrpl.transaction import autofill

import json

with open("config.json") as json_data_file:
    events = json.load(json_data_file)



JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"

# ticket_store_address = 'rs6H4yR3kEBuEXXNQiYqAfg4NZuQUSppud'
# buyer = 'rsdKYDzru1BAwF8RehAxfBEWLafajE3crm'




app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html', event=events)

@app.route('/event', methods = ['POST', 'GET'])
def order():
    global id_web, client
    if request.method == 'POST':
        id_web = request.form.get("id")
        num_of_ticket = request.form.get("number")
        print(num_of_ticket)
        client = JsonRpcClient(JSON_RPC_URL)
        return render_template('payment.html', number=num_of_ticket)
    

@app.route('/event/payed', methods = ['POST', 'GET'])
def payment():
    if request.method == 'POST':
        address = request.form['address']
        email = request.form['email']

        events[id_web]["number"] = events[id_web]["number"] - 1

        with open("config.json", "w") as jsonFile:
            json.dump(events, jsonFile)
        
        payment = Payment(
                account=address,
                amount=xrp_to_drops(events[id_web]["price"]),
                destination=events[id_web]["url_account"])
        
        payment_done = autofill(payment, client)
        return render_template('success.html')
    
        

if __name__ == "__main__":
    app.run(debug=True) 