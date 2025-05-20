import { supabase } from "@/lib/supabaseClient";
import OrderTable from "@/components/OrderTable";
import Link from 'next/link';

export async function getServerSideProps() {
  const { data } = await supabase
    .from("orders")
    .select("*, customers(*)")
    .eq("status", "Waiting for offer");
  return { props: { orders: data } };
}

export default function PendingOrders({ orders }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Pending Orders</h1>
      <OrderTable orders={orders} />
      <div className="p-6">
      <Link href="/mainindex" className="text-blue-600 hover:underline">← Back to Home</Link></div>
    </div>
  );
}