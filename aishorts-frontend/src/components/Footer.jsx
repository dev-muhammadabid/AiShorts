function Footer() {
  return (
    <>
      <div className="bg-gray-800">
        <div className=" px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <a
                href="#"
                aria-label="Go home"
                title="AiShorts"
                className="inline-flex items-center"
              >
                {/* <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12"></rect>
              <rect x="3" y="17" width="7" height="6"></rect>
              <rect x="14" y="1" width="7" height="6"></rect>
              <rect x="14" y="11" width="7" height="12"></rect>
            </svg> */}
                <img
                  alt="AiShorts Logo"
                  src="./public/aishorts-logo.png"
                  className="h-12 w-auto"
                />
                <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">
                  A<span className="lowercase">i</span>Shorts
                </span>
              </a>
              <div className="mt-6 lg:max-w-sm">
                <p className="text-sm text-gray-300">
                  AiShorts is a cutting-edge platform designed to deliver crisp,
                  AI-generated answers within a 60-word limit. Perfect for those
                  seeking fast, accurate, and summarized insights.
                </p>
                <p className="mt-4 text-sm text-gray-300">
                  AiShorts delivers offering quick, accurate, and versatile
                  solutions for FAQs, summaries, and learning, all in a
                  time-saving format.
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-base font-bold tracking-wide text-gray-100">
                Contacts
              </p>
              <div className="flex">
                {/* <p className="mr-1 text-gray-200">Phone:</p>
            <a
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-gray-200 hover:text-gray-400"
            >
              850-123-5021
            </a> */}
              </div>
              <div className="flex">
                <p className="mr-1 text-gray-100">Email:</p>
                <a
                  href="mailto:muhammadabid.dev@gmail.com"
                  aria-label="Our email"
                  title="Our email"
                  className="transition-colors duration-300 text-gray-300 hover:text-gray-400"
                >
                  muhammadabid.dev@gmail.com
                </a>
              </div>
              <div className="flex">
                <p className="mr-1 text-gray-100">GitHub:</p>
                <a
                  href="https://github.com/dev-muhammadabid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Our git-username"
                  title="Our git-username"
                  className="transition-colors duration-300 text-gray-300 hover:text-gray-400"
                >
                  dev-muhammadabid
                </a>
              </div>
            </div>
            <div>
              <span className="text-base font-bold tracking-wide text-gray-300">
                Social
              </span>
              <div className="flex items-center mt-2 space-x-3">
                <a
                  href="/"
                  className="text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0zM7.12 20.47H3.56V9h3.56v11.47zM5.34 7.54a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM20.47 20.47h-3.56v-5.59c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.16 1.45-2.16 2.95v5.69h-3.56V9h3.42v1.56h.05c.48-.91 1.66-1.86 3.42-1.86 3.66 0 4.34 2.41 4.34 5.54v6.23z"></path>
                  </svg>
                </a>

                {/* <a
              href="/"
              className="text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                <circle cx="15" cy="15" r="4"></circle>
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
              </svg>
            </a>
            <a
              href="/"
              className="text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path>
              </svg>
            </a> */}
              </div>
              <p className="mt-4 text-sm text-gray-300">
                Never miss an update! Follow us for the latest features, tips,
                and AI-powered insights.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-center pt-5 pb-10 border-t lg:flex-row">
            <p className="text-sm text-gray-300">
              © Copyright 2024 AiShorts Inc. All rights reserved.
            </p>
            {/* <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a
              href="/"
              className="text-sm text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              F.A.Q
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              Terms &amp; Conditions
            </a>
          </li>
        </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
