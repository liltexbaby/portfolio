export default function Footer() {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="w-full max-w-[75%] mx-auto py-10">
        <div className="flex flex-col gap-4 font-system text-sm md:text-base leading-relaxed">
          <div>Based in Brooklyn, NY</div>

          <div>
            <a
              href="mailto:x@jonathanpinto.net"
              className="underline underline-offset-2 decoration-2 hover:text-magenta transition-colors duration-200"
            >
              x@jonathanpinto.net
            </a>
          </div>

          <div>
            <a
              href="/JonathanPintoResume2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-2 hover:text-magenta transition-colors duration-200"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}