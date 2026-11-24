/// <reference lib="webworker" />

self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();

    const options: NotificationOptions = {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag: data.orderRef,
      requireInteraction: true,
      data: {
        url: data.url,
      },
      requireInteraction: true,
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Push event error:', error);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/admin';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // Try to focus existing window
      for (const client of clients) {
        if (client.url.includes(new URL(url).origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window
      return clients.openWindow(url);
    })
  );
});

self.addEventListener('pushsubscriptionchange', (event) => {
  // Handle subscription expiration/renewal
  console.log('Push subscription changed:', event);

  // The old subscription is no longer valid
  // We could notify the server to remove the old subscription
  event.waitUntil(
    fetch('/api/admin/push/unregister', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: event.oldSubscription?.endpoint }),
    }).catch(console.error)
  );

  // Re-subscribe if possible
  if (event.newSubscription) {
    event.waitUntil(
      fetch('/api/admin/push/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: event.newSubscription.endpoint,
          keys: {
            p256dh: event.newSubscription.toJSON().keys.p256dh,
            auth: event.newSubscription.toJSON().keys.auth,
          },
        }),
      }).catch(console.error)
    );
  }
});