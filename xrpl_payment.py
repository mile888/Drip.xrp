from xrpl.clients import JsonRpcClient
from xrpl.wallet import generate_faucet_wallet
from xrpl.models.transactions import Payment
from xrpl.utils import xrp_to_drops
from xrpl.transaction import safe_sign_and_autofill_transaction
from xrpl.transaction import send_reliable_submission


JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
client = JsonRpcClient(JSON_RPC_URL)


ticket_store = generate_faucet_wallet(client)
buyer = generate_faucet_wallet(client)

print(ticket_store.classic_address)
print(buyer.classic_address)


my_tx_payment = Payment(
    account=buyer.classic_address,
    amount=xrp_to_drops(22),
    destination=ticket_store.classic_address,
)


my_tx_payment_signed = safe_sign_and_autofill_transaction(my_tx_payment, buyer, client)
tx_response = send_reliable_submission(my_tx_payment_signed, client)

#import xrpl.transaction as Transaction
#Transaction.autofill(my_tx_payment, client)



# w1 = generate_faucet_wallet(client)
# w2 = generate_faucet_wallet(client)
# from xrpl.models.transactions import Payment
# import xrpl.utils as XrpUtil
# tx = Payment(account=w2, amount=XrpUtil.xrp_to_drops(1), destination=w1.classic_address)
# import xrpl.transaction as Transaction
# Transaction.autofill(tx, client)
