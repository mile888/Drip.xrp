# Drip.xrp

We have two configurations:

## 1. Frontend and localhost are in the localhost

### Backend config:
```
git clone https://github.com/mile888/drip-backend
cd drip-backend
python web_app.py # it will be running on the port 5000
```

### Frontend config:
```
git clone https://github.com/bm777/drip-frontend
cd drip-frontend
npm i
npm run dev # it will be running on the port 3000
```
Then open the this [link](http://localhost:3000) on the browser

To run the backend, you need Ngrok to allow incoming request from the web to connect the local instance