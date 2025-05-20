// pages/orders/payment.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Payment() {
  const router = useRouter();
  const { orderId } = router.query;
  const [loading, setLoading] = useState(true);

  const handlePayment = async () => {
    await new Promise((res) => setTimeout(res, 2000)); // simulate delay

    const { error } = await supabase
      .from('orders')
      .update({ status: 'Accepted' })
      .eq('id', orderId);

    if (!error) {
      router.push('/orders/success');
    } else {
      console.error('Payment update error:', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      handlePayment().finally(() => setLoading(false));
    }
  }, [orderId]);

  return (
    <div className="p-6 text-center">
      {orderId ? (
        <p>Processing payment for order <strong>{orderId}</strong>...</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
