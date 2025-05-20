// pages/api/submit-order.js

import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email } = req.body;

  // Basic validation
  if (!name || !email || name.trim() === '' || email.trim() === '') {
    return res.status(400).json({ message: 'Missing or invalid name or email' });
  }

  try {
    // 1. Insert into customers table
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert([
        {
          name,
          email,
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (customerError) {
      console.error('Customer insert error:', customerError);
      return res.status(400).json({ message: 'Failed to save customer', error: customerError });
    }

    // 2. Insert into orders table with reference to the customer
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_id: customer.id,
          status: 'Waiting for offer',
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      return res.status(400).json({ message: 'Failed to save order', error: orderError });
    }

    // Success
    return res.status(200).json({ message: 'Order submitted successfully', orderId: order.id });

  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}