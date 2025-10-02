import Image from "next/image";

export default function OnePager() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#0D1B2A] px-8 py-6">
        <div className="absolute inset-0 opacity-50">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <Image
              src="/atlasium-modern-transparent-logo.png"
              alt="Atlasium logo"
              width={140}
              height={56}
              className="h-12 w-auto"
            />
            <div className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2">
              <span className="text-sm font-semibold tracking-wide text-[#D4AF37]">
                FOUNDING 50 PROGRAM
              </span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h1 className="bg-gradient-to-r from-[#D4AF37] via-[#F4E784] to-[#D4AF37] bg-clip-text text-lg font-semibold leading-relaxed text-transparent md:text-xl lg:text-2xl">
              Preserve your expertise. Onboard faster. Grow without losing knowledge.
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl">
        
        {/* Problem & Solution - Two Column Layout */}
        <section className="grid grid-cols-2 gap-0">
          
          {/* Problem */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 px-4 py-6">
            <div className="mb-3 inline-flex items-center rounded-full bg-red-100 px-2 py-1">
              <span className="mr-1 text-sm">🚩</span>
              <h2 className="text-sm font-bold text-red-800">THE PROBLEM</h2>
            </div>
            <div className="space-y-3">
              <div className="group">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 mt-0.5">
                    <span className="text-xs">⚠️</span>
                  </div>
                  <p className="text-xs leading-tight text-gray-800">
                    <strong>Weeks of confusion:</strong> New hires spend forever piecing together repos, infra, and tribal knowledge.
                  </p>
                </div>
              </div>
              <div className="group">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 mt-0.5">
                    <span className="text-xs">🕑</span>
                  </div>
                  <p className="text-xs leading-tight text-gray-800">
                    <strong>Constant interruptions:</strong> Senior engineers lose time answering the same questions repeatedly.
                  </p>
                </div>
              </div>
              <div className="group">
                <div className="flex items-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 mt-0.5">
                    <span className="text-xs">🔄</span>
                  </div>
                  <p className="text-xs leading-tight text-gray-800">
                    <strong>Knowledge drain:</strong> Institutional memory walks out the door when people leave.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#0D1B2A] px-4 py-6">
            <div className="mb-3 inline-flex items-center rounded-full bg-[#D4AF37]/20 px-2 py-1">
              <span className="mr-1 text-sm">⚡</span>
              <h2 className="text-sm font-bold text-[#D4AF37]">THE SOLUTION</h2>
            </div>
            <h3 className="mb-2 text-lg font-bold text-white">Atlasium</h3>
            <p className="mb-3 text-xs leading-tight text-gray-300">
              An AI-powered onboarding platform that creates <em className="text-[#D4AF37]">proactive walkthroughs</em> of your codebases, infra, and workflows.
            </p>
            <div className="grid gap-1.5 grid-cols-2">
              <div className="rounded-lg bg-white/5 p-2">
                <div className="mb-1 text-sm">🎯</div>
                <p className="text-xs text-gray-300">Structured evolving tours, not just Q&A</p>
              </div>
              <div className="rounded-lg bg-white/5 p-2">
                <div className="mb-1 text-sm">📊</div>
                <p className="text-xs text-gray-300">Visual diagrams & dependency maps</p>
              </div>
              <div className="rounded-lg bg-white/5 p-2">
                <div className="mb-1 text-sm">📈</div>
                <p className="text-xs text-gray-300">Knowledge compounds over time</p>
              </div>
              <div className="rounded-lg bg-white/5 p-2">
                <div className="mb-1 text-sm">🚀</div>
                <p className="text-xs text-gray-300">Every hire ramps faster than the last</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits - Three Cards */}
        <section className="bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 py-6">
          <div className="mb-6 text-center">
            <div className="mb-2 inline-flex items-center rounded-full bg-[#D4AF37]/10 px-4 py-2">
              <span className="mr-2 text-lg">🌟</span>
              <h2 className="text-md font-bold text-[#0D1B2A]">BENEFITS</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="group relative rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <span className="text-lg">⏱️</span>
              </div>
              <h3 className="mb-2 text-md font-bold text-gray-900">Faster ramp-up</h3>
              <p className="text-xs text-gray-600 leading-snug">Cut onboarding from months to weeks with guided, contextual learning paths.</p>
            </div>
            <div className="group relative rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <span className="text-lg">🧑‍💻</span>
              </div>
              <h3 className="mb-2 text-md font-bold text-gray-900">Reduced interruptions</h3>
              <p className="text-xs text-gray-600 leading-snug">Senior engineers focus on building, not answering the same questions repeatedly.</p>
            </div>
            <div className="group relative rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <span className="text-lg">🛡️</span>
              </div>
              <h3 className="mb-2 text-md font-bold text-gray-900">Knowledge retention</h3>
              <p className="text-xs text-gray-600 leading-snug">Build institutional memory that grows stronger and never walks out the door.</p>
            </div>
          </div>
        </section>

        {/* Founding 50 Program */}
        <section className="bg-gradient-to-br from-[#D4AF37]/5 via-[#D4AF37]/10 to-[#D4AF37]/5 px-6 py-6">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center rounded-full bg-[#D4AF37] px-4 py-2">
              <span className="mr-2 text-lg">🎯</span>
              <h2 className="text-md font-bold text-[#0D1B2A]">THE FOUNDING 50 PROGRAM</h2>
            </div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 lg:text-xl">
              Join 50 forward-thinking engineering teams
            </h3>
            <div className="mx-auto grid max-w-4xl gap-3 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <div className="mb-2 text-lg">🚀</div>
                <h4 className="mb-1 text-sm font-semibold text-gray-900">Early Access</h4>
                <p className="text-xs text-gray-600">Get first access to Atlasium&apos;s MVP and cutting-edge features.</p>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <div className="mb-2 text-lg">🗣️</div>
                <h4 className="mb-1 text-sm font-semibold text-gray-900">Shape the Product</h4>
                <p className="text-xs text-gray-600">Influence our roadmap with your real onboarding pain points.</p>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <div className="mb-2 text-lg">💎</div>
                <h4 className="mb-1 text-sm font-semibold text-gray-900">Founding Benefits</h4>
                <p className="text-xs text-gray-600">Special pricing, priority support, and exclusive access.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Footer */}
      <footer className="relative bg-gradient-to-r from-[#0D1B2A] via-[#1B263B] to-[#0D1B2A] px-6 py-8 text-center">
        <div className="absolute inset-0 opacity-50">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h2 className="mb-3 bg-gradient-to-r from-[#D4AF37] via-[#F4E784] to-[#D4AF37] bg-clip-text text-xl font-bold leading-tight text-transparent lg:text-2xl">
            Ready to transform your onboarding?
          </h2>
          <p className="mb-4 text-sm text-gray-300">
            Apply now to join the Atlasium Founding 50 and shape the future of AI-native onboarding.
          </p>
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full bg-[#D4AF37] px-6 py-3 shadow-2xl">
              <span className="mr-2 text-lg">👉</span>
              <span className="text-lg font-bold text-[#0D1B2A]">atlasium.org</span>
            </div>
            <div className="text-sm text-gray-400">
              <span>📩 Questions? Reach us at </span>
              <span className="font-semibold text-[#D4AF37]">team@atlasium.org</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}