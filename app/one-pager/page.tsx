import Image from "next/image";

export default function OnePager() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#0D1B2A] px-8 py-12">
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
              width={180}
              height={72}
              className="h-18 w-auto"
            />
            <div className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2">
              <span className="text-sm font-semibold tracking-wide text-[#D4AF37]">
                FOUNDING 50 PROGRAM
              </span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h1 className="bg-gradient-to-r from-[#D4AF37] via-[#F4E784] to-[#D4AF37] bg-clip-text text-xl font-semibold leading-relaxed text-transparent md:text-2xl lg:text-3xl">
              Preserve your expertise. Onboard faster. Grow without losing knowledge.
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl">
        
        {/* Problem & Solution - Two Column Layout */}
        <section className="grid gap-0 lg:grid-cols-2">
          
          {/* Problem */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 px-8 py-16 lg:px-12">
            <div className="mb-6 inline-flex items-center rounded-full bg-red-100 px-4 py-2">
              <span className="mr-2 text-xl">🚩</span>
              <h2 className="text-lg font-bold text-red-800">THE PROBLEM</h2>
            </div>
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-800">
                    <strong>Weeks of confusion:</strong> New hires spend forever piecing together repos, infra, and tribal knowledge.
                  </p>
                </div>
              </div>
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                    <span className="text-lg">🕑</span>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-800">
                    <strong>Constant interruptions:</strong> Senior engineers lose time answering the same questions repeatedly.
                  </p>
                </div>
              </div>
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                    <span className="text-lg">🔄</span>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-800">
                    <strong>Knowledge drain:</strong> Institutional memory walks out the door when people leave.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#0D1B2A] px-8 py-16 lg:px-12">
            <div className="mb-6 inline-flex items-center rounded-full bg-[#D4AF37]/20 px-4 py-2">
              <span className="mr-2 text-xl">⚡</span>
              <h2 className="text-lg font-bold text-[#D4AF37]">THE SOLUTION</h2>
            </div>
            <h3 className="mb-6 text-2xl font-bold text-white lg:text-3xl">Atlasium</h3>
            <p className="mb-8 text-lg leading-relaxed text-gray-300">
              An AI-powered onboarding platform that creates <em className="text-[#D4AF37]">proactive walkthroughs</em> of your codebases, infra, and workflows.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white/5 p-4">
                <div className="mb-2 text-xl">🎯</div>
                <p className="text-sm text-gray-300">Structured evolving tours, not just Q&A</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <div className="mb-2 text-xl">📊</div>
                <p className="text-sm text-gray-300">Visual diagrams & dependency maps</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <div className="mb-2 text-xl">📈</div>
                <p className="text-sm text-gray-300">Knowledge compounds over time</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <div className="mb-2 text-xl">🚀</div>
                <p className="text-sm text-gray-300">Every hire ramps faster than the last</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits - Three Cards */}
        <section className="bg-gradient-to-r from-gray-50 via-white to-gray-50 px-8 py-16">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-[#D4AF37]/10 px-6 py-3">
              <span className="mr-2 text-2xl">🌟</span>
              <h2 className="text-xl font-bold text-[#0D1B2A]">BENEFITS</h2>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-3xl">⏱️</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Faster ramp-up</h3>
              <p className="text-gray-600 leading-relaxed">Cut onboarding from months to weeks with guided, contextual learning paths.</p>
            </div>
            <div className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-3xl">🧑‍💻</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Reduced interruptions</h3>
              <p className="text-gray-600 leading-relaxed">Senior engineers focus on building, not answering the same questions repeatedly.</p>
            </div>
            <div className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Knowledge retention</h3>
              <p className="text-gray-600 leading-relaxed">Build institutional memory that grows stronger and never walks out the door.</p>
            </div>
          </div>
        </section>

        {/* Founding 50 Program */}
        <section className="bg-gradient-to-br from-[#D4AF37]/5 via-[#D4AF37]/10 to-[#D4AF37]/5 px-8 py-16">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-[#D4AF37] px-6 py-3">
              <span className="mr-2 text-2xl">🎯</span>
              <h2 className="text-xl font-bold text-[#0D1B2A]">THE FOUNDING 50 PROGRAM</h2>
            </div>
            <h3 className="mb-8 text-2xl font-bold text-gray-900 lg:text-3xl">
              Join 50 forward-thinking engineering teams
            </h3>
            <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 text-3xl">🚀</div>
                <h4 className="mb-2 font-semibold text-gray-900">Early Access</h4>
                <p className="text-gray-600">Get first access to Atlasium&apos;s MVP and cutting-edge features.</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 text-3xl">🗣️</div>
                <h4 className="mb-2 font-semibold text-gray-900">Shape the Product</h4>
                <p className="text-gray-600">Influence our roadmap with your real onboarding pain points.</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 text-3xl">💎</div>
                <h4 className="mb-2 font-semibold text-gray-900">Founding Benefits</h4>
                <p className="text-gray-600">Special pricing, priority support, and exclusive access.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Footer */}
      <footer className="relative bg-gradient-to-r from-[#0D1B2A] via-[#1B263B] to-[#0D1B2A] px-8 py-16 text-center">
        <div className="absolute inset-0 opacity-50">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8">
            <span className="text-4xl">🚀</span>
          </div>
          <h2 className="mb-6 bg-gradient-to-r from-[#D4AF37] via-[#F4E784] to-[#D4AF37] bg-clip-text text-3xl font-bold leading-tight text-transparent lg:text-4xl">
            Ready to transform your onboarding?
          </h2>
          <p className="mb-8 text-xl text-gray-300">
            Apply now to join the Atlasium Founding 50 and shape the future of AI-native onboarding.
          </p>
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-[#D4AF37] px-8 py-4 shadow-2xl">
              <span className="mr-3 text-2xl">👉</span>
              <span className="text-xl font-bold text-[#0D1B2A]">atlasium.org</span>
            </div>
            <div className="text-lg text-gray-400">
              <span>📩 Questions? Reach us at </span>
              <span className="font-semibold text-[#D4AF37]">team@atlasium.org</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}