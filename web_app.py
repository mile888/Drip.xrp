from flask import Flask, render_template, abort, redirect, request

from xrpl.clients import JsonRpcClient
from xrpl.wallet import generate_faucet_wallet
from xrpl.models.transactions import Payment
from xrpl.utils import xrp_to_drops
from xrpl.transaction import autofill



JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"

ticket_store_address = 'rs6H4yR3kEBuEXXNQiYqAfg4NZuQUSppud'
buyer = 'rsdKYDzru1BAwF8RehAxfBEWLafajE3crm'


tickets = {
    'econom': {
        'name' : 'Econom',
        'number' : 70,
        'price': 10000,
    },
    'VIP': {
        'name' : 'VIP',
        'number' : 15,
        'price': 20000,
    },
}

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', tickets=tickets)

@app.route('/success')
def success():
   return f'You succesfully payed a ticket'


@app.route('/order/econom', methods = ['POST', 'GET'])
def order_econom():
   global client
   if request.method == 'POST':
      client = JsonRpcClient(JSON_RPC_URL)
      return render_template('payment_eco.html')
#    else:
#       user = request.args.get('nm')
#       return redirect(url_for('success',name = user))
   

@app.route('/order/VIP', methods = ['POST', 'GET'])
def order_vip():
   if request.method == 'POST':
      client = JsonRpcClient(JSON_RPC_URL)
      return render_template('payment_vip.html')
   

@app.route('/order/econom/payed', methods = ['POST', 'GET'])
def payment_econom():
    if request.method == 'POST':
        address = request.form['address']
        email = request.form['email']
        
        payment = Payment(
                account=address,
                amount=xrp_to_drops(tickets['econom']['price']),
                destination=ticket_store_address)
        
        payment_done = autofill(payment, client)
        return render_template('success.html')
        #return redirect(url_for('success'))
    
    
@app.route('/order/VIP/payed', methods = ['POST', 'GET'])
def payment_vip():
    if request.method == 'POST':
        address = request.form['address']
        email = request.form['email']
        
        payment = Payment(
                account=address,
                amount=xrp_to_drops(tickets['VIP']['price']),
                destination=ticket_store_address)
        
        payment_done = autofill(payment, client)
        return render_template('success.html')
        #return redirect(url_for('success'))







        
   


# @app.route("/")
# def home():
#     return render_template('index.html')

# @app.route("/login", methods=["POST", "GET"])
# def login():
#     if request.method == 'POST':
#         user = request.form['nm']
#         return redirect(url_for("user", usr=user))
#     else:    
#         return render_template('login.html')

# @app.route("/<usr>")
# def user(usr):
#     return f"<hr1>{usr}</hr1>"

if __name__ == "__main__":
    app.run(debug=True) 