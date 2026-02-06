import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderSummary from "../components/OrderSummary";

export const CreateOrderPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const selectedTotal = cart
    .filter((item) => item.checked)
    .reduce(
      (sum, item) => sum + (item.product?.price || 0) * (item.count || 0),
      0
    );
  const shippingCost = selectedTotal > 0 ? 39.9 : 0;
  const discountAmount = discountCode === "WIT-2026" ? 30 : 0;
  const grandTotal = selectedTotal + shippingCost - discountAmount;

  return (
    <section className="mt-28 md:mt-36 mx-auto max-w-6xl px-4 font-montserrat">
      <h2 className="text-2xl font-bold text-logo-blue mb-6">
        Siparişi Oluştur
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1" />
        <OrderSummary
          selectedTotal={selectedTotal}
          shippingCost={shippingCost}
          discountAmount={discountAmount}
          grandTotal={grandTotal}
          showDiscountInput={showDiscountInput}
          setShowDiscountInput={setShowDiscountInput}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
        />
      </div>
    </section>
  );
};
