function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-300">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-10 row-gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Logo & Description */}
            <div className="sm:col-span-2">
              <a href="/" className="inline-flex items-center">
                <img
                  src="/images/aishorts-logo.png"
                  alt="AiShorts Logo"
                  className="h-12 w-auto"
                />
                <span className="ml-2 text-xl font-bold tracking-wide uppercase text-white">
                  A<span className="lowercase">i</span>Shorts
                </span>
              </a>
              <p className="mt-6 text-sm">
                AiShorts delivers AI-generated answers within 60 words, offering 
                quick, concise, and accurate insights for all your queries.
              </p>
            </div>
  
            {/* Contact Info */}
            <div>
              <h3 className="text-base font-semibold text-white">Contact</h3>
              <p className="mt-2">
                <span className="font-medium">Email: </span>
                <a
                  href="mailto:muhammadabid.dev@gmail.com"
                  className="hover:text-gray-400 transition-colors"
                >
                  muhammadabid.dev@gmail.com
                </a>
              </p>
              <p className="mt-2">
                <span className="font-medium">GitHub: </span>
                <a
                  href="https://github.com/dev-muhammadabid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  dev-muhammadabid
                </a>
              </p>
            </div>
  
            {/* Social Media */}
            <div>
              <h3 className="text-base font-semibold text-white">Follow Us</h3>
              <div className="mt-3 flex space-x-3">
                <a href="/" className="hover:text-gray-400 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0zM7.12 20.47H3.56V9h3.56v11.47zM5.34 7.54a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM20.47 20.47h-3.56v-5.59c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.16 1.45-2.16 2.95v5.69h-3.56V9h3.42v1.56h.05c.48-.91 1.66-1.86 3.42-1.86 3.66 0 4.34 2.41 4.34 5.54v6.23z"></path>
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-sm">
                Stay updated with the latest AI-powered insights and features.
              </p>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm">
            © 2024 AiShorts Inc. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  