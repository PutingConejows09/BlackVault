export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-gray-800 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          Developed by{" "}
          <span className="text-yellow-400 font-semibold">
            Don Conejo Software Solutions
          </span>
        </p>
        <p className="text-gray-600 text-xs mt-1">
          © {new Date().getFullYear()} Black Vault Investigations. All rights reserved.
        </p>
      </div>
    </footer>
  );
}