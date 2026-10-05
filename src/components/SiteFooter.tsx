export function SiteFooter() {
  return (
    <footer className="border-t border-[#29483b] bg-[#06110d]">
      <div className="shell flex flex-col gap-6 py-8 text-sm text-[#8ca99a] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} J Nova Systems</p>
        <p>Product engineering · Web · Mobile · SaaS · Cloud</p>
        <a href="#home" className="focus-ring w-fit text-[#effff5]">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
