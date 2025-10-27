import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const teamMembers = [
  {
    name: "Enoch Kambale",
    role: "Co-Founder & CEO",
    bio: "Full-stack engineer with 5+ years building scalable, user-focused applications at the intersection of web, AI, and cloud. Previously co-founded Jobzy, a platform empowering Africa's informal workers. Leading product vision and engineering at Atlasium.",
    linkedin: "https://www.linkedin.com/in/enochkambale/",
    github: "https://github.com/camballe",
    x: "https://x.com/enkambale",
    experience: [
      "5+ years full-stack engineering (Next.js, TypeScript, Node.js)",
      "Co-founded Jobzy (gig marketplace + AI recruitment platform)",
      "Built scalable systems serving thousands of users",
      "Expert in AI-powered developer tools"
    ]
  },
  {
    name: "Caleb Kiragu",
    role: "Co-Founder & CTO",
    bio: "Software engineer and entrepreneur with experience building fintech infrastructure. Founded PesaToken, a crypto infrastructure platform. Specializes in backend systems, scalable architecture, and building products from the ground up.",
    linkedin: "https://www.linkedin.com/in/ck1ragu/",
    github: "https://github.com/calebkiragu",
    x: "https://x.com/kiraguxx",
    experience: [
      "Founded PesaToken (crypto infrastructure)",
      "Specialist in backend systems and infrastructure",
      "Built digital products for startups",
      "Expert in scalable architecture design"
    ]
  }
];

export default function Team() {
  return (
    <motion.section
      id="team"
      className="w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={itemVariants} className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-[#D4AF37]">Our Team</h2>
        <div className="mx-auto h-1 w-24 bg-[#D4AF37]/50"></div>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#F8F9FA]">
          Meet the founding team building the future of engineering knowledge management
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <div className="grid gap-8 sm:grid-cols-2">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/50 p-6 transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#D4AF37]/10"
          >
            {/* Profile Image Placeholder */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#D4AF37]/50 bg-[#0D1B2A]/80 text-4xl font-bold text-[#D4AF37]">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            <div className="text-center">
              <h3 className="mb-1 text-xl font-bold text-[#F8F9FA]">{member.name}</h3>
              <p className="mb-3 text-sm font-semibold text-[#D4AF37]">{member.role}</p>

              <p className="mb-4 text-sm leading-relaxed text-[#F8F9FA]/80">
                {member.bio}
              </p>

              <div className="mb-4 space-y-1 text-left text-xs text-[#F8F9FA]/70">
                {member.experience.map((exp, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="mr-2 text-[#D4AF37]">•</span>
                    <span>{exp}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] transition-colors hover:text-[#F8F9FA]"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] transition-colors hover:text-[#F8F9FA]"
                    aria-label="GitHub"
                  >
                    <FaGithub size={24} />
                  </a>
                )}
                {member.x && (
                  <a
                    href={member.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] transition-colors hover:text-[#F8F9FA]"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-12 rounded-lg border border-[#D4AF37]/20 bg-[#1B263B]/30 p-6 text-center"
      >
        <h3 className="mb-3 text-xl font-semibold text-[#D4AF37]">Why This Team?</h3>
        <p className="text-base leading-relaxed text-[#F8F9FA]">
          Our founding team brings together deep expertise in software engineering, AI/ML, and developer tools.
          We&apos;ve experienced firsthand the pain of knowledge drain and long onboarding cycles in complex codebases.
          This personal experience drives our mission to build a better solution for engineering teams worldwide.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#D4AF37]/10 bg-[#0D1B2A]/50 p-4">
            <div className="mb-1 text-2xl font-bold text-[#D4AF37]">10+</div>
            <div className="text-sm text-[#F8F9FA]/80">Years Combined Engineering</div>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/10 bg-[#0D1B2A]/50 p-4">
            <div className="mb-1 text-2xl font-bold text-[#D4AF37]">3+</div>
            <div className="text-sm text-[#F8F9FA]/80">Startups Built/Scaled</div>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/10 bg-[#0D1B2A]/50 p-4">
            <div className="mb-1 text-2xl font-bold text-[#D4AF37]">100%</div>
            <div className="text-sm text-[#F8F9FA]/80">Committed Full-Time</div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
