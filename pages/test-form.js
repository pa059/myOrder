// pages/test-form.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TestForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    product: '',
    quantity: '',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('Submitting...');

    const res = await fetch('/api/submit-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
        const orderId = data.orderId; // ✅ your API should return this
        setResult(`✅ Order submitted! Order ID: ${orderId}`);

        // ✅ Now redirect to the payment page with orderId in query
        router.push(`/orders/Payment?orderId=${orderId}`);     
    } else {
      setResult(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Test Order</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="product"
          placeholder="Product"
          value={formData.product}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Order
        </button>
      </form>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );
}
