export function ShopNowButton() {
  return (
    <button
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      className="mt-8 bg-black cursor-pointer text-white rounded-lg px-6 py-3 font-medium"
    >
      আজই অর্ডার করুন
    </button>
  );
}
