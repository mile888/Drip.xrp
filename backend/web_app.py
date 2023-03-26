from flask import Flask, render_template, jsonify, redirect, request
from flask_cors import CORS, cross_origin
from xrpl.clients import JsonRpcClient
from xrpl.wallet import Wallet, generate_faucet_wallet
from xrpl.models.transactions import Payment
from xrpl.utils import xrp_to_drops
from xrpl.transaction import safe_sign_and_autofill_transaction, send_reliable_submission


import json

with open("config.json") as json_data_file:
    events = json.load(json_data_file)



JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"

# ticket_store_address = 'rs6H4yR3kEBuEXXNQiYqAfg4NZuQUSppud'
# buyer = 'rsdKYDzru1BAwF8RehAxfBEWLafajE3crm'




app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

@app.route('/')
def home():
    return events

@app.route('/event', methods = ['POST', 'GET'])
def order():
    global id_web, client
    if request.method == 'POST':
        id_web = request.form.form("id")
        num_of_ticket = request.form.form("number")
        print(num_of_ticket)
        client = JsonRpcClient(JSON_RPC_URL)
        # return render_template('payment.html', number=num_of_ticket)
        return jsonify(
            data = "result"
        )
    

@app.route('/event/payed', methods = ['POST', 'GET'])
def payment():
    if request.method == 'POST':
        
        data = request.data.decode()
        address = json.loads(data)["address"]
        email = json.loads(data)["email"]
        id_web = json.loads(data)["id_web"]

        events[id_web]["number"] = events[id_web]["number"] - 1

        with open("config.json", "w") as jsonFile:
            json.dump(events, jsonFile)

        client = JsonRpcClient(JSON_RPC_URL)

        wallet = generate_faucet_wallet(client)
        print("after wallet creation")
        
        payment = Payment(
                account=wallet.classic_address,
                amount=xrp_to_drops(events[id_web]["price"]),
                destination=events[id_web]["url_account"])
        
        print("after payment initiated")
       

        signed = safe_sign_and_autofill_transaction(payment, wallet, client)
        print("after signed")
        payed = send_reliable_submission(signed, client)

        print("after payment", payed)
        return jsonify(
            data=payed
        )
    
        

if __name__ == "__main__":
    app.run(debug=True) 