'use client';

import { useState, useEffect, useRef } from 'react';

function getInitialSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

function getInitialPermission(): NotificationPermission {
  if (typeof window === 'undefined') return 'default';
  return Notification.permission;
}

export default function PushSetup() {
  const [isSupported, setIsSupported] = useState<boolean>(() => getInitialSupported());
  const [permission, setPermission] = useState<NotificationPermission>(() => getInitialPermission());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const checkedRef = useRef(false);

  const checkSubscription = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch {
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    if (isSupported && !checkedRef.current) {
      checkedRef.current = true;
      checkSubscription();
    }
  }, [isSupported]);

  const subscribe = async () => {
    if (!isSupported) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Request permission
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        setError('Notification permission denied');
        setIsLoading(false);
        return;
      }

      // Get VAPID public key
      const vapidResponse = await fetch('/api/admin/push/vapid-key');
      if (!vapidResponse.ok) {
        throw new Error('Failed to get VAPID key');
      }
      const { publicKey } = await vapidResponse.json();

      // Register service worker and subscribe
      const registration = await navigator.serviceWorker.ready;
      const applicationServerKey = urlBase64ToUint8Array(publicKey);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      // Send subscription to server
      const response = await fetch('/api/admin/push/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          keys: {
            p256dh: arrayBufferToBase64(subscription.getKey('p256dh')!),
            auth: arrayBufferToBase64(subscription.getKey('auth')!),
          },
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register subscription');
      }

      setIsSubscribed(true);
      setSuccess('Push notifications enabled successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enable notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async () => {
    if (!isSupported) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        await fetch('/api/admin/push/unregister', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
      }

      setIsSubscribed(false);
      setSuccess('Push notifications disabled');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disable notifications');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  function urlBase64ToUint8Array(base64String: string): BufferSource {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading text-primary">Push Notification Setup</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Enable push notifications to receive real-time order alerts on this device.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 mb-6">
          <h2 className="text-lg font-heading text-primary mb-4">Device Status</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Push Supported</dt>
              <dd className="font-medium">{isSupported ? 'Yes' : 'No'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Permission</dt>
              <dd className="font-medium capitalize">{permission}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subscribed</dt>
              <dd className="font-medium">{isSubscribed ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <div className="space-y-4">
          {!isSubscribed && permission === 'default' && (
            <button
              onClick={subscribe}
              disabled={isLoading}
              className="w-full py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enabling...' : 'Enable Push Notifications'}
            </button>
          )}

          {!isSubscribed && permission === 'denied' && (
            <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-700">
              <p>Notifications are blocked. Please enable them in your browser settings, then refresh this page.</p>
            </div>
          )}

          {isSubscribed && (
            <button
              onClick={unsubscribe}
              disabled={isLoading}
              className="w-full py-3 rounded-md border border-border text-primary hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Disabling...' : 'Disable Push Notifications'}
            </button>
          )}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-heading text-primary mb-4">How it works</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>&bull; Enable notifications on each device you want to receive alerts on</li>
            <li>&bull; Works on Windows Chrome/Edge, Android Chrome, and iOS 16.4+ Home Screen web apps</li>
            <li>&bull; You&apos;ll receive alerts for new orders even when this tab is closed</li>
            <li>&bull; Clicking a notification opens the order in the admin panel</li>
            <li>&bull; Subscriptions are tied to your admin account and this device only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}