import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "../components/OrderSummary";
import { cityOptions } from "../data/cities";
import {
  createAddress,
  deleteAddress,
  fetchAddresses,
  fetchCards,
  createCard,
  updateCard,
  deleteCard,
  setAddress,
  setPayment,
  setCart,
  updateAddress,
  createOrder,
} from "../redux/actions/cartActions..js";


const emptyAddressForm = {
  title: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
  district: "",
  neighborhood: "",
};

const emptyCardForm = {
  card_no: "",
  expire_month: "",
  expire_year: "",
  name_on_card: "",
};

export const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const storedAddressForm = useSelector((state) => state.cart.address);
  const payment = useSelector((state) => state.cart.payment);
  const addressList = useSelector((state) => state.cart.addressList);
  const addressLoading = useSelector((state) => state.cart.addressLoading);
  const addressError = useSelector((state) => state.cart.addressError);
  const cardList = useSelector((state) => state.cart.cardList);
  const cardLoading = useSelector((state) => state.cart.cardLoading);
  const cardError = useSelector((state) => state.cart.cardError);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [cardCcv, setCardCcv] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState("");

  const [step, setStep] = useState(1);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const addressForm = { ...emptyAddressForm, ...storedAddressForm };

  const [showCardForm, setShowCardForm] = useState(false);
  const [cardFormMode, setCardFormMode] = useState("create");
  const [cardEditingId, setCardEditingId] = useState(null);
  const [cardForm, setCardForm] = useState(emptyCardForm);

  const [shippingAddressId, setShippingAddressId] = useState(null);
  const [billingAddressId, setBillingAddressId] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const selectedTotal = cart
    .filter((item) => item.checked)
    .reduce(
      (sum, item) => sum + (item.product?.price || 0) * (item.count || 0),
      0
    );
  const shippingCost = selectedTotal > 0 ? 39.9 : 0;
  const discountAmount = discountCode === "WIT-2026" ? 30 : 0;
  const grandTotal = selectedTotal + shippingCost - discountAmount;
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  useEffect(() => {
    if (!payment?.selectedCardId && cardList.length > 0) {
      dispatch(setPayment({ selectedCardId: cardList[0].id }));
    }
  }, [cardList, dispatch, payment?.selectedCardId]);

  const derivedShippingAddressId =
    shippingAddressId ?? addressList[0]?.id ?? null;
  const derivedBillingAddressId = sameAsShipping
    ? derivedShippingAddressId
    : billingAddressId ?? addressList[0]?.id ?? null;

  const resetCardForm = () => {
    setCardForm(emptyCardForm);
    setCardFormMode("create");
    setCardEditingId(null);
  };

  const handleAddCardClick = () => {
    resetCardForm();
    setShowCardForm(true);
  };

  const handleEditCard = (card) => {
    setCardFormMode("edit");
    setCardEditingId(card.id);
    setCardForm({
      card_no: card.card_no || "",
      expire_month: card.expire_month || "",
      expire_year: card.expire_year || "",
      name_on_card: card.name_on_card || "",
    });
    setShowCardForm(true);
  };

  const handleDeleteCard = async (cardId) => {
    const ok = await dispatch(deleteCard(cardId));
    if (!ok) return;
    if (payment?.selectedCardId === cardId) {
      dispatch(setPayment({ selectedCardId: null }));
    }
  };

  const handleCardSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      card_no: String(cardForm.card_no || "").replace(/\s/g, ""),
      expire_month: Number(cardForm.expire_month),
      expire_year: Number(cardForm.expire_year),
      name_on_card: cardForm.name_on_card,
    };
    if (cardFormMode === "edit" && cardEditingId) {
      const ok = await dispatch(
        updateCard({ id: cardEditingId, ...payload })
      );
      if (!ok) return;
      setShowCardForm(false);
      resetCardForm();
      return;
    }
    const ok = await dispatch(createCard(payload));
    if (!ok) return;
    setShowCardForm(false);
    resetCardForm();
  };

  const handleCardFormChange = (field, value) => {
    setCardForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const maskCardNumber = (value) => {
    const digits = String(value || "").replace(/\D/g, "");
    if (digits.length < 4) return digits;
    return `**** **** **** ${digits.slice(-4)}`;
  };

  const resetOrderState = () => {
    setStep(1);
    setShowAddressForm(false);
    setShowCardForm(false);
    resetForm();
    resetCardForm();
    setSameAsShipping(true);
    setShippingAddressId(null);
    setBillingAddressId(null);
    setDiscountCode("");
    setShowDiscountInput(false);
    setCardCcv("");
    dispatch(setPayment({}));
  };

  const handleCreateOrder = async () => {
    setOrderError("");
    setOrderSuccess("");

    const selectedItems = cart.filter((item) => item.checked);
    if (!derivedShippingAddressId) {
      setOrderError("Lütfen teslimat adresi seçin.");
      return;
    }
    if (!payment?.selectedCardId) {
      setOrderError("Lütfen bir kart seçin.");
      return;
    }
    if (selectedItems.length === 0) {
      setOrderError("Sepetinizde seçili ürün bulunamadÄ±.");
      return;
    }
    if (!cardCcv || String(cardCcv).trim().length < 3) {
      setOrderError("Lütfen geçerli bir CVC girin.");
      return;
    }

    const selectedCard = cardList.find(
      (card) => card.id === payment.selectedCardId
    );
    if (!selectedCard) {
      setOrderError("Seçili kart bulunamadı.");
      return;
    }

    const payload = {
      address_id: derivedShippingAddressId,
      order_date: new Date().toISOString(),
      card_no: String(selectedCard.card_no || "").replace(/\s/g, ""),
      card_name: selectedCard.name_on_card || "",
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(cardCcv),
      price: grandTotal,
      products: selectedItems.map((item) => ({
        product_id: item.product?.id,
        count: item.count || 1,
        detail: item.product?.description || "",
      })),
    };

    setOrderLoading(true);
    const result = await dispatch(createOrder(payload));
    setOrderLoading(false);

    if (!result) {
      setOrderError("Sipariş Oluşturulamadı.");
      return;
    }

    setOrderSuccess("Siparişiniz alındı. Tebrikler!");
    dispatch(setCart([]));
    resetOrderState();
  };

  const resetForm = () => {
    dispatch(setAddress(emptyAddressForm));
    setFormMode("create");
    setEditingId(null);
  };

  const handleAddAddressClick = () => {
    resetForm();
    setShowAddressForm(true);
  };

  const handleEditAddress = (address) => {
    setFormMode("edit");
    setEditingId(address.id);
    dispatch(
      setAddress({
        title: address.title || "",
        name: address.name || "",
        surname: address.surname || "",
        phone: address.phone || "",
        city: address.city || "",
        district: address.district || "",
        neighborhood: address.neighborhood || "",
      })
    );
    setShowAddressForm(true);
  };
  const handleDeleteAddress = async (addressId) => {
    const ok = await dispatch(deleteAddress(addressId));
    if (!ok) return;
    if (shippingAddressId === addressId) {
      setShippingAddressId(null);
    }
    if (billingAddressId === addressId) {
      setBillingAddressId(null);
    }
  };
  const handleAddressSubmit = async (event) => {
    event.preventDefault();
    if (formMode === "edit" && editingId) {
      const ok = await dispatch(
        updateAddress({ id: editingId, ...addressForm })
      );
      if (!ok) return;
      setShowAddressForm(false);
      resetForm();
      return;
    }
    const ok = await dispatch(createAddress(addressForm));
    if (!ok) return;
    setShowAddressForm(false);
    resetForm();
  };

  const handleFormChange = (field, value) => {
    dispatch(setAddress({ ...addressForm, [field]: value }));
  };

  return (
    <section className="mt-28 md:mt-36 mx-auto max-w-6xl px-4 font-montserrat">
      <h2 className="text-2xl font-bold text-logo-blue mb-6">
        Siparişi Oluştur
      </h2>

      {orderSuccess && (
        <div className="mb-6 rounded-md border border-success/40 bg-success/10 px-4 py-3 text-sm font-semibold text-success">
          {orderSuccess}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div
              className={`flex-1 border rounded-md p-4 ${
                step === 1
                  ? "border-orange-500 bg-orange-50"
                  : "border-light2-gray bg-white"
              }`}
            >
              <p className="text-sm font-semibold text-orange-500">1</p>
              <p className="text-base font-bold text-dark-bg">
                Adres Bilgileri
              </p>
            </div>
            <div
              className={`flex-1 border rounded-md p-4 ${
                step === 2
                  ? "border-orange-500 bg-orange-50"
                  : "border-light2-gray bg-white"
              }`}
            >
              <p className="text-sm font-semibold text-orange-500">2</p>
              <p className="text-base font-bold text-dark-bg">
                Ödeme Seçenekleri
              </p>
            </div>
          </div>

          {step === 1 && (
            <div className="bg-white rounded-md border border-light2-gray shadow-sm p-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-dark-bg">
                  Adres Bilgileri
                </h3>
                <button
                  type="button"
                  onClick={handleAddAddressClick}
                  className="text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  + Yeni Adres Ekle
                </button>
              </div>

              {addressLoading && (
                <p className="text-sm text-second-text">Y�kleniyor...</p>
              )}
              {addressError && (
                <p className="text-sm text-red-500">{addressError}</p>
              )}

              {!addressLoading && addressList.length === 0 && (
                <p className="text-sm text-second-text">
                  Kayıtlı adres bulunamadı.
                </p>
              )}

              {showAddressForm && (
                <form
                  onSubmit={handleAddressSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-light2-gray rounded-md p-4"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-second-text">
                      Adres Başlığı
                    </label>
                    <input
                      type="text"
                      value={addressForm.title}
                      onChange={(event) =>
                        handleFormChange("title", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-second-text">
                      Ad
                    </label>
                    <input
                      type="text"
                      value={addressForm.name}
                      onChange={(event) =>
                        handleFormChange("name", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      placeholder="Ad"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-second-text">
                      Soyad
                    </label>
                    <input
                      type="text"
                      value={addressForm.surname}
                      onChange={(event) =>
                        handleFormChange("surname", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      placeholder="Soyad"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-second-text">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={addressForm.phone}
                      onChange={(event) =>
                        handleFormChange("phone", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-second-text">
                      İl
                    </label>
                    <select
                      value={addressForm.city}
                      onChange={(event) =>
                        handleFormChange("city", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Şehir seçiniz</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city.toLowerCase()}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-second-text">
                      İlçe
                    </label>
                    <input
                      type="text"
                      value={addressForm.district}
                      onChange={(event) =>
                        handleFormChange("district", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-semibold text-second-text">
                      Mahalle / Adres Detayı
                    </label>
                    <textarea
                      rows={3}
                      value={addressForm.neighborhood}
                      onChange={(event) =>
                        handleFormChange("neighborhood", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 md:col-span-2">
                    <button
                      type="submit"
                      className="rounded-md bg-orange-500 text-white text-sm font-semibold py-2 px-4 hover:bg-orange-600"
                    >
                      {formMode === "edit" ? "Güncelle" : "Kaydet"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);
                        resetForm();
                      }}
                      className="text-sm font-semibold text-second-text"
                    >
                      Vazgeç
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-dark-bg">
                    Teslimat Adresi
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addressList.map((address) => (
                    <label
                      key={`shipping-${address.id}`}
                      className={`border rounded-md p-4 cursor-pointer transition ${
                        derivedShippingAddressId === address.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-light2-gray"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-dark-bg">
                            {address.title}
                          </p>
                          <p className="text-xs text-second-text">
                            {address.name} {address.surname}
                          </p>
                          <p className="text-xs text-second-text">
                            {address.phone}
                          </p>
                          <p className="text-xs text-second-text">
                            {address.neighborhood}, {address.district},{" "}
                            {address.city}
                          </p>
                        </div>
                        <input
                          type="radio"
                          name="shippingAddress"
                          checked={derivedShippingAddressId === address.id}
                          onChange={() => setShippingAddressId(address.id)}
                        />
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => handleEditAddress(address)}
                          className="text-xs font-semibold text-orange-500"
                        >
                          Düzenle
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-xs font-semibold text-red-500"
                        >
                          Sil
                        </button>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-dark-bg">
                    Fatura Adresi
                  </h4>
                  <label className="flex items-center gap-2 text-xs text-second-text">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(event) =>
                        setSameAsShipping(event.target.checked)
                      }
                    />
                    Faturamı aynı adrese gönder
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addressList.map((address) => (
                    <label
                      key={`billing-${address.id}`}
                      className={`border rounded-md p-4 cursor-pointer transition ${
                      derivedBillingAddressId === address.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-light2-gray"
                      } ${sameAsShipping ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-dark-bg">
                            {address.title}
                          </p>
                          <p className="text-xs text-second-text">
                            {address.name} {address.surname}
                          </p>
                          <p className="text-xs text-second-text">
                            {address.phone}
                          </p>
                          <p className="text-xs text-second-text">
                            {address.neighborhood}, {address.district},{" "}
                            {address.city}
                          </p>
                        </div>
                        <input
                          type="radio"
                          name="billingAddress"
                        checked={derivedBillingAddressId === address.id}
                        onChange={() => setBillingAddressId(address.id)}
                          disabled={sameAsShipping}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-md border border-light2-gray shadow-sm p-5">
              <h3 className="text-lg font-bold text-dark-bg">
                Ödeme Seçenekleri
              </h3>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-second-text">
                  Kayıtlı kartlarınız
                </p>
                <button
                  type="button"
                  onClick={handleAddCardClick}
                  className="text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  + Yeni Kart Ekle
                </button>
              </div>

              {cardLoading && (
                <p className="text-sm text-second-text mt-3">Yükleniyor...</p>
              )}
              {cardError && (
                <p className="text-sm text-red-500 mt-3">{cardError}</p>
              )}

              {!cardLoading && cardList.length === 0 && (
                <p className="text-sm text-second-text mt-3">
                  Kayıtlı kart bulunamadı.
                </p>
              )}

              {showCardForm && (
                <form
                  onSubmit={handleCardSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-light2-gray rounded-md p-4 mt-4"
                >
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-semibold text-second-text">
                      Kart Üzerindeki İsim
                    </label>
                    <input
                      type="text"
                      value={cardForm.name_on_card}
                      onChange={(event) =>
                        handleCardFormChange("name_on_card", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      placeholder="Ali Baş"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-semibold text-second-text">
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatCardNumber(cardForm.card_no)}
                      onChange={(event) =>
                        handleCardFormChange("card_no", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      placeholder="1234 1234 1234 1234"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-second-text">
                      Son Kullanma Ayı
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={cardForm.expire_month}
                      onChange={(event) =>
                        handleCardFormChange("expire_month", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      placeholder="12"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-second-text">
                      Son Kullanma Yılı
                    </label>
                    <input
                      type="number"
                      min="2024"
                      max="2100"
                      value={cardForm.expire_year}
                      onChange={(event) =>
                        handleCardFormChange("expire_year", event.target.value)
                      }
                      className="rounded-md border px-3 py-2 text-sm"
                      placeholder="2026"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 md:col-span-2">
                    <button
                      type="submit"
                      className="rounded-md bg-orange-500 text-white text-sm font-semibold py-2 px-4 hover:bg-orange-600"
                    >
                      {cardFormMode === "edit" ? "G�ncelle" : "Kaydet"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCardForm(false);
                        resetCardForm();
                      }}
                      className="text-sm font-semibold text-second-text"
                    >
                      Vazgeç
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {cardList.map((card) => (
                  <label
                    key={`card-${card.id}`}
                    className={`border rounded-md p-4 cursor-pointer transition ${
                      payment?.selectedCardId === card.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-light2-gray"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-dark-bg">
                          {card.name_on_card}
                        </p>
                        <p className="text-xs text-second-text">
                          {maskCardNumber(card.card_no)}
                        </p>
                        <p className="text-xs text-second-text">
                          SKT: {String(card.expire_month).padStart(2, "0")}/
                          {card.expire_year}
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="paymentCard"
                        checked={payment?.selectedCardId === card.id}
                        onChange={() =>
                          dispatch(setPayment({ selectedCardId: card.id }))
                        }
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => handleEditCard(card)}
                        className="text-xs font-semibold text-orange-500"
                      >
                        Düzenle
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card.id)}
                        className="text-xs font-semibold text-red-500"
                      >
                        Sil
                      </button>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-4 max-w-xs">
                <label className="text-xs font-semibold text-second-text">
                  CVC
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  value={cardCcv}
                  onChange={(event) => setCardCcv(event.target.value)}
                  className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
              {orderError && (
                <p className="text-sm text-red-500 mt-3">{orderError}</p>
              )}
              {orderSuccess && (
                <p className="text-sm text-success mt-3">{orderSuccess}</p>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-semibold text-second-text"
                >
                  Geri Dön
                </button>
              </div>
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
          primaryActionLabel="Kaydet ve Devam Et"
          onPrimaryAction={() => setStep(2)}
          showPrimaryAction={step === 1}
          secondaryActionLabel="Siparişi Tamamla"
          secondaryActionLoadingLabel="İşleniyor..."
          onSecondaryAction={handleCreateOrder}
          secondaryActionDisabled={orderLoading}
          showSecondaryAction={step === 2}
          showDiscountSection={false}
          showConfirm={false}
        />
      </div>
    </section>
  );
};

