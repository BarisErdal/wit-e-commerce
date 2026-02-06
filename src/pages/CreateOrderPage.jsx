import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import OrderSummary from "../components/OrderSummary";

const cityOptions = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Aksaray",
  "Amasya",
  "Ankara",
  "Antalya",
  "Ardahan",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bartın",
  "Batman",
  "Bayburt",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Düzce",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Iğdır",
  "Isparta",
  "İstanbul",
  "İzmir",
  "Kahramanmaraş",
  "Karabük",
  "Karaman",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kilis",
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Mardin",
  "Mersin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Osmaniye",
  "Rize",
  "Sakarya",
  "Samsun",
  "Şanlıurfa",
  "Siirt",
  "Sinop",
  "Sivas",
  "Şırnak",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Uşak",
  "Van",
  "Yalova",
  "Yozgat",
  "Zonguldak",
];

const emptyAddressForm = {
  title: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
  district: "",
  neighborhood: "",
};

export const CreateOrderPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const [step, setStep] = useState(1);
  const [addressList, setAddressList] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState("");

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [addressForm, setAddressForm] = useState(emptyAddressForm);

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

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: token } : {};
  };

  const fetchAddresses = useCallback(async () => {
    setAddressLoading(true);
    setAddressError("");
    try {
      const res = await api.get("/user/address", {
        headers: getAuthHeaders(),
      });
      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setAddressList(list);
      if (!shippingAddressId && list.length > 0) {
        setShippingAddressId(list[0].id);
      }
      if (!billingAddressId && list.length > 0) {
        setBillingAddressId(list[0].id);
      }
    } catch (err) {
        console.error(err);
      setAddressError("Adresler y�klenemedi.");
    } finally {
      setAddressLoading(false);
    }
  }, [billingAddressId, shippingAddressId]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddressId(shippingAddressId);
    }
  }, [sameAsShipping, shippingAddressId]);

  const resetForm = () => {
    setAddressForm(emptyAddressForm);
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
    setAddressForm({
      title: address.title || "",
      name: address.name || "",
      surname: address.surname || "",
      phone: address.phone || "",
      city: address.city || "",
      district: address.district || "",
      neighborhood: address.neighborhood || "",
    });
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await api.delete(`/user/address/${addressId}`, {
        headers: getAuthHeaders(),
      });
      setAddressList((prev) => prev.filter((item) => item.id !== addressId));
      if (shippingAddressId === addressId) {
        setShippingAddressId(null);
      }
      if (billingAddressId === addressId) {
        setBillingAddressId(null);
      }
    } catch (err) {
        console.error(err);
      setAddressError("Adres silinemedi.");
    }
  };

  const handleAddressSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formMode === "edit" && editingId) {
        await api.put(
          "/user/address",
          { id: editingId, ...addressForm },
          { headers: getAuthHeaders() }
        );
      } else {
        await api.post("/user/address", addressForm, {
          headers: getAuthHeaders(),
        });
      }
      await fetchAddresses();
      setShowAddressForm(false);
      resetForm();
    } catch (err) {
        console.error(err);
      setAddressError("Adres kaydedilemedi.");
    }
  };

  const handleFormChange = (field, value) => {
    setAddressForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="mt-28 md:mt-36 mx-auto max-w-6xl px-4 font-montserrat">
      <h2 className="text-2xl font-bold text-logo-blue mb-6">
        Siparişi Oluştur
      </h2>

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
                      {formMode === "edit" ? "G�ncelle" : "Kaydet"}
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
                        shippingAddressId === address.id
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
                          checked={shippingAddressId === address.id}
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
                        billingAddressId === address.id
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
                          checked={billingAddressId === address.id}
                          onChange={() => setBillingAddressId(address.id)}
                          disabled={sameAsShipping}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-md bg-orange-500 text-white text-sm font-semibold py-3 px-6 hover:bg-orange-600"
                >
                  Kaydet ve Devam Et
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-md border border-light2-gray shadow-sm p-5">
              <h3 className="text-lg font-bold text-dark-bg">
                Ödeme Seçenekleri
              </h3>
              <p className="text-sm text-second-text mt-2">
                Bu ad�m yak�nda eklenecek.
              </p>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-semibold text-second-text"
                >
                  Geri Dön
                </button>
                <button
                  type="button"
                  className="rounded-md bg-orange-500 text-white text-sm font-semibold py-3 px-6 hover:bg-orange-600"
                >
                  Siparişi Tamamla
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
        />
      </div>
    </section>
  );
};
