export default function OrderTable({ orders }) {
    return (
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.customers?.email}</td>
              <td>{order.customers?.name}</td>
              <td>{order.status}</td>
              <td>{order.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  