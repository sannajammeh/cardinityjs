# Cardinity JS Node

This is a NodeJS client library wrapper for [Cardinity's](https://developers.cardinity.com/api/v1/#introduction) payment processing API.

## Installation

    npm install cardinityjsnode

## Usage

### Create new payment

```javascript
const Cardinity = require('cardinityjsnode);
const client = new Cardinity('consumerKey', 'secretKey');

const payment = {
	amount:  '140.00',
	currency:  'USD',
	country:  'US',
	payment_method: 'card' //Not required ('card' is default).
 	payment_instrument: {
		pan:  '4111111111111111',
		exp_month:  '01',
		exp_year:  '2020',
		cvc:  '123',
		holder:  'John Doe',
	},
};

client.createPayment(payment).then(response => {
	//Handle response
}).catch(error => {
	//Handle error
});
```

Field payment_method is not required as 'card' is default value. For a recurring payment use `payment_method: 'recurring'` and `payment_instrument: "{UUID}"`

### Get existing payment('s)

```javascript
const Cardinity = require('cardinityjsnode);
const client = new Cardinity('consumerKey',  'secretKey');

client.getPayments("{UUID}").then(response => {
	//Handle response
}).catch(error => {
	//Handle error
});
```

Method getPayments() can be called without arguments and will return all payments based on the default limit of Cardinity's API.

### Methods

-   `createPayment(fields)` | Returns a payment object upon success, returns error object upon error. Can also return payment error object
-   `getPayments(id)` Returns all payments or single payment if ID is included. Returns error object upon error.
-   `finalize({authorize_data, id})` | Returns a payment object upon successful 3D Secure finalization. Returns error object upon error. Can also return payment error object upon 3D Secure denial.

All responses are raw (json parsed by axios) from the Cardinity API, no data is altered.

## API Docmumentation

[https://developers.cardinity.com/api/v1/](https://developers.cardinity.com/api/v1/)
