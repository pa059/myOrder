// pages/success.js

import Link from 'next/link';

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Order Accepted!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you! Your order has been successfully processed and accepted.
      </p>
      <Link href="/orders/pending">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg">
          View Pending Orders
        </button>
      </Link>
      <Link href="/mainindex" className="text-blue-600 hover:underline">← Back to Home</Link>
    </div>
  );
}
