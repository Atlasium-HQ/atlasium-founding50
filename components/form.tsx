import Link from "next/link";
import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { FaArrowRightLong } from "react-icons/fa6";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

interface FormProps {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  pain: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCompanyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTeamSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePainChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
}

export default function Form({
  name,
  email,
  company,
  role,
  teamSize,
  pain,
  handleNameChange,
  handleEmailChange,
  handleCompanyChange,
  handleRoleChange,
  handleTeamSizeChange,
  handlePainChange,
  handleSubmit,
  loading,
}: FormProps) {
  return (
    <motion.div
      className="mt-6 flex w-full max-w-[48rem] flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-2"
      >
        {/* Row 1: Name and Email */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          className="flex-1"
        />
        <Input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={handleEmailChange}
          className="flex-1"
        />
      </motion.div>
      
      {/* Row 2: Company and Role */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={handleCompanyChange}
          className="flex-1"
        />
        <Input
          type="text"
          placeholder="Your Role"
          value={role}
          onChange={handleRoleChange}
          className="flex-1"
        />
      </motion.div>
      
      {/* Row 3: Team Size and Pain Point */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Team Size / # of Engineers"
          value={teamSize}
          onChange={handleTeamSizeChange}
          className="flex-1"
        />
        <Input
          type="text"
          placeholder="Biggest onboarding pain?"
          value={pain}
          onChange={handlePainChange}
          className="flex-1"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <EnhancedButton
          variant="expandIcon"
          Icon={FaArrowRightLong}
          onClick={handleSubmit}
          iconPlacement="right"
          className="mt-2 w-full"
          disabled={loading}
          type="submit">
          {loading ? "Loading..." : "Apply for Founding 50"}
        </EnhancedButton>
      </motion.div>
      </form>
      <motion.div variants={itemVariants} className="mt-4 text-center">
        <p className="text-center text-sm text-[#F8F9FA] mb-3">
          Join the Atlasium Founding 50 for early access and the chance to shape how teams onboard.
        </p>
        <div className="flex w-full items-center justify-center gap-1 text-muted-foreground">
          <p>For any queries, reach out at </p>
          <Link
            href="https://x.com/AtlasiumHQ"
            rel="noopener noreferrer"
            target="_blank">
            <FaXTwitter className="hover:[#D4AF37] h-4 w-4 transition-all duration-200 ease-linear" />
          </Link>
          or
          <Link
            href="https://github.com/Atlasium-HQ"
            rel="noopener noreferrer"
            target="_blank">
            <FaGithub className="hover:[#D4AF37] ml-0.5 h-5 w-5 transition-all duration-200 ease-linear" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
