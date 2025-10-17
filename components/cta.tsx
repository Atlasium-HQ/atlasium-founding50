import { motion } from "framer-motion";
import TextBlur from "@/components/ui/text-blur";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function CTA() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full bg-muted/80 text-center">
            <AnimatedShinyText className="px-4 py-1">
              <span>Founding 50 Application</span>
            </AnimatedShinyText>
          </div>
        </div>
      </motion.div>

      <motion.img
        src="/atlasium-modern-transparent-logo.png"
        alt="Atlasium logo"
        className="mx-auto my-8 h-16 w-auto"
        variants={itemVariants}
      />

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-3xl font-medium tracking-tighter sm:text-5xl"
          text="Living memory for your code, infra, and workflows."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[30rem] pt-1.5 text-center text-base text-[#F8F9FA] sm:text-lg"
          text="Atlasium turns a company’s code, infrastructure, and workflows into living walkthroughs that evolve with every update. We help engineers onboard faster, keep context alive, and make documentation intelligent and always up to date."
          duration={0.8}
        />
      </motion.div>
    </motion.div>
  );
}
