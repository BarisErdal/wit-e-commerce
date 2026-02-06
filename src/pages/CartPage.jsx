import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";
import OrderSummary from "../components/OrderSummary";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  toggleCartItem,
} from "../redux/actions/cartActions..js";

export const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
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
      <h2 className="text-2xl font-bold text-logo-blue mb-4">
        Sepetim ({cart.length} Ürün)
      </h2>

      <div className="flex items-center gap-3 bg-[#F2F6FF] text-dark-bg rounded-md px-4 py-3 mb-6">
        <CheckCircle2 className="text-success" size={18} />
        <p className="text-sm font-semibold">
          Sepetindeki ürünleri bireysel veya kurumsal fatura seçerek alabilirsin.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white rounded-sm border border-light2-gray shadow-sm flex-1">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold text-second-text border-b border-light2-gray">
            <div className="col-span-6">ÜRÜN</div>
            <div className="col-span-2 text-center">ADET</div>
            <div className="col-span-2 text-right">FİYAT</div>
            <div className="col-span-2 text-right">İŞLEM</div>
          </div>

          {cart.length === 0 ? (
            <div className="px-6 py-10 text-center text-second-text">
              Sepetin boş
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product?.id}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-center border-b border-light2-gray last:border-b-0"
              >
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={!!item.checked}
                    onChange={() =>
                      dispatch(toggleCartItem(item.product?.id))
                    }
                    className="h-4 w-4 accent-orange-400"
                  />
                  <img
                    src={item.product?.images?.[0]?.url || "/shop/p1.jpg"}
                    alt={item.product?.name || "Product"}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="min-w-0 md:max-w-75">
                    <p className="text-sm font-semibold text-dark-bg truncate">
                      {item.product?.name || "Ürün"}
                    </p>
                    <p className="text-xs text-second-text line-clamp-2">
                      {item.product?.description || "Ürün açıklaması"}
                    </p>
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2 flex md:justify-center">
                  <div className="inline-flex items-center border rounded-md overflow-hidden">
                    <button
                      className="px-3 py-2 text-second-text hover:bg-gray-100"
                      onClick={() =>
                        dispatch(decrementCartItem(item.product?.id))
                      }
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-2 text-sm font-semibold">
                      {item.count}
                    </span>
                    <button
                      className="px-3 py-2 text-second-text hover:bg-gray-100"
                      onClick={() =>
                        dispatch(incrementCartItem(item.product?.id))
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="col-span-4 md:col-span-2 text-right text-sm font-semibold text-reduced-price-color">
                  {(item.product?.price || 0).toFixed(2)} ₺
                </div>

                <div className="col-span-2 md:col-span-2 flex justify-end">
                  <button
                    className="text-second-text hover:text-red-500"
                    onClick={() =>
                      dispatch(removeCartItem(item.product?.id))
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div className="flex items-center justify-between px-5 py-4 bg-[#F7F9FC]">
              <p className="text-sm font-semibold text-second-text">
                Seçili ürünler toplamı
              </p>
              <p className="text-lg font-bold text-dark-bg">
                {selectedTotal.toFixed(2)} ₺
              </p>
            </div>
          )}
        </div>

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
