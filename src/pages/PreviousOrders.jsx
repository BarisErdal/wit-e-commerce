import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Package, Wallet, ChevronDown } from "lucide-react";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: token } : {};
};

const formatMoney = (value) => Number(value || 0).toFixed(2);

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getOrderId = (order) =>
  order?.id || order?.order_id || order?.orderId || order?.code || "WIT-ORDER";

const getOrderItems = (order) => order?.products || order?.items || [];

const getOrderTotal = (order) =>
  order?.price || order?.total || order?.grandTotal || 0;

export const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/order", { headers: getAuthHeaders() });
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        if (isMounted) {
          setOrders(list);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Siparisler yuklenemedi.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mt-28 md:mt-36 mx-auto max-w-6xl px-4 font-montserrat">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-logo-blue">
            Onceki Siparislerim
          </h2>
          <p className="text-sm text-second-text mt-1">
            Tum siparislerinizi ve detaylarini buradan goruntuleyebilirsiniz.
          </p>
        </div>
      </div>

      {loading && (
        <div className="bg-white border border-light2-gray rounded-md shadow-sm p-6 text-sm text-second-text">
          Yukleniyor...
        </div>
      )}

      {!loading && error && (
        <div className="bg-white border border-red-200 rounded-md shadow-sm p-6 text-sm text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="bg-white border border-light2-gray rounded-md shadow-sm p-6 text-sm text-second-text">
          Henuz bir siparisiniz bulunmuyor.
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <>
          <div className="hidden md:block bg-white border border-light2-gray rounded-md shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F7F9FC] text-second-text text-xs">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">
                    Siparis
                  </th>
                  <th className="text-left font-semibold px-5 py-3">Tarih</th>
                  <th className="text-left font-semibold px-5 py-3">
                    Urun Adedi
                  </th>
                  <th className="text-left font-semibold px-5 py-3">
                    Toplam
                  </th>
                  <th className="text-left font-semibold px-5 py-3">
                    Detay
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const orderId = getOrderId(order);
                  const items = getOrderItems(order);
                  return (
                    <tr
                      key={orderId}
                      className="border-t border-light2-gray"
                    >
                      <td className="px-5 py-4 font-semibold text-dark-bg">
                        {orderId}
                      </td>
                      <td className="px-5 py-4 text-second-text">
                        {formatDate(order?.order_date || order?.orderDate)}
                      </td>
                      <td className="px-5 py-4 text-second-text">
                        {items.length}
                      </td>
                      <td className="px-5 py-4 font-semibold text-dark-bg">
                        {formatMoney(getOrderTotal(order))} TL
                      </td>
                      <td className="px-5 py-4">
                        <details className="group">
                          <summary className="flex items-center gap-2 text-orange-500 cursor-pointer select-none">
                            <ChevronDown size={16} className="group-open:rotate-180 transition" />
                            Detaylari Gor
                          </summary>
                          <div className="mt-3 space-y-3">
                            {items.length === 0 ? (
                              <p className="text-xs text-second-text">
                                Siparis kalemi bulunamadi.
                              </p>
                            ) : (
                              items.map((item) => (
                                <div
                                  key={item.product_id || item.product?.id}
                                  className="flex items-start gap-3 border border-light2-gray rounded-md p-3"
                                >
                                  <img
                                    src={
                                      item.product?.images?.[0]?.url ||
                                      "/shop/p1.jpg"
                                    }
                                    alt={item.product?.name || "Urun"}
                                    className="w-12 h-12 object-cover rounded-md border"
                                  />
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-dark-bg">
                                      {item.product?.name || "Urun"}
                                    </p>
                                    <p className="text-xs text-second-text">
                                      {item.product?.description || item.detail || "-"}
                                    </p>
                                    <div className="text-xs text-second-text mt-1">
                                      Adet: {item.count || 1}
                                    </div>
                                  </div>
                                  <div className="text-sm font-semibold text-dark-bg">
                                    {formatMoney(item.product?.price)} TL
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </details>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {orders.map((order) => {
              const orderId = getOrderId(order);
              const items = getOrderItems(order);
              return (
                <div
                  key={orderId}
                  className="bg-white border border-light2-gray rounded-md shadow-sm p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-dark-bg">
                      {orderId}
                    </p>
                    <p className="text-xs text-second-text">
                      {formatDate(order?.order_date || order?.orderDate)}
                    </p>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-second-text">
                    <div className="flex items-center gap-2">
                      <Package size={14} />
                      {items.length} urun
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet size={14} />
                      {formatMoney(getOrderTotal(order))} TL
                    </div>
                  </div>
                  <details className="group mt-4">
                    <summary className="flex items-center gap-2 text-orange-500 cursor-pointer select-none text-sm font-semibold">
                      <ChevronDown size={16} className="group-open:rotate-180 transition" />
                      Detaylari Gor
                    </summary>
                    <div className="mt-3 space-y-3">
                      {items.length === 0 ? (
                        <p className="text-xs text-second-text">
                          Siparis kalemi bulunamadi.
                        </p>
                      ) : (
                        items.map((item) => (
                          <div
                            key={item.product_id || item.product?.id}
                            className="flex items-start gap-3 border border-light2-gray rounded-md p-3"
                          >
                            <img
                              src={
                                item.product?.images?.[0]?.url || "/shop/p1.jpg"
                              }
                              alt={item.product?.name || "Urun"}
                              className="w-12 h-12 object-cover rounded-md border"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-dark-bg">
                                {item.product?.name || "Urun"}
                              </p>
                              <p className="text-xs text-second-text">
                                {item.product?.description || item.detail || "-"}
                              </p>
                              <div className="text-xs text-second-text mt-1">
                                Adet: {item.count || 1}
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-dark-bg">
                              {formatMoney(item.product?.price)} TL
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};
