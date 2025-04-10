import React, { useState, useEffect } from "react";
import AdminService from "../../services/admin-api-service/AdminService";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const { getOrder, updateStatus } = AdminService();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrder();

      console.log(response, "response---------+++++++++++++++++++++");

      setOrders(response.orders);
    } catch (error) {}
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      let data = { newStatus };
      const response = await updateStatus(orderId, data);

      if (response?.success) {
        fetchOrders();
      }
    } catch (error) {}
  };
  console.log(selectedOrder, "---------------selectedOrder");

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto bg-white p-4 shadow rounded">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-center">Order Id</th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Phone Number</th>
              <th className="p-2 text-center">Product</th>
              <th className="p-2 text-center"></th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-2 text-center">{order._id}</td>
                <td className="p-2 text-center">{order?.user?.name}</td>
                <td className="p-2 text-center">{order?.user?.phone}</td>
                <td className="p-2 text-center">
                  <div className="flex items-center space-x-2 border-b py-2">
                    <img
                      src={order?.orderItems?.product?.images?.[0]}
                      alt={order.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">
                        {order?.orderItems?.product?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {order?.orderItems?.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Amount: ${order?.orderItems?.product?.sale_price}
                      </p>
                      <p className="text-xs text-gray-500">
                        Total: ${order?.totalPrice}
                      </p>
                    </div>
                  </div>
                  {/* ))} */}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                  >
                    Show Details
                  </button>
                </td>
                <td className="p-2 text-center">
                  <select
                    value={order?.deliveryStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="px-2 py-1 border rounded bg-gray-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Returned">Returned</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Failed Delivery">Failed Delivery</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative max-h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>

            {/* Order Header */}
            <h2 className="text-xl font-semibold text-center mb-4">
              Order Details
            </h2>

            {/* User Details */}
            <div className="border-b pb-2 mb-2">
              <h3 className="text-lg font-semibold mb-1">User Details</h3>
              <p>
                <strong>Name:</strong> {selectedOrder?.user?.name}
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Products</h3>

              <div className="flex items-center gap-2 p-2 border rounded-lg shadow-sm">
                <img
                  src={selectedOrder?.orderItems?.product?.images?.[0]}
                  alt={selectedOrder.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">
                    {selectedOrder?.orderItems?.product?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {selectedOrder?.orderItems?.quantity}
                  </p>
                  <p className="text-xs text-gray-500">
                    Amount: ${selectedOrder?.totalPrice}
                  </p>
                </div>
              </div>
              {/* ))} */}
            </div>

            {/* Close Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
