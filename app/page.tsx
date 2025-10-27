"use client";

import { toast } from "sonner";
import { useState } from "react";
import CTA from "@/components/cta";
import Form from "@/components/form";
import Logos from "@/components/logos";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";
import Footer from "@/components/footer";
import About from "@/components/about";
import Product from "@/components/product";
import Team from "@/components/team";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [teamSize, setTeamSize] = useState<string>("");
  const [pain, setPain] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value);
  };
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };
  const handleTeamSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamSize(event.target.value);
  };
  const handlePainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPain(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!name || !email || !company || !role || !teamSize || !pain) {
      toast.error("Please fill in all fields 😠");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address 😠");
      return;
    }

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        // First, check if email already exists in Notion
        const notionResponse = await fetch("/api/notion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, company, role, teamSize, pain }),
        });

        if (!notionResponse.ok) {
          if (notionResponse.status === 429) {
            reject("Rate limited");
          } else if (notionResponse.status === 409) {
            reject("Email already registered");
          } else {
            reject("Notion insertion failed");
          }
          return; // Exit early if Notion fails
        }

        // If Notion insertion is successful, proceed to send the email
        const mailResponse = await fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: name,
            email,
            company,
            role,
            teamSize,
            pain,
          }),
        });

        if (!mailResponse.ok) {
          if (mailResponse.status === 429) {
            reject("Rate limited");
          } else {
            reject("Email sending failed");
          }
        } else {
          resolve({ name });
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Submitting your application... 🚀",
      success: (data) => {
        setName("");
        setEmail("");
        setCompany("");
        setRole("");
        setTeamSize("");
        setPain("");
        return "Thank you for applying to the Founding 50 🎉";
      },
      error: (error) => {
        if (error === "Rate limited") {
          return "You're doing that too much. Please try again later";
        } else if (error === "Email already registered") {
          return "This email is already registered for the Founding 50! 🎉";
        } else if (error === "Email sending failed") {
          return "Failed to send email. Please try again 😢.";
        } else if (error === "Notion insertion failed") {
          return "Failed to save your details. Please try again 😢.";
        }
        return "An error occurred. Please try again 😢.";
      },
    });

    promise.finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <CTA />
      </section>

      {/* About Section */}
      <About />

      {/* Product Section */}
      <Product />

      {/* Team Section */}
      <Team />

      {/* Application Form Section */}
      <section id="form" className="flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#D4AF37]">Apply to the Founding 50</h2>
          <div className="mx-auto h-1 w-24 bg-[#D4AF37]/50"></div>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#F8F9FA]">
            Join 50 forward-thinking engineering teams shaping the future of knowledge management
          </p>
        </div>

        <Form
          name={name}
          email={email}
          company={company}
          role={role}
          teamSize={teamSize}
          pain={pain}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleCompanyChange={handleCompanyChange}
          handleRoleChange={handleRoleChange}
          handleTeamSizeChange={handleTeamSizeChange}
          handlePainChange={handlePainChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {/* Secondary CTA: Discovery Call */}
        <div className="mb-12 mt-8 flex flex-col items-center">
          <span className="mb-2 text-base text-[#F8F9FA]">Not sure yet?</span>
          <a
            href="https://calendly.com/enochkambale/altasium-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-[#D4AF37] bg-[#0D1B2A] px-6 py-2 font-semibold text-[#D4AF37] shadow-md transition-colors duration-200 hover:bg-[#1B263B]">
            Book a 15-minute discovery call
          </a>
        </div>
      </section>

      <Footer />

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#D4AF37"}
        refresh
      />
    </main>
  );
}
