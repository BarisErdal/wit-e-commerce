import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Package, MapPin, CreditCard } from "lucide-react";

const formatMoney = (value) => Number(value || 0).toFixed(2);

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const OrderSummaryPage = () => {
  const location = useLocation();
  const summary = location.state?.summary;

  if (!summary) {
    return (
      <section className="mt-28 md:mt-36 mx-auto max-w-5xl px-4 font-montserrat">
        <div className="bg-white border border-light2-gray rounded-md shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-dark-bg">
            SipariÅŸ Ã¶zeti bulunamadÄ±
          </h2>
          <p className="text-sm text-second-text mt-2">
           Sipariş özeti sayfasına doğrudan eriştiniz. Yeni bir
           sipariş oluşturmak için mağazaya dönebilirsiniz.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="rounded-md bg-orange-500 text-white text-sm font-semibold py-3 px-5 hover:bg-orange-600 transition"
            >
              Alışverişe Dön
            </Link>
            <Link
              to="/cart"
              className="rounded-md border border-orange-500 text-orange-500 text-sm font-semibold py-3 px-5 hover:bg-orange-50 transition"
            >
              Sepete Git
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const orderNumber =
    summary.orderNumber ||
    summary.order?.id ||
    summary.order?.order_id ||
    summary.order?.orderId ||
    summary.order?.code ||
    `WIT-${String(summary.orderDate || "")
      .replace(/\D/g, "")
      .slice(-12)}`;

  const shippingAddress = summary.shippingAddress;
  const billingAddress = summary.billingAddress;
  const items = summary.items || [];

  return (
    <section className="mt-28 md:mt-36 mx-auto max-w-6xl px-4 font-montserrat">
      <div className="bg-white border border-light2-gray rounded-md shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="text-success" size={26} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-success">
              Siparişiniz alındı
            </p>
            <h2 className="text-2xl font-bold text-dark-bg mt-1">
              Sipariş Özetiniz hazır
            </h2>
            <p className="text-sm text-second-text mt-2">
              Sipariş numaranız:{" "}
              <span className="font-semibold text-dark-bg">{orderNumber}</span>
            </p>
            {summary.orderDate && (
              <p className="text-xs text-second-text mt-1">
                Sipariş tarihi: {formatDate(summary.orderDate)}
              </p>
            )}
          </div>
          <div className="hidden md:flex flex-col items-end">
            <Link
              to="/shop"
              className="rounded-md bg-orange-500 text-white text-sm font-semibold py-3 px-5 hover:bg-orange-600 transition"
            >
              Alışverişe Dön
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-6 mt-6">
        <div className="space-y-6">
          <div className="bg-white border border-light2-gray rounded-md shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package size={18} className="text-orange-500" />
              <h3 className="text-base font-bold text-dark-bg">
                Sipariş Detayları
              </h3>
            </div>
            <div className="space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-second-text">
                  Sipariş kalemi bulunamadı.
                </p>
              ) : (
                items.map((item) => (
                <div
                  key={item.product?.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-light2-gray pb-4 last:border-b-0 last:pb-0"
                >
                  <img
                    src={item.product?.images?.[0]?.url || "/shop/p1.jpg"}
                    alt={item.product?.name || "ÃœrÃ¼n"}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-dark-bg truncate">
                      {item.product?.name || "ÃœrÃ¼n"}
                    </p>
                    <p className="text-xs text-second-text line-clamp-2">
                      {item.product?.description || "ÃœrÃ¼n aÃ§Ä±klamasÄ±"}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-second-text">
                      <span>Adet: {item.count}</span>
                      <span>
                        Birim: {formatMoney(item.product?.price)} TL
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-dark-bg">
                    {formatMoney(
                      (item.product?.price || 0) * (item.count || 0)
                    )}{" "}
                    TL
                  </div>
                </div>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-light2-gray rounded-md shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-orange-500" />
                <h3 className="text-base font-bold text-dark-bg">
                  Teslimat Adresi
                </h3>
              </div>
              {shippingAddress ? (
                <div className="text-sm text-second-text space-y-1">
                  <p className="font-semibold text-dark-bg">
                    {shippingAddress.title}
                  </p>
                  <p>
                    {shippingAddress.name} {shippingAddress.surname}
                  </p>
                  <p>{shippingAddress.phone}</p>
                  <p>
                    {shippingAddress.neighborhood}, {shippingAddress.district},{" "}
                    {shippingAddress.city}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-second-text">
                  Teslimat adresi bulunamadÄ±.
                </p>
              )}
            </div>

            <div className="bg-white border border-light2-gray rounded-md shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-orange-500" />
                <h3 className="text-base font-bold text-dark-bg">
                  Fatura Adresi
                </h3>
              </div>
              {billingAddress ? (
                <div className="text-sm text-second-text space-y-1">
                  <p className="font-semibold text-dark-bg">
                    {billingAddress.title}
                  </p>
                  <p>
                    {billingAddress.name} {billingAddress.surname}
                  </p>
                  <p>{billingAddress.phone}</p>
                  <p>
                    {billingAddress.neighborhood}, {billingAddress.district},{" "}
                    {billingAddress.city}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-second-text">
                  Fatura adresi bulunamadÄ±.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="bg-white border border-light2-gray rounded-md shadow-sm h-fit">
          <div className="px-5 py-4 border-b border-light2-gray">
            <h3 className="text-base font-bold text-dark-bg">
              Sipariş Özeti
            </h3>
          </div>
          <div className="px-5 py-4 space-y-3 text-sm">
            <div className="flex items-center justify-between text-second-text">
              <span>Ara Sipariş Toplam</span>
              <span className="font-semibold text-dark-bg">
                {formatMoney(summary.totals?.selectedTotal)} TL
              </span>
            </div>
            <div className="flex items-center justify-between text-second-text">
              <span>Kargo</span>
              <span className="font-semibold text-dark-bg">
                {formatMoney(summary.totals?.shippingCost)} TL
              </span>
            </div>
            <div className="flex items-center justify-between text-second-text">
              <span>İndirim</span>
              <span className="font-semibold text-dark-bg">
                -{formatMoney(summary.totals?.discountAmount)} TL
              </span>
            </div>
            <div className="h-px bg-[#EEF2F6]" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-second-text">
                Toplam
              </span>
              <span className="text-lg font-bold text-dark-bg">
                {formatMoney(summary.totals?.grandTotal)} TL
              </span>
            </div>
          </div>
          <div className="px-5 pb-5">
            <div className="flex items-center gap-2 text-xs text-second-text mb-3">
              <CreditCard size={16} className="text-orange-500" />
              <span>Ödeme Bilgisi</span>
            </div>
            {summary.payment ? (
              <div className="text-sm text-second-text space-y-1">
                <p className="font-semibold text-dark-bg">
                  {summary.payment.name_on_card}
                </p>
                <p>**** **** **** {summary.payment.last4}</p>
                <p>
                  SKT: {String(summary.payment.expire_month).padStart(2, "0")}
                  /{summary.payment.expire_year}
                </p>
              </div>
            ) : (
              <p className="text-sm text-second-text">
                Ödeme bilgisi bulunamadÄ±.
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
