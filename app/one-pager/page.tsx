import Image from "next/image";

export default function OnePager() {
  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white font-sans">
      {/* Header */}
      <header className="bg-[#0D1B2A] px-4 py-3 border-b border-[#D4AF37]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <Image
              src="/atlasium-modern-transparent-logo.png"
              alt="Atlasium logo"
              width={120}
              height={48}
              className="h-10 w-auto"
            />
            <div className="bg-[#D4AF37] text-[#0D1B2A] px-4 py-1 rounded-full">
              <span className="text-sm font-bold">🎯 FOUNDING 50</span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#D4AF37]">
              Living memory for your code, infra, and workflows.
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4">
        
        {/* Problem & Solution */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          
          {/* Problem */}
          <div className="bg-red-800 p-4 rounded-lg">
            <div className="bg-red-600 text-white px-4 py-2 rounded-full text-center mb-4">
              <h2 className="text-sm font-bold">🚩 THE PROBLEM</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold mb-1">⏳ Wasted Weeks</h3>
                <p className="text-gray-200 text-sm">Engineering teams waste weeks rediscovering tribal knowledge whenever someone joins or leaves.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">💬 Constant Interruptions</h3>
                <p className="text-gray-200 text-sm">Context is lost, and senior engineers are constantly interrupted, slowing down the entire team.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">🚶 Knowledge Drain</h3>
                <p className="text-gray-200 text-sm">Your most valuable knowledge walks out the door when people leave, and documentation quickly becomes outdated.</p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-[#1B263B] p-4 rounded-lg">
            <div className="bg-[#D4AF37] text-[#0D1B2A] px-4 py-2 rounded-full text-center mb-4">
              <h2 className="text-sm font-bold">⚡ THE SOLUTION</h2>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Atlasium</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Atlasium turns a company’s code, infrastructure, and workflows into living walkthroughs that evolve with every update. We help engineers onboard faster, keep context alive, and make documentation intelligent and always up to date.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#D4AF37] bg-opacity-20 p-2 rounded text-center">
                <p className="text-xs text-gray-200">🎯 Living walkthroughs</p>
              </div>
              <div className="bg-[#D4AF37] bg-opacity-20 p-2 rounded text-center">
                <p className="text-xs text-gray-200">🗺️ Visual diagrams & maps</p>
              </div>
              <div className="bg-[#D4AF37] bg-opacity-20 p-2 rounded text-center">
                <p className="text-xs text-gray-200">🧠 Knowledge compounds</p>
              </div>
              <div className="bg-[#D4AF37] bg-opacity-20 p-2 rounded text-center">
                <p className="text-xs text-gray-200">🚀 Always up to date</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-[#0D1B2A] bg-opacity-50 p-4 rounded-lg mb-6">
          <div className="text-center mb-4">
            <div className="bg-[#D4AF37] text-[#0D1B2A] px-4 py-2 rounded-full inline-block">
              <h2 className="text-sm font-bold">🌟 BENEFITS</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center border border-white border-opacity-20">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-bold text-sm mb-1">Onboard Faster</h3>
              <p className="text-xs text-gray-300">Turn your code, infra, and workflows into living walkthroughs that evolve with every update.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center border border-white border-opacity-20">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-bold text-sm mb-1">Intelligent Docs</h3>
              <p className="text-xs text-gray-300">Keep context alive, and make documentation intelligent and always up to date.</p>
            </div>
          </div>
        </div>

        {/* Founding 50 Program */}
        <div className="bg-[#D4AF37] bg-opacity-10 p-4 rounded-lg">
          <div className="text-center mb-4">
            <div className="bg-[#D4AF37] text-[#0D1B2A] px-4 py-2 rounded-full inline-block mb-2">
              <h2 className="text-sm font-bold">🎯 FOUNDING 50 PROGRAM</h2>
            </div>
            <h3 className="text-lg font-bold text-white">
              Join 50 forward-thinking engineering teams
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center border border-[#D4AF37] border-opacity-50">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold text-sm mb-1 text-white">Early Access</h4>
              <p className="text-xs text-gray-300">Get first access to Atlasium&apos;s MVP and cutting-edge features.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center border border-[#D4AF37] border-opacity-50">
              <div className="text-2xl mb-2">🗣️</div>
              <h4 className="font-semibold text-sm mb-1 text-white">Shape the Product</h4>
              <p className="text-xs text-gray-300">Influence our roadmap with your real onboarding pain points.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center border border-[#D4AF37] border-opacity-50">
              <div className="text-2xl mb-2">💎</div>
              <h4 className="font-semibold text-sm mb-1 text-white">Founding Benefits</h4>
              <p className="text-xs text-gray-300">Special pricing, priority support, and exclusive access.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] px-4 py-3 text-center border-t border-[#D4AF37]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold text-[#D4AF37] mb-2">
            Ready to transform your onboarding?
          </h2>
          <div className="bg-[#D4AF37] text-[#0D1B2A] px-6 py-2 rounded-full inline-block mb-2">
            <span className="text-sm font-bold">👉 atlasium.org</span>
          </div>
          <div className="text-xs text-gray-400">
            <span className="font-semibold text-[#D4AF37]">📩 team@atlasium.org</span>
          </div>
        </div>
      </footer>
    </div>
  );
}