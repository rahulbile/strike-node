require("./accounts");
require("./events");
require("./invoices");
require("./subscriptions");

const _ = require('underscore'),
    https = require('https')
	  url = require('url'),
	  urlencode = require('urlencode');

const strike = function(apiKey,verbose) {
	this.verbose = verbose || false;
	this.version = "0.0.1";
	this.host = "api.strike.me";
	this.uri = "/v1/";
	this.baseURL = "https://api.strike.me";
	this.userAgent = "strike-node";
	this.headers= {
		  'Authorization': 'Bearer ' + apiKey,
			'User-Agent': this.userAgent
		}
};


// Rates API
strike.prototype.rates = function(callback) {
	this.requestGET("rates/ticker", {}, function(err, data) {
		return callback(err, data);
	});
}


// Accounts API
strike.prototype.profile = function(username,callback) {
	this.requestGET("accounts/handle/"+ username +"/profile", {}, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.profileById = function(id,callback) {
	this.requestGET("accounts/"+ id +"/profile", {}, function(err, data) {
		return callback(err, data);
	});
}

// Events API
strike.prototype.events = function(callback) {
	this.requestGET("events", {}, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.eventById = function(eventId,callback) {
	this.requestGET("events/"+ eventId, {}, function(err, data) {
		return callback(err, data);
	});
}


// Invoices API
strike.prototype.invoices = function(callback) {
	this.requestGET("invoices", {}, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.invoice = function(description, amount, currency, correlationId = null, callback) {
  const options = JSON.stringify({
    amount: {
      'amount': amount,
      'currency': currency,
    },
		description,
	});
	this.requestPOST("invoices", options, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.invoiceById = function(invoiceId,callback) {
	this.requestGET("invoices/"+ invoiceId, {}, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.invoiceByUsername = function(username, description, amount, currency, correlationId = null, callback) {
  const options = JSON.stringify({
    amount: {
      'amount': amount,
      'currency': currency,
    },
		description,
	});
	this.requestPOST("invoices/handle/" + username, options, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.invoiceQuote = function(invoiceId, callback) {
  const options = JSON.stringify({});
	this.requestPOST("invoices/" + invoiceId + "/quote", options, function(err, data) {
		return callback(err, data);
	});
}


// Subscriptions API
strike.prototype.subscriptions = function(callback) {
	this.requestGET("subscriptions", {}, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.subscription = function(webhookUrl, webhookVersion, secret, enabled, eventTypes, callback) {
  const options = JSON.stringify({
    webhookUrl,
    webhookVersion,
    secret,
    enabled,
		eventTypes,
	});
  this.requestPOST("subscriptions", options, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.subscriptionById = function(subscriptionId,callback) {
	this.requestGET("subscriptions/"+ subscriptionId, {}, function(err, data) {
		return callback(err, data);
	});
}

strike.prototype.requestGET = function(method, params, callback) {
	var options = {
	  hostname: this.host,
	  path: this.uri + method,
	  port: 443,
	  method: 'GET',
	  verbose: this.verbose,
	  headers:this.headers
	};

	cb = function(res) {
		if (res.statusCode < 200 || res.statusCode > 299) {
		   callback(res.statusCode);
		 }
		if(res.statusCode==200){

		let str = '';
		res.on('data',(chunk) => {
			str += chunk;
			if (options.verbose) console.log(str);
		});

		res.on('end',() => {
			var objFromJSON;

				try {
					objFromJSON = JSON.parse(str);
					return callback(null, objFromJSON);
				}
				catch (err) {
					return callback(err, null);
				}
		});
		}
	}
	const req = https.request(options, cb);
	req.on('error', (err) =>{
		callback(err.status, null);
	});

	req.end();
};

strike.prototype.requestPOST = function(method, params, callback) {
  var options = {
  	  hostname: this.host,
  	  path: this.uri + method,
  	  port: 443,
  	  method: 'POST',
  	  verbose: this.verbose,
  	  headers:{
  	  	'Authorization': this.headers.Authorization,
  	  	'User-Agent':this.userAgent,
  		  'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(params)
  	  }
  	};

  	cb = function(response) {

  		if (response.statusCode < 200 || response.statusCode > 299) {
  		   callback(response.statusCode);
  		 }
  		if([200, 201].includes(response.statusCode)){

  		let str = '';
  		response.on('data', function (chunk) {
  			str += chunk;
  			if (options.verbose) console.log(str);
  		});


  		response.on('end', function () {
  			var objFromJSON;

  				try {
  					objFromJSON = JSON.parse(str);
  					return callback(null, objFromJSON);
  				}
  				catch (err) {
  					return callback(err, null);
  				}
  		});
  		}
  	}
  	const req = https.request(options, cb);
  	req.write(params);

  	req.on('error', function(err) {
  		callback(err.status, null);
  	});

  	req.end();
};

module.exports = strike;
