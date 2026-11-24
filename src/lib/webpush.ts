// web-push types are now available via @types/web-push
import * as webpush from 'web-push';
import { supabaseAdmin } from './supabase-server';

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface PushPayload {
  title: string;
  body: string;
  url: string;
  orderRef: string;
}

function getVapidKeys() {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || 'mailto:admin@healthyfood.com';

  if (!publicKey || !privateKey) {
    throw new Error('VAPID keys not configured');
  }

  return { publicKey, privateKey, subject };
}

export function getVapidPublicKey(): string {
  const { publicKey } = getVapidKeys();
  return publicKey;
}

function createWebPushClient() {
  const { publicKey, privateKey, subject } = getVapidKeys();
  webpush.setVapidDetails(subject, publicKey, privateKey);
  return webpush;
}

export async function sendPushNotification(
  subscription: PushSubscription,
  payload: PushPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const webpushClient = createWebPushClient();

    const pushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    };

    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      url: payload.url,
      orderRef: payload.orderRef,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag: payload.orderRef,
      requireInteraction: true,
      data: {
        url: payload.url,
      },
    });

    await webpushClient.sendNotification(pushSubscription, notificationPayload);
    return { success: true };
  } catch (error) {
    const webPushError = error as webpush.WebPushError;
    if (webPushError.statusCode === 404 || webPushError.statusCode === 410) {
      return { success: false, error: 'subscription_expired' };
    }
    console.error('Push notification error:', error);
    return { success: false, error: 'send_failed' };
  }
}

export async function sendNotificationToAllAdmins(
  payload: PushPayload
): Promise<{ sent: number; failed: number; expiredRemoved: number }> {
  if (!supabaseAdmin) {
    return { sent: 0, failed: 0, expiredRemoved: 0 };
  }

  const { data: subscriptions, error } = await supabaseAdmin
    .from('admin_push_subscriptions')
    .select('endpoint, p256dh, auth');

  if (error || !subscriptions || subscriptions.length === 0) {
    return { sent: 0, failed: 0, expiredRemoved: 0 };
  }

  let sent = 0;
  let failed = 0;
  let expiredRemoved = 0;

  for (const sub of subscriptions) {
    const result = await sendPushNotification(
      {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      },
      payload
    );

    if (result.success) {
      sent++;
    } else if (result.error === 'subscription_expired') {
      // Remove expired subscription
      await supabaseAdmin
        .from('admin_push_subscriptions')
        .delete()
        .eq('endpoint', sub.endpoint);
      expiredRemoved++;
    } else {
      failed++;
    }
  }

  return { sent, failed, expiredRemoved };
}

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface PushPayload {
  title: string;
  body: string;
  url: string;
  orderRef: string;
}