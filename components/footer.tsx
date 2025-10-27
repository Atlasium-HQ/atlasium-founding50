import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Footer() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-auto flex w-full items-center justify-center gap-1 border-t border-[#D4AF37]/20 bg-background p-6 text-[#F8F9FA]/60">
      <motion.div variants={itemVariants} className="text-sm">
        © 2025 Atlasium. All rights reserved.
      </motion.div>
    </motion.div>
  );
}
