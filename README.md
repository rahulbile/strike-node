# Strike.me API client for node.js

## Installation

```sh
npm install strike-node
```

```javasctipt
const strike = require('strike-node');
```

```javasctipt
const apiKey ="your_api_key";
const client = new strike(apiKey);
```

```javasctipt
client.profile('rahulbile', function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```

## Methods

* [rates](#rates)
* [profile](#profile)
* [profileById](#profileById)
* [events](#events)
* [eventById](#eventById)
* [invoices](#invoices)
* [invoice](#invoice)
* [invoiceById](#invoiceById)
* [invoiceByUsername](#invoiceByUsername)
* [invoiceQuote](#invoiceQuote)
* [subscriptions](#subscriptions)
* [subscription](#subscription)
* [subscriptionById](#subscriptionById)

### rates

GET

```javasctipt
  client.rates(function (error, data) {
    if(error) console.log("E!",error)
    console.dir(data);
  });
```

### profile

GET

```javasctipt
client.profile(username, function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```

### profileById

GET

```javasctipt
client.profileById(profileId, function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```

### events

GET

```javasctipt
  client.events(function (error, data) {
    if(error) console.log("E!",error)
    console.dir(data);
  });
```

### eventById

GET

```javasctipt
client.eventById(eventId, function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```


### invoices

GET

```javasctipt
  client.invoices(function (error, data) {
    if(error) console.log("E!",error)
    console.dir(data);
  });
```

### invoice

POST

```javasctipt
client.invoice(description, amount, currency, function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```

### invoiceById

GET

```javasctipt
client.invoiceById(invoiceId, function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```

### invoiceByUsername

POST

```javasctipt
client.invoiceByUsername(username, description, amount, currency, function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```
### invoiceQuote

POST

```javasctipt
client.invoiceQuote(invoiceId, function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```

### subscriptions

GET

```javasctipt
  client.subscriptions(function (error, data) {
    if(error) console.log("E!",error)
    console.dir(data);
  });
```

### subscription

POST

```javasctipt
  client.subscription(webhookUrl, webhookVersion, secret, enabled, eventTypes, function (error, data) {
    if(error) console.log("E!",error)
    console.dir(data);
  });
```

### subscriptionById

GET

```javasctipt
client.subscriptionById(subscriptionId, function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);
});
```
