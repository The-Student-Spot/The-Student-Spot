import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const FloatingSocials = () => {
  return (
    <div className="hidden md:flex fixed right-0 top-[65%] z-[9999] flex-col">

      {/* Instagram */}
      <a
        href="https://www.instagram.com/the_studentspot"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white hover:w-14 transition-all duration-300"
      >
        <FaInstagram size={16} />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/thestudentspot/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-[#0077B5] flex items-center justify-center text-white hover:w-14 transition-all duration-300"
      >
        <FaLinkedinIn size={16} />
      </a>

      {/* WhatsApp */}
      <a
        href="https://whatsapp.com/channel/0029Vb6ft6072WTxJ5eMKA2I"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-[#25D366] flex items-center justify-center text-white hover:w-14 transition-all duration-300"
      >
        <FaWhatsapp size={16} />
      </a>

    </div>
  );
};

export default FloatingSocials;
