// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 Welcome to Order Management</h1>
      <ul className="space-y-2">
        <li><Link href="/test-form" className="text-blue-600 hover:underline">📋 order items</Link></li>
        <li><Link href="/orders/orders" className="text-blue-600 hover:underline">✅ Accepted Orders</Link></li>
        <li><Link href="/orders/customers" className="text-blue-600 hover:underline">👤 All Customers</Link></li>
        <li><Link href="/orders/pending" className="text-blue-600 hover:underline">📋 All Requests (Pending Orders)</Link></li>
      </ul>
    </div>
  );
}
