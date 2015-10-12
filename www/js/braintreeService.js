angular
	.module('starter')
	.factory('braintreeService', braintreeFactory);

function braintreeFactory($http) {

	/**
	 * Braintree server-side implementation
	 * @type string
	 */
	var apiUrl = 'http://localhost/caree/payments/payserver';

	return {

		getClientToken: function(customerId) {
			return $http
				.get(apiUrl + '/client_token' + (customerId ? '/' + customerId : ''))
				.then(function(response) {
					if (response.status === 200 && response.data !== undefined) {
						return response.data;
					}

					throw 'Invalid response';
				});
		},

		createCustomer: function(firstName, lastName, company, email, phone, fax, website) {
			var postData = {
				customer: {
					firstName: firstName,
					lastName: lastName,
					company: company,
					email: email,
					phone: phone,
					fax: fax,
					website: website
				}
			};

			return $http
				.post(apiUrl + '/customer', postData)
				.then(function(response) {
					if (response.status === 200 && response.data !== undefined) {
						return response.data;
					}
				});
		},

		createPaymentMethod: function(customerId, nonce) {
			var postData = {
				paymentMethod: {
					customerId: customerId,
					paymentMethodNonce: nonce
				}
			};
			return $http
				.post(apiUrl + '/payment_method', postData)
				.then(function(response) {
					if (response.status === 200 && response.data !== undefined) {
						return response.data;
					}
				});
		},

		sale: function(amount, paymentMethodToken) {
			var postData = {
				transaction: {
					amount: amount,
					paymentMethodToken, paymentMethodToken
				}
			};

			return $http
				.post(apiUrl + '/sale', postData)
				.then(function(response) {
					if (response.status === 200 && response.data !== undefined) {
						return response.data;
					}
				});
		}

	};

};