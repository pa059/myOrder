// pages/orders.js
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('*, customers(name, email)')
        .eq('status', 'Accepted');

      if (error) console.error(error);
      else setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Accepted Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-2 rounded">
          <p><strong>Customer:</strong> {order.customers.name} ({order.customers.email})</p>
          <p><strong>Status:</strong> {order.status}</p>
          {/* You can add more fields here */}
        </div>
      ))}
      <Link href="/mainindex" className="text-blue-600 hover:underline">
  ← Back to Home</Link>
    </div>
  );
}
