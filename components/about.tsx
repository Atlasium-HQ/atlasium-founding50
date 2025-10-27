import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function About() {
  return (
    <motion.section
      id="about"
      className="w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={itemVariants} className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-[#D4AF37]">About Atlasium</h2>
        <div className="mx-auto h-1 w-24 bg-[#D4AF37]/50"></div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6 text-[#F8F9FA]">
        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
          <h3 className="mb-3 text-2xl font-semibold text-[#D4AF37]">What We Do</h3>
          <p className="mb-4 text-lg leading-relaxed">
            Atlasium is a developer tools startup building a <strong>living memory system</strong> for engineering teams.
            We transform code, infrastructure, and workflows into AI-powered, voice-narrated walkthroughs that evolve automatically
            with every update.
          </p>
          <p className="text-lg leading-relaxed">
            Our platform helps engineering teams preserve institutional knowledge, onboard new developers faster,
            and ensure that critical domain expertise never walks out the door when team members leave.
          </p>
        </div>

        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
          <h3 className="mb-3 text-2xl font-semibold text-[#D4AF37]">The Problem We Solve</h3>
          <p className="mb-4 text-lg leading-relaxed">
            Engineering teams waste weeks or months rediscovering &ldquo;tribal knowledge&rdquo; whenever someone joins or leaves.
            In complex, domain-driven codebases (fintech, healthtech, legaltech, insurance), this knowledge drain costs
            companies <strong>$150K-$450K per senior engineer departure</strong> and extends new hire onboarding to 3-6 months.
          </p>
          <ul className="space-y-2 text-base">
            <li className="flex items-start">
              <span className="mr-2 text-[#D4AF37]">•</span>
              <span><strong>Onboarding Crisis:</strong> New engineers spend 3-6 months decoding undocumented patterns</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#D4AF37]">•</span>
              <span><strong>Knowledge Drain:</strong> When senior developers leave, years of domain expertise vanish</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#D4AF37]">•</span>
              <span><strong>Documentation Decay:</strong> Traditional docs become outdated the moment code changes</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
          <h3 className="mb-3 text-2xl font-semibold text-[#D4AF37]">Who Atlasium Is For</h3>
          <p className="mb-4 text-lg leading-relaxed">
            Atlasium is built for <strong>engineering teams</strong> with complex, domain-heavy systems where
            onboarding takes months and institutional knowledge is critical.
          </p>
          <p className="text-base leading-relaxed text-[#F8F9FA]/90">
            We work especially well with teams in <strong>fintech, healthtech, legaltech, insurance, and enterprise SaaS</strong>. These industries
            where regulatory patterns, compliance requirements, and specialized domain logic make knowledge transfer
            particularly challenging. If your team is distributed, growing fast, or struggling with 3-6 month
            onboarding cycles, Atlasium can help.
          </p>
        </div>

        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
          <h3 className="mb-3 text-2xl font-semibold text-[#D4AF37]">How We Work With You</h3>
          <p className="mb-4 text-lg leading-relaxed">
            Atlasium is a cloud-based platform that integrates with your existing tools: GitHub, GitLab,
            Jira, CI/CD pipelines, and documentation systems. We work with engineering teams of all sizes,
            from growing startups to large enterprises.
          </p>
          <p className="text-base leading-relaxed text-[#F8F9FA]/90">
            Engineering leaders (CTOs, VPs of Engineering) typically bring us in to solve developer productivity
            and onboarding challenges. We also partner with People/HR teams focused on improving the engineering
            onboarding experience. Whether you&apos;re a 20-person startup or a 500-engineer organization, Atlasium
            adapts to your needs.
          </p>
        </div>

        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6">
          <h3 className="mb-3 text-2xl font-semibold text-[#D4AF37]">Why We Built Atlasium</h3>
          <p className="text-lg leading-relaxed">
            We&apos;ve experienced firsthand the frustration of joining a complex codebase and not knowing where to start,
            or watching critical knowledge walk out the door when senior engineers leave. Traditional documentation
            tools fail because they&apos;re static, reactive, and focus only on code, ignoring the infrastructure and workflows
            that make everything work.
          </p>
          <p className="mt-3 text-lg leading-relaxed">
            Atlasium was built to solve this problem with proactive, voice-narrated walkthroughs that cover your
            entire engineering system and evolve automatically with every change.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
