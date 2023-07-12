console.log("Service Worker Loaded...");

self.addEventListener("push", () => {
  console.log("Push Recieved...");
  self.registration.showNotification('test', {});
});
