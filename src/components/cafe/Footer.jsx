import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer flex items-center justify-center border-t border-[#4E6308] p-6 bg-white py-4">
      <div className="footer-logo">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="logo-block flex items-center justify-center w-12 h-12 bg-[#4E6308] rounded-xl shrink-0">
            <img src="/Logo.png" className="w-10 h-10 object-contain" alt="Logo" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold text-[#4E6308] leading-none">
              Find&Eat
            </span>
            <span className="text-[#567100] opacity-50 text-xs">
              made by: kloqaep
            </span>
          </div>
        </NavLink>
      </div>
    </footer>
  );
}