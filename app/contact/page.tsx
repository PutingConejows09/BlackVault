"use client";

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            CONTACT US
          </h1>
          <p className="text-lg text-gray-300">
            Get in touch with Black Vault Investigations
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-black/40 backdrop-blur-sm border border-red-900/50 rounded-lg p-6 md:p-8 hover:border-red-700 transition-all shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center border border-red-700">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-red-400 mb-2 uppercase tracking-wider">
                  EMAIL
                </h3>
                <a href="mailto:inv.blackvault@gmail.com" className="text-lg md:text-xl text-white hover:text-red-400 transition-colors break-all">
                  inv.blackvault@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-red-900/50 rounded-lg p-6 md:p-8 hover:border-red-700 transition-all shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center border border-red-700">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-red-400 mb-2 uppercase tracking-wider">
                  PHONE
                </h3>
                <a href="tel:+639854032959" className="text-lg md:text-xl text-white hover:text-red-400 transition-colors">
                  +63 985 403 2959
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-900/20 border border-red-700/50 rounded-lg">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-300 font-medium">
                All inquiries are strictly confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}