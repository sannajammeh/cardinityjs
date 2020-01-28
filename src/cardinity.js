//Dependencies
const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
/**
 *
 * @class Cardinity
 *
 * @param pk : Public Key
 * @param sk : Secret Key
 *
 */

class Cardinity {
    constructor(pk, sk) {
        this.pk = pk;
        this.sk = sk;
        this.baseURL = 'https://api.cardinity.com/v1';
    }

    createHeader(data) {
        //Init OAuth
        const oauth = OAuth({
            consumer: {
                key: this.pk,
                secret: this.sk,
            },
            signature_method: 'HMAC-SHA1',

            hash_function(base_string, secret) {
                return crypto
                    .createHmac('sha1', secret)
                    .update(base_string)
                    .digest('base64');
            },
        });
        return oauth.mergeObject(
            { Accept: 'application/json', 'Content-Type': 'application/json' },
            oauth.toHeader(oauth.authorize(data))
        );
    }

    async createPayment({
        amount,
        currency,
        country,
        payment_method = 'card',
        payment_instrument,
    }) {
        const requestObject = {
            url: `${this.baseURL}/payments`,
            method: 'POST',
            data: {
                amount,
                currency,
                country,
                payment_method,
                payment_instrument,
            },
        };

        return await this.send(requestObject);
    }

    async finalize({ authorize_data, id }) {
        const requestObject = {
            url: `${this.baseURL}/payments/${id}`,
            method: 'PATCH',
            data: {
                authorize_data,
            },
        };
        return await this.send(requestObject);
    }

    async getPayments(id = '') {
        const requestData = {
            url: `${this.baseURL}/payments/${id}`,
            method: 'GET',
        };
        return await this.send(requestData);
    }

    async send(data) {
        const requestData = {
            url: data.url,
            method: data.method,
        };

        return await axios({
            ...data,
            headers: this.createHeader(requestData),
        });
    }
}

module.exports = Cardinity;
