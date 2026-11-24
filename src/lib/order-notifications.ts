import { sendNotificationToAllAdmins } from './webpush';

export interface NewOrderNotificationPayload {
  orderId: string;
  orderReference: string;
  subtotal: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
}

export async function notifyAdminsOfNewOrder(
  payload: NewOrderNotificationPayload
): Promise<void> {
  try {
    const subtotalFormatted = new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(payload.subtotal);

    const paymentMethodLabel = payload.paymentMethod.charAt(0).toUpperCase() + payload.paymentMethod.slice(1);

    const result = await sendNotificationToAllAdmins({
      title: 'New Order Received',
      body: `Order ${payload.orderReference} — ${subtotalFormatted} — ${paymentMethodLabel} — Delivery charge pending`,
      url: `/admin/orders/${payload.orderId}`,
      orderRef: payload.orderReference,
    });

    console.log('Admin push notification result:', result);
  } catch (error) {
    // Log but never throw - notification failure must not affect order
    console.error('Admin notification error:', error);
  }
}