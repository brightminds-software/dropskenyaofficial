"use client";

import { useState, useEffect, useCallback } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  thumbnail?: string; // Added to support Lower Thirds component
  category?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Icon = ({ name, size = 20, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "close") return <svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>;
  if (name === "trash") return <svg {...common}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6M14 11v6" /></svg>;
  if (name === "check") return <svg {...common}><path d="m5 12 4 4L19 7" /></svg>;
  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
  if (name === "cart") return <svg {...common}><path d="M3 4h2l1.6 10.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 1.9-1.4L20 8H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg>;
  if (name === "bag") return <svg {...common}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
  if (name === "alert") return <svg {...common}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>;
  return null;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const loadCart = useCallback(() => {
    try {
      const saved = localStorage.getItem("dropsKenyaCart");
      const cart = saved ? JSON.parse(saved) : [];
      setCartItems(Array.isArray(cart) ? cart : []);
      setSelectedIds(new Set(cart.map((item: CartItem) => item.id)));
    } catch {
      setCartItems([]);
      setSelectedIds(new Set());
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadCart();
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, loadCart]);

  useEffect(() => {
    const handleStorage = () => loadCart();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("cartUpdated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cartUpdated", handleStorage);
    };
  }, [loadCart]);

  const removeFromCart = (itemId: string) => {
    try {
      const updated = cartItems.filter((item) => item.id !== itemId);
      localStorage.setItem("dropsKenyaCart", JSON.stringify(updated));
      setCartItems(updated);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
      window.dispatchEvent(new Event("storage"));
    } catch {}
  };

  const toggleSelect = (itemId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === cartItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cartItems.map((item) => item.id)));
    }
  };

  // Opens the custom modal instead of using window.confirm
  const requestClearCart = () => {
    setShowClearConfirm(true);
  };

  const executeClearCart = () => {
    localStorage.removeItem("dropsKenyaCart");
    setCartItems([]);
    setSelectedIds(new Set());
    setShowClearConfirm(false);
    window.dispatchEvent(new Event("storage"));
  };

  const selectedItems = cartItems.filter((item) => selectedIds.has(item.id));
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const allSelected = cartItems.length > 0 && selectedIds.size === cartItems.length;

  const sendOrderToWhatsApp = (items: CartItem[]) => {
    if (items.length === 0) return;

    const phoneNumber = "254745736283";
    const itemList = items
      .map((item, idx) => `${idx + 1}. ${item.title} - KES ${item.price.toLocaleString()}`)
      .join("\n");
    const total = items.reduce((sum, item) => sum + item.price, 0);

    const message = `Hello DropsKenya,\n\nI would like to order the following items from my cart:\n\n${itemList}\n\nTotal: KES ${total.toLocaleString()}\n\nPlease send me the payment details.\n\nThank you.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen && isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-[#151519] border-l border-white/[0.07] shadow-2xl shadow-black/60 transition-transform duration-300 ease-out ${
          isOpen && isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 text-white">
              <Icon name="bag" size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Your Cart</h2>
              <p className="text-[10px] font-semibold text-zinc-500">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close cart"
          >
            <Icon name="close" size={17} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.07]">
                <Icon name="cart" size={32} />
              </div>
              <h3 className="text-lg font-black text-white">Your cart is empty</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Browse our products and add your favorites to get started.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-purple-900/20 transition hover:from-purple-400 hover:to-orange-400"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Select All Bar */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.07] bg-[#151519]/95 px-5 py-3 backdrop-blur-md">
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center gap-2 text-xs font-bold text-zinc-300 transition hover:text-white"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      allSelected
                        ? "border-purple-500 bg-purple-500 text-white"
                        : "border-white/20 bg-white/[0.03]"
                    }`}
                  >
                    {allSelected && <Icon name="check" size={10} />}
                  </span>
                  Select All
                </button>
                <button
                  onClick={requestClearCart}
                  className="text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:text-red-300"
                >
                  Clear Cart
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 p-5 pb-32">
                {cartItems.map((item) => {
                  const isSelected = selectedIds.has(item.id);
                  // Fallback to thumbnail for Lower Thirds, or a default logo
                  const displayImage = item.image || item.thumbnail || "/images/logo.jpg";

                  return (
                    <div
                      key={item.id}
                      className={`group flex gap-3 rounded-xl border p-3 transition ${
                        isSelected
                          ? "border-purple-500/30 bg-purple-500/5"
                          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleSelect(item.id)}
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                          isSelected
                            ? "border-purple-500 bg-purple-500 text-white"
                            : "border-white/20 bg-white/[0.03] hover:border-white/40"
                        }`}
                        aria-label={isSelected ? "Deselect item" : "Select item"}
                      >
                        {isSelected && <Icon name="check" size={11} />}
                      </button>

                      {/* Thumbnail */}
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/[0.07] bg-black/40">
                        <img
                          src={displayImage}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        {item.category && (
                          <p className="text-[9px] font-bold uppercase tracking-wider text-purple-400">
                            {item.category}
                          </p>
                        )}
                        <h4 className="mt-0.5 truncate text-sm font-bold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm font-black text-white">
                          KES {item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="shrink-0 border-t border-white/[0.07] bg-[#151519] p-4">
            {/* Subtotal */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
              </span>
              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Subtotal</p>
                <p className="text-xl font-black text-white">
                  KES {subtotal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => sendOrderToWhatsApp(selectedItems)}
                disabled={selectedItems.length === 0}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-4 py-3 text-xs font-black text-white shadow-lg shadow-purple-900/20 transition hover:from-purple-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Order Selected ({selectedItems.length})
                <Icon name="arrow" size={14} />
              </button>
              <button
                onClick={() => sendOrderToWhatsApp(cartItems)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold text-white transition hover:bg-white/[0.08]"
              >
                Order All ({cartItems.length})
              </button>
            </div>

            <p className="mt-2 text-center text-[9px] text-zinc-500">
              You will be redirected to WhatsApp to complete your order
            </p>
          </div>
        )}
      </div>

      {/* ==========================================
          CUSTOM CLEAR CART CONFIRMATION MODAL
      ========================================== */}
      {showClearConfirm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setShowClearConfirm(false); }}
        >
          <div className="w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#17171b] shadow-2xl">
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                <Icon name="alert" size={24} />
              </div>
              <h3 className="text-lg font-black tracking-tight text-white">Clear Cart?</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                This will permanently remove all {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} from your cart. This action cannot be undone.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-bold text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={executeClearCart}
                  className="rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
                >
                  Yes, Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </>
  );
}