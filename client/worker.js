console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  console.log("Push Recieved...", e);
  const body = {
    body: "kvdfnknvdf"
  }
  self.registration.showNotification('test', {})
});
