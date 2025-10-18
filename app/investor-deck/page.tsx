"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Particles from "@/components/ui/particles";
import { ArrowRight, ArrowLeft } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Atlasium",
    subtitle: "Living memory for your code, infra, and workflows",
    content: (
      <div className="flex h-full flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-[#D4AF37]">Atlasium</h1>
          <p className="mb-8 text-2xl italic text-[#D4AF37]/90">&ldquo;Living memory for your code, infra, and workflows.&rdquo;</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#D4AF37]">$20B+</div>
            <div className="text-sm text-[#F8F9FA]/70">Total Addressable Market</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#D4AF37]">3-6 months</div>
            <div className="text-sm text-[#F8F9FA]/70">Typical onboarding time we eliminate</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "The Dual Crisis",
    subtitle: "Onboarding Delays + Knowledge Drain Are Bleeding Companies Dry",
    content: (
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4">
            <div className="text-sm font-semibold text-red-300">Problem 1: Onboarding Crisis</div>
            <div className="text-3xl font-bold text-red-400">$150K-$300K</div>
            <p className="text-sm text-[#F8F9FA]">
              Cost per engineer in domain-driven codebases (3-6 month ramp-up)
            </p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4">
            <div className="text-sm font-semibold text-red-300">Problem 2: Knowledge Drain</div>
            <div className="text-3xl font-bold text-red-400">$150K-$450K</div>
            <p className="text-sm text-[#F8F9FA]">
              Cost per senior engineer departure (+ 3-6 months recovery)
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3">
              <div className="text-xl font-bold text-red-400">40%</div>
              <p className="text-xs text-[#F8F9FA]">Senior dev time on training</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3">
              <div className="text-xl font-bold text-red-400">65%</div>
              <p className="text-xs text-[#F8F9FA]">Projects with bus factor ≤2</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3">
              <div className="text-xl font-bold text-red-400">13-18%</div>
              <p className="text-xs text-[#F8F9FA]">Annual tech turnover</p>
            </div>
          </div>
        </div>
        <blockquote className="border-l-2 border-[#D4AF37] pl-4 italic text-[#F8F9FA]">
          &ldquo;We lost 5 years of fintech logic when our lead dev left—no docs, just chaos&rdquo;
          <span className="block text-xs text-gray-400">— Reddit r/experienceddevs, 2024</span>
        </blockquote>
      </div>
    ),
  },
  {
    id: 3,
    title: "Real Stories, Real Pain",
    subtitle: "Engineers and CTOs Describe the Crisis",
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-3">
            <p className="text-sm italic text-[#F8F9FA]">
              &ldquo;In our fintech codebase, new hires spent 4 months decoding tribal KYC logic—no docs, just Slack hunts. Productivity tanked 60%.&rdquo;
            </p>
            <p className="mt-1 text-xs text-gray-400">— HackerNews, Fintech Engineer, 2022</p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-3">
            <p className="text-sm italic text-[#F8F9FA]">
              &ldquo;Senior left; lost 3 years of healthtech HIPAA patterns. Team reverse-engineered for 5 months—$200K delay.&rdquo;
            </p>
            <p className="mt-1 text-xs text-gray-400">— Reddit r/experienceddevs, 2024</p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-3">
            <p className="text-sm italic text-[#F8F9FA]">
              &ldquo;When our lead dev bailed, insurance underwriting logic vanished. Bus factor 1 nearly killed a product launch.&rdquo;
            </p>
            <p className="mt-1 text-xs text-gray-400">— X/Twitter, CTO, 2025</p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-3">
            <p className="text-sm italic text-[#F8F9FA]">
              &ldquo;Wish our departed fintech expert had narrated patterns—onboarding still 5 months.&rdquo;
            </p>
            <p className="mt-1 text-xs text-gray-400">— X/Twitter, Engineer, 2025</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-3">
          <p className="text-xs text-[#F8F9FA]">
            <strong>Industries hit hardest:</strong> Fintech (regulatory patterns), Legaltech (case workflows), Healthtech (HIPAA compliance), Insurance (actuarial models), Enterprise SaaS (multi-tenant logic)
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "The Solution",
    subtitle: "Voice-Narrated Living Walkthroughs = Having a Teacher, Not Reading a Book",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37]/20 to-transparent p-5">
          <p className="text-base italic text-[#F8F9FA]/95">
            &ldquo;Engineering teams waste weeks rediscovering tribal knowledge whenever someone joins or leaves. Atlasium turns a company&apos;s code, infrastructure, and workflows into living walkthroughs that evolve with every update. We help engineers onboard faster, keep context alive, and make documentation intelligent and always up to date.&rdquo;
          </p>
        </div>
        <p className="text-lg text-[#F8F9FA]">
          Atlasium transforms code, infrastructure, and workflows into <strong>AI-powered, voice-narrated walkthroughs</strong> that evolve automatically—preserving institutional knowledge and cutting onboarding time in half.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="text-sm font-semibold text-[#D4AF37]">🎙️ Voice-Narrated Learning</div>
            <p className="text-xs text-[#F8F9FA]">
              20-30% better retention than text; feels like senior dev explaining
            </p>
          </div>
          <div className="space-y-2 rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="text-sm font-semibold text-[#D4AF37]">🔄 Living Memory</div>
            <p className="text-xs text-[#F8F9FA]">
              Auto-syncs with code changes via event streams—never goes stale
            </p>
          </div>
          <div className="space-y-2 rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="text-sm font-semibold text-[#D4AF37]">🧠 Domain-Aware AI</div>
            <p className="text-xs text-[#F8F9FA]">
              Learns your niche patterns (fintech KYC, healthtech HIPAA, etc.)
            </p>
          </div>
          <div className="space-y-2 rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="text-sm font-semibold text-[#D4AF37]">�️ Full-Stack Coverage</div>
            <p className="text-xs text-[#F8F9FA]">
              Code + infrastructure + workflows—not just UI or docs
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-green-500/20 bg-green-950/20 p-4">
            <div className="text-2xl font-bold text-green-400">50% faster</div>
            <p className="text-sm text-[#F8F9FA]">Onboarding (6 months → 3 months)</p>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-950/20 p-4">
            <div className="text-2xl font-bold text-green-400">$200K+ saved</div>
            <p className="text-sm text-[#F8F9FA]">Per prevented knowledge drain</p>
          </div>
        </div>
        <blockquote className="border-l-2 border-[#D4AF37] pl-4 italic text-[#F8F9FA]">
          &ldquo;Voice narration boosts retention 20-30% over text&rdquo;
          <span className="block text-xs text-gray-400">— Sage Journals, Cognitive Studies 2024</span>
        </blockquote>
      </div>
    ),
  },
  {
    id: 5,
    title: "Why Now?",
    subtitle: "Five Converging Forces Create the Perfect Moment",
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">🤖 AI Can Now Understand Code Context</div>
            <p className="text-sm text-[#F8F9FA]">
              LLMs (GPT-4, Claude 3.5) + RAG enable domain-specific pattern learning; 76% of devs already using AI
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">🎙️ Voice Synthesis is Realistic</div>
            <p className="text-sm text-[#F8F9FA]">
              TTS (ElevenLabs, OpenAI) sounds natural—finally feels like a teacher, not a robot
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">🏠 Remote Work = Higher Knowledge Loss Risk</div>
            <p className="text-sm text-[#F8F9FA]">
              42% hybrid/remote teams lose informal knowledge transfer—can&apos;t tap shoulders anymore
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">💼 Post-&ldquo;Great Resignation&rdquo; Retention Focus</div>
            <p className="text-sm text-[#F8F9FA]">
              Companies burned by 13-18% turnover—desperate to retain knowledge and shorten onboarding
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">⚙️ Platform Engineering Demands Better Tools</div>
            <p className="text-sm text-[#F8F9FA]">
              DORA 2024: DevEx is competitive advantage—teams investing in onboarding infrastructure
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Market Opportunity",
    subtitle: "Three Converging Markets = $20B+ TAM",
    content: (
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="rounded-lg border border-[#D4AF37]/30 bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] p-4">
            <div className="text-xs text-gray-400">TAM — Total Addressable Market</div>
            <div className="text-3xl font-bold text-[#D4AF37]">$20B+</div>
            <p className="text-sm text-[#F8F9FA]">Dev Tools ($6.3B) + Knowledge Management ($13.7B) + Onboarding ($1.8B)</p>
            <div className="mt-2 text-sm text-green-400">15-18% CAGR</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
              <div className="text-xs text-gray-400">SAM — Serviceable Available</div>
              <div className="text-2xl font-bold text-[#D4AF37]">$2-5B</div>
              <p className="text-xs text-[#F8F9FA]">Domain-specific B2B SaaS (50-500 employees, 20-200 engineers)</p>
            </div>
            <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
              <div className="text-xs text-gray-400">SOM — Serviceable Obtainable</div>
              <div className="text-2xl font-bold text-[#D4AF37]">$50-100M</div>
              <p className="text-xs text-[#F8F9FA]">Series A-C fintech, legaltech, healthtech, insurance</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#0D1B2A]/50 p-4">
          <div className="text-sm font-semibold text-[#D4AF37] mb-2">Why Dual Value = Higher ACV</div>
          <p className="text-xs text-[#F8F9FA]">
            Solving both onboarding AND knowledge preservation taps two separate budgets: Engineering (productivity) + HR (retention). Pricing: $20-50/user/month = $10K-100K annual contracts (2x adjacent tools).
          </p>
        </div>
        <blockquote className="border-l-2 border-[#D4AF37] pl-4 italic text-[#F8F9FA]">
          &ldquo;AI-driven dev tools growing 25% CAGR—fastest segment&rdquo;
          <span className="block text-xs text-gray-400">— Aventis Advisors, 2025</span>
        </blockquote>
      </div>
    ),
  },
  {
    id: 7,
    title: "Competitive Landscape",
    subtitle: "No One Else Does Living + Voice + Full-Stack",
    content: (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D4AF37]/30">
                <th className="pb-2 text-left text-[#D4AF37]">Player</th>
                <th className="pb-2 text-left text-[#D4AF37]">Funding</th>
                <th className="pb-2 text-left text-[#D4AF37]">Gap</th>
              </tr>
            </thead>
            <tbody className="text-[#F8F9FA]">
              <tr className="border-b border-[#D4AF37]/10">
                <td className="py-2">Confluence/Notion</td>
                <td className="py-2">Unicorns</td>
                <td className="py-2 text-xs">Static, 50% stale in 6 months</td>
              </tr>
              <tr className="border-b border-[#D4AF37]/10">
                <td className="py-2">Swimm</td>
                <td className="py-2">$29M Series A</td>
                <td className="py-2 text-xs">Code-only, no voice, static</td>
              </tr>
              <tr className="border-b border-[#D4AF37]/10">
                <td className="py-2">WalkMe</td>
                <td className="py-2">$8.4B acq</td>
                <td className="py-2 text-xs">UI-only, not code-native</td>
              </tr>
              <tr className="border-b border-[#D4AF37]/10">
                <td className="py-2">Loom</td>
                <td className="py-2">$975M acq</td>
                <td className="py-2 text-xs">Video stale, no auto-update</td>
              </tr>
              <tr className="border-b border-[#D4AF37]/10">
                <td className="py-2">Guru/Tettra</td>
                <td className="py-2">$120M+</td>
                <td className="py-2 text-xs">Generic KM, not code-aware</td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-[#D4AF37]">Atlasium</td>
                <td className="py-2 font-bold text-[#D4AF37]">Seed Stage</td>
                <td className="py-2 text-xs font-semibold text-green-400">
                  Living + Voice + Code+Infra+Workflows
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
          <div className="mb-2 font-semibold text-[#D4AF37]">Our Moat: 5 Defensible Advantages</div>
          <ul className="space-y-1 text-xs text-[#F8F9FA]">
            <li>✅ <strong>Living:</strong> Auto-syncs with code changes (vs. static docs that decay)</li>
            <li>✅ <strong>Voice-narrated:</strong> 20-30% better retention (vs. text-only)</li>
            <li>✅ <strong>Domain-aware:</strong> Learns niche patterns via RAG/embeddings</li>
            <li>✅ <strong>Full-stack:</strong> Code + infra + workflows (competitors do 1-2)</li>
            <li>✅ <strong>Dual ROI:</strong> Onboarding + knowledge preservation = 2x willingness-to-pay</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: "Traction & ROI Metrics",
    subtitle: "Proving Dual Value: 50% Faster Onboarding + Knowledge Insurance",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-green-500/30 bg-green-950/20 p-4">
          <div className="text-xs text-gray-400">Current Status</div>
          <div className="text-2xl font-bold text-green-400">Founding 50 Waitlist Live</div>
          <p className="text-sm text-[#F8F9FA]">
            Targeting 5-10 Series A-C pilots in fintech, legaltech, healthtech
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-[#D4AF37]/20 bg-[#0D1B2A]/50 p-3">
            <div className="font-semibold text-[#D4AF37]">6-Month Milestones</div>
            <ul className="mt-2 space-y-1 text-xs text-[#F8F9FA]">
              <li>• 5 pilot customers with ROI proof</li>
              <li>• 50% onboarding time reduction</li>
              <li>• Bus factor improvement (1→3+)</li>
              <li>• $50K ARR</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/20 bg-[#0D1B2A]/50 p-3">
            <div className="font-semibold text-[#D4AF37]">12-Month Goals</div>
            <ul className="mt-2 space-y-1 text-xs text-[#F8F9FA]">
              <li>• 20+ paying customers</li>
              <li>• $1M ARR</li>
              <li>• 70% month-3 retention</li>
              <li>• NPS &gt; 50</li>
            </ul>
          </div>
        </div>
        <div className="rounded-lg border border-green-500/20 bg-green-950/20 p-4">
          <div className="mb-2 text-sm font-semibold text-green-400">ROI Case Study Template</div>
          <div className="space-y-1 text-xs text-[#F8F9FA]">
            <div>✅ Onboarding: 180 days → 90 days = <strong>$100K saved per hire</strong></div>
            <div>✅ Knowledge: Prevented 1 senior departure loss = <strong>$200K+ saved</strong></div>
            <div>✅ Senior time freed: 20 hours/week = <strong>2 extra engineers&apos; output</strong></div>
            <div className="pt-2 font-semibold">Total ROI: <span className="text-green-400">3-6x in Year 1</span></div>
          </div>
        </div>
        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#0D1B2A]/50 p-4">
          <div className="mb-2 text-xs font-semibold text-[#D4AF37]">Target Pilot Customers (10 examples)</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#F8F9FA]">
            <div>Fintech: Ramp, Brex, Plaid</div>
            <div>Legaltech: Clio, Eve, Ironclad</div>
            <div>Healthtech: Ro, Sword Health</div>
            <div>Insurance: Vertical SaaS firms</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: "Go-to-Market",
    subtitle: "Design Partner → PLG → Enterprise Expansion",
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="text-xl">1️⃣</div>
              <div className="font-semibold text-[#D4AF37]">Design Partner Pilots (Q1-Q2 2025)</div>
            </div>
            <p className="text-xs text-[#F8F9FA]">
              5-10 Series A-C companies (fintech, legaltech, healthtech) co-build, prove ROI case studies
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="text-xl">2️⃣</div>
              <div className="font-semibold text-[#D4AF37]">Product-Led Growth (Q3-Q4 2025)</div>
            </div>
            <p className="text-xs text-[#F8F9FA]">
              Free tier for small teams → viral engineering adoption → team-wide expansion
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="text-xl">3️⃣</div>
              <div className="font-semibold text-[#D4AF37]">Sales-Assisted Enterprise (2026)</div>
            </div>
            <p className="text-xs text-[#F8F9FA]">
              CTO/VP Eng outreach with ROI proof → $50K-100K annual contracts
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="text-xl">4️⃣</div>
              <div className="font-semibold text-[#D4AF37]">Thought Leadership</div>
            </div>
            <p className="text-xs text-[#F8F9FA]">
              &ldquo;Living walkthroughs&rdquo; best practices, onboarding playbooks, DevEx thought leadership
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#0D1B2A]/50 p-4">
          <div className="mb-2 text-sm font-semibold text-[#D4AF37]">ICP: Ideal Customer Profile</div>
          <div className="text-xs text-[#F8F9FA]">
            <strong>Firmographics:</strong> 50-500 employees, 20-100 engineers, Series A-C, $5-50M ARR
            <br />
            <strong>Pain Indicators:</strong> 4+ month onboarding, recent senior departure, 20%+ turnover, domain-driven codebase, remote/distributed
            <br />
            <strong>Industries:</strong> Fintech, legaltech, healthtech, insurance, enterprise SaaS
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    title: "The Ask",
    subtitle: "Fuel to Capture $50-100M Market Opportunity",
    content: (
      <div className="space-y-6">
        <div className="rounded-lg border border-[#D4AF37]/50 bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] p-6">
          <div className="text-sm text-gray-400">Raising</div>
          <div className="text-5xl font-bold text-[#D4AF37]">$3M</div>
          <div className="mt-2 text-lg text-[#F8F9FA]">Seed Round at $15M Pre-Money (15-20% dilution)</div>
          <div className="mt-4 text-sm text-gray-400">
            Aligns with 2025 AI B2B SaaS benchmarks: $2.5-4M seed, $12-16M pre-money
          </div>
        </div>
        <div className="space-y-3">
          <div className="font-semibold text-[#D4AF37]">Use of Funds (24-month runway)</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-2 w-1/2 rounded-full bg-[#D4AF37]" />
              <div className="text-[#F8F9FA]"><strong>50% Product:</strong> AI training (domain-specific), TTS (ElevenLabs), RAG/AST, UI</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-[30%] rounded-full bg-[#D4AF37]/70" />
              <div className="text-[#F8F9FA]"><strong>30% GTM:</strong> 5-10 pilots, sales/CS hires, case studies, community</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-[20%] rounded-full bg-[#D4AF37]/40" />
              <div className="text-[#F8F9FA]"><strong>20% Ops:</strong> 5-8 engineers, infra (AI compute), legal, recruiting</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-green-500/20 bg-green-950/20 p-4">
            <div className="mb-2 text-sm font-semibold text-green-400">6-Month Milestones</div>
            <ul className="space-y-1 text-xs text-[#F8F9FA]">
              <li>✅ 5 pilots with ROI proof</li>
              <li>✅ $50K ARR</li>
              <li>✅ Domain AI validated</li>
            </ul>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-950/20 p-4">
            <div className="mb-2 text-sm font-semibold text-green-400">12-Month (Pre-Series A)</div>
            <ul className="space-y-1 text-xs text-[#F8F9FA]">
              <li>✅ $1M ARR</li>
              <li>✅ 20+ customers</li>
              <li>✅ 40% PMF, 70% retention</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 11,
    title: "Target Investors",
    subtitle: "Funds That Get This Space",
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">🛠️ Developer Tools / AI Infrastructure</div>
            <p className="text-sm text-[#F8F9FA]">
              <strong>a16z, Greylock, Bessemer:</strong> Invested in GitHub, Loom, LaunchDarkly—understand dev workflows
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">💼 Future of Work / Learning</div>
            <p className="text-sm text-[#F8F9FA]">
              <strong>Reach Capital, Owl Ventures, GSV Ventures:</strong> Theses around upskilling, knowledge transfer
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">📈 B2B SaaS / Enterprise</div>
            <p className="text-sm text-[#F8F9FA]">
              <strong>Lightspeed, Accel, Point Nine:</strong> Experienced with PLG → enterprise expansion
            </p>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-4">
            <div className="mb-2 font-semibold text-[#D4AF37]">🚀 Seed-Stage Specialists</div>
            <p className="text-sm text-[#F8F9FA]">
              <strong>Boldstart, Root, Uncork, Amplify:</strong> Hands-on with design partners, GTM iteration
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-[#D4AF37]/50 bg-[#D4AF37]/10 p-4">
          <p className="text-center text-sm font-semibold text-[#D4AF37]">
            Ideal: Firms with CTO network in fintech/legaltech/healthtech (our ICP)
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 12,
    title: "Vision",
    subtitle: "Become the &ldquo;Datadog for Context&rdquo;",
    content: (
      <div className="space-y-6">
        <div className="mb-4 text-center text-lg text-[#F8F9FA]/90">
          Just as Datadog observes infrastructure health, Atlasium will observe <span className="font-semibold text-[#D4AF37]">knowledge flow</span>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-5">
            <div className="mb-3 text-lg font-semibold text-[#D4AF37]">Year 1: Foundation</div>
            <div className="space-y-2 text-sm text-[#F8F9FA]">
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div>Master <strong>code documentation</strong> (walkthroughs for repos)</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div>Launch beta, secure 5 design partners</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div>Prove onboarding time reduction (3-6 months → weeks)</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-5">
            <div className="mb-3 text-lg font-semibold text-[#D4AF37]">Year 2: Expansion</div>
            <div className="space-y-2 text-sm text-[#F8F9FA]">
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div>Add <strong>infrastructure mapping</strong> (Kubernetes, Terraform, cloud resources)</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div>Add <strong>workflow automation</strong> (CI/CD, deployment processes)</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div>Launch enterprise features (SSO, RBAC, audit logs)</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/30 bg-[#0D1B2A]/50 p-5">
            <div className="mb-3 text-lg font-semibold text-[#D4AF37]">Year 3+: Platform</div>
            <div className="space-y-2 text-sm text-[#F8F9FA]">
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div><strong>Observability for knowledge:</strong> dashboards showing knowledge gaps, bus factors, onboarding bottlenecks</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div><strong>Predictive alerts:</strong> &ldquo;Sarah leaving = $300K risk—capture her knowledge now&rdquo;</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-[#D4AF37]">•</div>
                <div><strong>Cross-company insights:</strong> anonymized benchmarks (&ldquo;Your onboarding is 2x industry average&rdquo;)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 13,
    title: "Contact",
    subtitle: "Let's Build the Future Together",
    content: (
      <div className="flex h-full flex-col items-center justify-center space-y-8">
        <Image
          src="/atlasium-modern-transparent-logo.png"
          alt="Atlasium logo"
          width={96}
          height={96}
          className="h-24 w-auto"
        />
        <div className="space-y-4 text-center">
          <div>
            <div className="text-sm text-gray-400">Reach Out</div>
            <a
              href="mailto:enochkambale@atlasium.com"
              className="text-xl font-semibold text-[#D4AF37] hover:underline">
              enochkambale@atlasium.com
            </a>
          </div>
          <div>
            <div className="text-sm text-gray-400">Follow Us</div>
            <div className="flex items-center justify-center gap-4 text-[#F8F9FA]">
              <a
                href="https://x.com/AtlasiumHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37]">
                @AtlasiumHQ
              </a>
              <span>|</span>
              <a
                href="https://github.com/Atlasium-HQ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37]">
                GitHub
              </a>
            </div>
          </div>
          <div className="pt-4">
            <a
              href="https://calendly.com/enochkambale/altasium-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-[#D4AF37] bg-[#D4AF37] px-8 py-3 font-semibold text-[#0D1B2A] transition-all hover:bg-transparent hover:text-[#D4AF37]">
              Schedule a Meeting
            </a>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Atlasium © 2025 · Living Memory for Your Engineering Team
        </div>
      </div>
    ),
  },
];

export default function InvestorDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#0D1B2A] p-4">
      <div className="relative w-full max-w-5xl">
        {/* Slide Container */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="min-h-[600px] rounded-2xl border border-[#D4AF37]/30 bg-[#1B263B]/50 p-8 backdrop-blur-sm md:p-12">
          {/* Slide Header */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#D4AF37] md:text-4xl">
                {slides[currentSlide].title}
              </h1>
              <div className="text-sm text-gray-400">
                {currentSlide + 1} / {slides.length}
              </div>
            </div>
            <h2 className="text-lg text-[#F8F9FA] md:text-xl">
              {slides[currentSlide].subtitle}
            </h2>
          </div>

          {/* Slide Content */}
          <div className="mb-8">{slides[currentSlide].content}</div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 rounded-full border border-[#D4AF37] px-4 py-2 text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0D1B2A] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#D4AF37]">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((slide) => (
              <button
                type="button"
                key={slide.id}
                onClick={() => goToSlide(slide.id - 1)}
                className={`h-2 rounded-full transition-all ${
                  slide.id - 1 === currentSlide
                    ? "w-8 bg-[#D4AF37]"
                    : "w-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/50"
                }`}
                aria-label={`Go to slide ${slide.id}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 rounded-full border border-[#D4AF37] px-4 py-2 text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0D1B2A] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#D4AF37]">
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className="mt-4 text-center text-xs text-gray-400">
          Use arrow keys or swipe to navigate • Press ESC to return home
        </div>
      </div>

      <Particles quantityDesktop={150} quantityMobile={50} ease={80} color={"#D4AF37"} refresh />
    </main>
  );
}
