import { Clapperboard, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden shadow-2xl">
      {/* Wave Background - Focused on wave part */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://i.ibb.co/j98JCBhc/wave-haikei-6.png"
          alt="Wave background"
          className="w-full h-full object-cover object-bottom"
        />
      </div>
      {/* Footer Content */}
      <div className="relative z-10 px-4 py-8 md:px-6 md:py-12">
        <div className="container mx-auto max-w-6xl">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Clapperboard className="w-6 h-6 text-white" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">CineVibe</h2>
            </div>
          </div>
          {/* Navigation Links */}
          <nav className="flex justify-center mb-12">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 text-white">
              <li>
                <a href="/" className="hover:text-pink-200 transition-colors text-base sm:text-lg">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-pink-200 transition-colors text-base sm:text-lg">
                  About
                </a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-pink-200 transition-colors text-base sm:text-lg">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-pink-200 transition-colors text-base sm:text-lg">
                  Pricing Plan
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-pink-200 transition-colors text-base sm:text-lg">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
          </div>
          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/90 text-sm">Copyright ©2025 by Ticstube</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
