const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BPbj4gxNYOTO_mWIdUSVFdi1Bc1_tBOW9QGX_tao0KQTAvPuKEqJkXCBrPypMaBvKDaBS8HwZlDrCCOy8dJnHrw";
const privateVapidKey = "3elAqCQT-TrNK_1pZacSTraodOOTcfmVQFK8uF0UdDE";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

const sub = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/fvH3wH9sj18:APA91bHuRilftbvYaLYYKR9iHbh7chIjZKdXARFO6MfpH_Yh2ncVziUWNAjDdHrBLvcVpcbVhJcM42w58kq5Nd1WV_xv7a9mLcOAQxJhP6OQyQBj86SmdIfJSf9en6y8C6OQP7SwuRT1",
  "expirationTime": null,
  "keys": {
    "p256dh": "BBoJ98mZ7YkYVWg1DmB4rTWE4McWJUcnkYWfYCunjGYazymW-tXEgAi7h275qLDcYw06bDUaSvA-ds68L4pwwpg",
    "auth": "tdQiENvkeCYk2DpN6K3-XA"
  }
}

app.get('/', (req, res) => {

  const payload = JSON.stringify({ title: "Push Test" });
  webpush
      .sendNotification(sub, payload)
      .catch(err => console.error(err));
})
// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
  console.log(subscription);

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({
    title: 'Your Title',
    body: 'Your Notification',
  })

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, 'fgdf')
    .catch(err => console.error(err));
});

const port = 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
