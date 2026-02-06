const OrderSummary = ({
  selectedTotal,
  shippingCost,
  discountAmount,
  grandTotal,
  showDiscountInput,
  setShowDiscountInput,
  discountCode,
  setDiscountCode,
  onConfirm,
}) => {
  return (
    <aside className="w-full lg:w-96 bg-white rounded-sm border border-light2-gray shadow-sm h-fit">
      <div className="px-5 py-4 border-b border-light2-gray">
        <h3 className="text-base font-bold text-dark-bg">Order Summary</h3>
      </div>
      <div className="px-5 py-4 space-y-3 text-sm">
        <div className="flex items-center justify-between text-second-text">
          <span>Ürün Toplam</span>
          <span className="font-semibold text-dark-bg">
            {selectedTotal.toFixed(2)} TL
          </span>
        </div>
        <div className="flex items-center justify-between text-second-text">
          <span>Kargo</span>
          <span className="font-semibold text-dark-bg">
            {shippingCost.toFixed(2)} TL
          </span>
        </div>
        <div className="flex items-center justify-between text-second-text">
          <span>İndirim</span>
          <span className="font-semibold text-dark-bg">
            -{discountAmount.toFixed(2)} TL
          </span>
        </div>
        <div className="h-px bg-[#EEF2F6]" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-second-text">
            Toplam
          </span>
          <span className="text-lg font-bold text-dark-bg">
            {grandTotal.toFixed(2)} TL
          </span>
        </div>
      </div>
      <div className="px-5 pb-5 space-y-3">
        <button
          type="button"
          onClick={() => setShowDiscountInput((prev) => !prev)}
          className="text-sm font-semibold text-orange-500 hover:text-orange-600"
        >
          + indirim kodu gir
        </button>
        {showDiscountInput && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-second-text">
              İndirim Kodu
            </label>
            <input
              type="text"
              placeholder="Kodu giriniz"
              value={discountCode}
              onChange={(event) => setDiscountCode(event.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm text-dark-bg placeholder:text-second-text focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        )}
        <button
          className="w-full rounded-md bg-orange-500 text-white text-sm font-semibold py-3 hover:bg-orange-600 transition"
          type="button"
          onClick={onConfirm}
        >
          Sepeti Onayla
        </button>
      </div>
    </aside>
  );
};

export default OrderSummary;
