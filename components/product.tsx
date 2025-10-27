import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { CheckCircle2, Code, Mic, Brain, RefreshCw, Zap, Shield, Globe } from "lucide-react";

export default function Product() {
  const features = [
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice-Narrated Walkthroughs",
      description: "AI-powered voice narration explains code patterns, architectural decisions, and workflows, just like having a senior engineer guide you through the codebase."
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Living Documentation",
      description: "Automatically syncs with your codebase via event streams. When code changes, documentation updates itself. No more stale docs."
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Domain-Aware AI",
      description: "Learns your specific industry patterns like fintech KYC flows, healthtech HIPAA compliance, insurance underwriting logic, and more."
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Beyond Code: Full System Coverage",
      description: "Maps your entire engineering stack: application code, infrastructure-as-code (Terraform, K8s), CI/CD pipelines, deployment workflows, and operational processes. Not just a code documentation tool."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast Integration",
      description: "Connect to GitHub, GitLab, or Bitbucket in minutes. Works with your existing CI/CD pipeline and development workflow."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "SOC 2 compliant, end-to-end encryption, role-based access control. Your code never leaves your infrastructure."
    }
  ];

  const useCases = [
    {
      title: "Onboarding New Engineers",
      description: "New team members get voice-guided tours of your systems, architecture, and workflows, helping them become productive faster without monopolizing senior engineers' time."
    },
    {
      title: "Preserving Tribal Knowledge",
      description: "Capture expertise from senior engineers before they leave or switch projects. Their knowledge becomes interactive walkthroughs that benefit your team forever."
    },
    {
      title: "Context Switching",
      description: "Engineers moving between projects can quickly understand unfamiliar systems with narrated explanations of architecture, dependencies, and key patterns."
    },
    {
      title: "Infrastructure & DevOps",
      description: "Help DevOps engineers understand deployment pipelines, infrastructure configurations, and operational workflows without weeks of shadowing senior team members."
    },
    {
      title: "Incident Response",
      description: "During outages, quickly understand unfamiliar systems like infrastructure dependencies, deployment processes, and service relationships without hunting through scattered documentation."
    }
  ];

  return (
    <motion.section
      id="product"
      className="w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={itemVariants} className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-[#D4AF37]">Our Product</h2>
        <div className="mx-auto h-1 w-24 bg-[#D4AF37]/50"></div>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[#F8F9FA]">
          Atlasium transforms your engineering knowledge into an intelligent, voice-narrated platform
          that never goes out of date
        </p>
      </motion.div>

      {/* Development Stage */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="rounded-lg border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/20 to-transparent p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-[#D4AF37]/20 p-3">
              <Globe className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold text-[#D4AF37]">Founding 50 Program</h3>
              <p className="mb-3 text-base leading-relaxed text-[#F8F9FA]">
                We're building Atlasium with <strong>50 select engineering teams</strong> who will help shape the product
                from the ground up. We're currently in active development, working toward our first beta release with
                voice-narrated walkthroughs, code and infrastructure analysis, repository integrations, and automatic syncing.
              </p>
              <p className="text-sm text-[#F8F9FA]/80">
                Our beta launch is planned for Q1 2026, with general availability in Q2 2026. Founding 50 partners
                get the earliest access, lifetime early-adopter pricing, and direct influence over our product roadmap.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Features */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3 className="mb-6 text-center text-2xl font-semibold text-[#D4AF37]">Core Features</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6 transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#D4AF37]/10"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[#D4AF37]/10 p-3 text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37]/20">
                {feature.icon}
              </div>
              <h4 className="mb-2 text-lg font-semibold text-[#F8F9FA]">{feature.title}</h4>
              <p className="text-sm leading-relaxed text-[#F8F9FA]/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3 className="mb-6 text-center text-2xl font-semibold text-[#D4AF37]">Common Use Cases</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6"
            >
              <h4 className="mb-2 text-lg font-semibold text-[#F8F9FA]">{useCase.title}</h4>
              <p className="text-sm leading-relaxed text-[#F8F9FA]/80">{useCase.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Product Demo / Screenshots Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3 className="mb-6 text-center text-2xl font-semibold text-[#D4AF37]">Product Preview</h3>
        <p className="mb-8 text-center text-sm text-[#F8F9FA]/70">Hover and interact with the previews below</p>
        <div className="space-y-8">
          {/* Main Dashboard Mockup */}
          <div className="overflow-hidden rounded-xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#1B263B]/90 to-[#0D1B2A] p-6 shadow-2xl">
            <div className="mb-4 text-sm font-semibold tracking-wide text-[#D4AF37]">MAIN DASHBOARD</div>
            <div className="overflow-hidden rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A] shadow-xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 border-b border-[#D4AF37]/20 bg-[#1B263B] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-2 flex-1 rounded-md bg-[#0D1B2A] px-3 py-1 text-xs text-[#F8F9FA]/70">app.atlasium.org</div>
              </div>
              {/* Dashboard content */}
              <div className="bg-gradient-to-b from-[#0D1B2A] to-[#1B263B]/40 p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#F8F9FA]">System Walkthroughs</h2>
                    <p className="mt-1 text-xs text-[#F8F9FA]/60">Your engineering knowledge base</p>
                  </div>
                  <div className="rounded-lg bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-medium text-[#D4AF37]">
                    15 Active
                  </div>
                </div>
                {/* Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <motion.div
                    className="group cursor-pointer rounded-lg border border-[#D4AF37]/30 bg-gradient-to-br from-[#1B263B] to-[#0D1B2A] p-4 transition-all hover:border-[#D4AF37]/60 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="mb-2 flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Code className="h-4 w-4 text-[#D4AF37] transition-transform group-hover:rotate-12" />
                      <span className="text-xs font-semibold text-[#D4AF37]">API Service</span>
                    </motion.div>
                    <h3 className="mb-1 text-sm font-semibold text-[#F8F9FA] transition-colors group-hover:text-[#D4AF37]">Authentication Flow</h3>
                    <p className="text-xs leading-relaxed text-[#F8F9FA]/70">Learn how JWT tokens are validated and refreshed</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-[#D4AF37]/80">8 min walkthrough</span>
                      <motion.div
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <svg className="h-4 w-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="group cursor-pointer rounded-lg border border-[#D4AF37]/30 bg-gradient-to-br from-[#1B263B] to-[#0D1B2A] p-4 transition-all hover:border-[#D4AF37]/60 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="mb-2 flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Shield className="h-4 w-4 text-[#D4AF37] transition-transform group-hover:scale-110" />
                      <span className="text-xs font-semibold text-[#D4AF37]">Infrastructure</span>
                    </motion.div>
                    <h3 className="mb-1 text-sm font-semibold text-[#F8F9FA] transition-colors group-hover:text-[#D4AF37]">K8s Deployment</h3>
                    <p className="text-xs leading-relaxed text-[#F8F9FA]/70">Understand our Kubernetes setup and CI/CD pipeline</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-[#D4AF37]/80">12 min walkthrough</span>
                      <motion.div
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <svg className="h-4 w-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="group cursor-pointer rounded-lg border border-[#D4AF37]/30 bg-gradient-to-br from-[#1B263B] to-[#0D1B2A] p-4 transition-all hover:border-[#D4AF37]/60 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="mb-2 flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Globe className="h-4 w-4 text-[#D4AF37] transition-transform group-hover:rotate-180" />
                      <span className="text-xs font-semibold text-[#D4AF37]">Database</span>
                    </motion.div>
                    <h3 className="mb-1 text-sm font-semibold text-[#F8F9FA] transition-colors group-hover:text-[#D4AF37]">Data Models</h3>
                    <p className="text-xs leading-relaxed text-[#F8F9FA]/70">Explore our PostgreSQL schema and relationships</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-[#D4AF37]/80">6 min walkthrough</span>
                      <motion.div
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <svg className="h-4 w-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                {/* Recent Activity */}
                <motion.div
                  className="mt-6 rounded-lg border border-[#D4AF37]/20 bg-[#0D1B2A]/60 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="mb-3 text-sm font-semibold text-[#D4AF37]">Recently Updated</h3>
                  <div className="space-y-2.5">
                    <motion.div
                      className="flex items-center gap-3 text-xs"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.div
                        className="h-2 w-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                      ></motion.div>
                      <span className="flex-1 text-[#F8F9FA]/90">Payment processing refactored</span>
                      <span className="text-[#F8F9FA]/50">2h ago</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3 text-xs"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="flex-1 text-[#F8F9FA]/90">New Redis caching layer added</span>
                      <span className="text-[#F8F9FA]/50">5h ago</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3 text-xs"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span className="flex-1 text-[#F8F9FA]/90">Terraform configs updated</span>
                      <span className="text-[#F8F9FA]/50">1d ago</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-[#F8F9FA]/60">
              Interactive dashboard showing your system walkthroughs and recent changes
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Walkthrough Player Mockup */}
            <div className="overflow-hidden rounded-xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#1B263B]/90 to-[#0D1B2A] p-5 shadow-xl">
              <div className="mb-4 text-sm font-semibold tracking-wide text-[#D4AF37]">WALKTHROUGH PLAYER</div>
              <div className="overflow-hidden rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]">
                <div className="bg-gradient-to-b from-[#0D1B2A] to-[#1B263B]/40 p-4">
                  {/* Title */}
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10">
                      <Mic className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-sm font-semibold text-[#F8F9FA]">Authentication Flow</h3>
                      <p className="text-xs text-[#F8F9FA]/60">Step 3 of 5: Token Validation</p>
                    </div>
                  </div>
                  {/* Code snippet */}
                  <div className="mb-4 overflow-hidden rounded-md border border-[#D4AF37]/20 bg-[#0D1B2A] p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs text-[#F8F9FA]/50">
                      <Code className="h-3 w-3" />
                      <span>src/auth/middleware.ts</span>
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <div className="text-purple-400">export const <span className="text-[#F8F9FA]">validateToken</span> = <span className="text-blue-400">async</span> (token) =&gt; {'{'}</div>
                      <div className="pl-4 text-[#F8F9FA]/80">const decoded = jwt.<span className="text-yellow-400">verify</span>(token, secret);</div>
                      <div className="pl-4 text-[#F8F9FA]/80"><span className="text-purple-400">return</span> decoded.<span className="text-yellow-400">userId</span>;</div>
                      <div className="text-purple-400">{'}'}</div>
                    </div>
                  </div>
                  {/* Narration text */}
                  <div className="mb-4 rounded-md bg-[#1B263B]/60 p-3">
                    <p className="text-xs leading-relaxed text-[#F8F9FA]/90">
                      "This middleware validates JWT tokens on every protected API request. Notice how we extract the userId from the decoded payload..."
                    </p>
                  </div>
                  {/* Player controls */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-[#0D1B2A] transition-all hover:bg-[#D4AF37]/90"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <path d="M8 5v14l11-7z"/>
                      </motion.svg>
                    </motion.button>
                    <div className="flex-1">
                      <div className="h-1.5 rounded-full bg-[#D4AF37]/20">
                        <motion.div
                          className="h-1.5 rounded-full bg-[#D4AF37]"
                          initial={{ width: "0%" }}
                          animate={{ width: "40%" }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        ></motion.div>
                      </div>
                    </div>
                    <motion.span
                      className="text-xs font-medium text-[#F8F9FA]/70"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      2:45 / 8:12
                    </motion.span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-[#F8F9FA]/60">
                Voice-narrated code walkthrough with synchronized highlighting
              </p>
            </div>

            {/* Knowledge Graph Mockup */}
            <div className="overflow-hidden rounded-xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#1B263B]/90 to-[#0D1B2A] p-5 shadow-xl">
              <div className="mb-4 text-sm font-semibold tracking-wide text-[#D4AF37]">KNOWLEDGE GRAPH</div>
              <div className="overflow-hidden rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]">
                <div className="bg-gradient-to-b from-[#0D1B2A] to-[#1B263B]/40 p-4">
                  <div className="relative h-64">
                    {/* Connection lines with animation */}
                    <svg className="absolute inset-0 h-full w-full">
                      <motion.line
                        x1="50%" y1="50%" x2="20%" y2="25%"
                        stroke="#D4AF37"
                        strokeOpacity="0.4"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                      <motion.line
                        x1="50%" y1="50%" x2="80%" y2="30%"
                        stroke="#D4AF37"
                        strokeOpacity="0.4"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                      />
                      <motion.line
                        x1="50%" y1="50%" x2="30%" y2="80%"
                        stroke="#D4AF37"
                        strokeOpacity="0.4"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                      />
                      <motion.line
                        x1="50%" y1="50%" x2="75%" y2="75%"
                        stroke="#D4AF37"
                        strokeOpacity="0.4"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                      />
                    </svg>
                    {/* Central node */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg border-2 border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10 shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)" }}
                    >
                      <Code className="h-5 w-5 text-[#D4AF37]" />
                      <span className="mt-1 text-xs font-semibold text-[#F8F9FA]">API</span>
                    </motion.div>
                    {/* Surrounding nodes */}
                    <motion.div
                      className="absolute left-[15%] top-[20%] flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-[#D4AF37]/60 bg-[#1B263B]/80 shadow-md cursor-pointer"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.15, borderColor: "#D4AF37" }}
                    >
                      <Shield className="h-4 w-4 text-[#D4AF37]/80" />
                      <span className="mt-0.5 text-xs text-[#F8F9FA]/80">Auth</span>
                    </motion.div>
                    <motion.div
                      className="absolute right-[15%] top-[25%] flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-[#D4AF37]/60 bg-[#1B263B]/80 shadow-md cursor-pointer"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.15, borderColor: "#D4AF37" }}
                    >
                      <Globe className="h-4 w-4 text-[#D4AF37]/80" />
                      <span className="mt-0.5 text-xs text-[#F8F9FA]/80">DB</span>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-[15%] left-[25%] flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-[#D4AF37]/60 bg-[#1B263B]/80 shadow-md cursor-pointer"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.15, borderColor: "#D4AF37" }}
                    >
                      <Zap className="h-4 w-4 text-[#D4AF37]/80" />
                      <span className="mt-0.5 text-xs text-[#F8F9FA]/80">Cache</span>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-[20%] right-[20%] flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-[#D4AF37]/60 bg-[#1B263B]/80 shadow-md cursor-pointer"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.15, borderColor: "#D4AF37" }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      >
                        <RefreshCw className="h-4 w-4 text-[#D4AF37]/80" />
                      </motion.div>
                      <span className="mt-0.5 text-xs text-[#F8F9FA]/80">Queue</span>
                    </motion.div>
                  </div>
                  {/* Legend */}
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-[#D4AF37]"></div>
                      <span className="text-[#F8F9FA]/70">Services</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-0.5 w-4 bg-[#D4AF37]/60"></div>
                      <span className="text-[#F8F9FA]/70">Dependencies</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-[#F8F9FA]/60">
                Interactive system architecture and dependency mapping
              </p>
            </div>
          </div>

          <p className="text-center text-xs italic text-[#F8F9FA]/50">
            UI preview for illustration purposes. Beta users get early access to the live product.
          </p>
        </div>
      </motion.div>

      {/* How It Works - High Level */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3 className="mb-6 text-center text-2xl font-semibold text-[#D4AF37]">How Atlasium Works</h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#0D1B2A]">1</div>
              <h4 className="text-lg font-semibold text-[#F8F9FA]">Connect Your Entire Engineering Stack</h4>
            </div>
            <p className="text-sm leading-relaxed text-[#F8F9FA]/80">
              Integrate with your code repositories (GitHub, GitLab), infrastructure-as-code (Terraform, Kubernetes manifests),
              CI/CD pipelines, project tracking (Jira), internal documentation (Notion, Confluence), and communication tools (Slack).
              Atlasium understands not just your code, but your entire engineering system.
            </p>
          </div>

          <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#0D1B2A]">2</div>
              <h4 className="text-lg font-semibold text-[#F8F9FA]">AI Builds a Complete System Map</h4>
            </div>
            <p className="text-sm leading-relaxed text-[#F8F9FA]/80">
              Our AI analyzes code, infrastructure configurations, deployment pipelines, and business workflows to understand
              how everything connects. It maps services, dependencies, infrastructure resources, and operational processes, creating
              a living blueprint of your entire engineering organization, not just your codebase.
            </p>
          </div>

          <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#0D1B2A]">3</div>
              <h4 className="text-lg font-semibold text-[#F8F9FA]">Guided Walkthroughs, Not Just Q&A</h4>
            </div>
            <p className="text-sm leading-relaxed text-[#F8F9FA]/80">
              Instead of waiting for questions, Atlasium proactively generates voice-narrated walkthroughs that guide engineers
              through your systems, like having a senior developer explain everything step-by-step.
            </p>
          </div>

          <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#0D1B2A]">4</div>
              <h4 className="text-lg font-semibold text-[#F8F9FA]">Always Up to Date</h4>
            </div>
            <p className="text-sm leading-relaxed text-[#F8F9FA]/80">
              Walkthroughs automatically update when code changes, ensuring your documentation never goes stale. Your
              institutional knowledge evolves with your company.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Technical Overview - Public Safe */}
      <motion.div variants={itemVariants} className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
        <h3 className="mb-4 text-xl font-semibold text-[#D4AF37]">Built for Enterprise</h3>
        <p className="mb-4 text-sm leading-relaxed text-[#F8F9FA]/90">
          Atlasium is built on enterprise-grade infrastructure with security and compliance as foundational priorities:
        </p>
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <div className="mb-2 font-semibold text-[#D4AF37]">Security & Compliance</div>
            <ul className="space-y-1 text-[#F8F9FA]/80">
              <li>• Enterprise SSO (SAML, SCIM)</li>
              <li>• Encryption at rest and in transit</li>
              <li>• SOC 2 compliant infrastructure</li>
              <li>• On-premises deployment option</li>
              <li>• Role-based access control</li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-semibold text-[#D4AF37]">Technology</div>
            <ul className="space-y-1 text-[#F8F9FA]/80">
              <li>• Cloud-native architecture</li>
              <li>• Advanced AI/ML for code understanding</li>
              <li>• Real-time synchronization</li>
              <li>• High-quality voice synthesis</li>
              <li>• Scalable vector search</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="mt-12 text-center">
        <div className="rounded-lg border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-8">
          <h3 className="mb-3 text-2xl font-bold text-[#D4AF37]">Join the Founding 50</h3>
          <p className="mx-auto mb-6 max-w-2xl text-base text-[#F8F9FA]">
            Get early access to Atlasium, help shape the product roadmap, and secure lifetime early-adopter pricing.
            We're looking for 50 forward-thinking engineering teams to partner with during our beta phase.
          </p>
          <a
            href="#form"
            className="inline-block rounded-full border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 font-semibold text-[#0D1B2A] shadow-md transition-all duration-200 hover:bg-[#D4AF37]/90 hover:shadow-lg"
          >
            Apply Now
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
