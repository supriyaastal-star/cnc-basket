import { t } from "@/lib/i18n";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-3 shodow-md">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm">
          © {new Date().getFullYear()}{t("yourCompanyAllRightseserved")}
        </p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-400">{t("privacy")}</a>
          <a href="#" className="hover:text-gray-400">{t("terms")}</a>
          <a href="#" className="hover:text-gray-400">{t("contact")}</a>
        </div>

      </div>
    </footer>
  );
}
