import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('customers').select('*');
      if (data) setCustomers(data);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">👥 All Customers</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/mainindex" className="text-blue-600 hover:underline">← Back to Home</Link>
    </div>
  );
}
