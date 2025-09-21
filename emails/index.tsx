import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  userFirstname: string;
  company?: string;
  role?: string;
  teamSize?: string;
  pain?: string;
}

export const AtlasiumFoundingEmail = ({
  userFirstname,
  company,
  role,
  teamSize,
  pain,
}: EmailProps) => (
  <Html>
    <Head />
    <Preview>
      Thanks for applying to the Atlasium Founding 50, {userFirstname}! 🚀
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://atlasium.org/atlasium-modern-transparent-logo.png"
          alt="Atlasium Logo"
          style={logo}
        />
        <Text style={greeting}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thanks for applying to the Atlasium Founding 50 program. We're
          selecting 50 engineering teams to shape how AI proactively walks
          through codebases, infra, and workflows so onboarding is faster and
          knowledge never leaves.
        </Text>
        <Text style={paragraph}>
          We'll review your application and get back to you shortly. If you'd
          like to speed things up, you can book a 15-minute discovery call
          directly with us{" "}
          <a
            href="https://calendly.com/enochkambale/altasium-discovery"
            style={link}>
            here
          </a>
          .
        </Text>
        <Text style={signOff}>
          Looking forward to connecting,
          <br />
          Atlasium Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          You received this email because you applied to the Atlasium Founding
          50. If you believe this is a mistake, feel free to ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

AtlasiumFoundingEmail.PreviewProps = {
  userFirstname: "Alex",
  company: "TechCorp",
  role: "Engineering Manager",
  teamSize: "12 engineers",
  pain: "New hires take 3+ months to become productive",
} as EmailProps;

export default AtlasiumFoundingEmail;

const main = {
  backgroundColor: "#0D1B2A",
  fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
  minHeight: "100vh",
};

const container = {
  margin: "0 auto",
  padding: "32px",
  backgroundColor: "#0D1B2A",
  borderRadius: "12px",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto 32px",
  display: "block",
  maxWidth: "120px",
  height: "auto",
};

const greeting = {
  fontSize: "20px",
  lineHeight: "28px",
  color: "#F8F9FA",
  marginBottom: "24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#F8F9FA",
  marginBottom: "20px",
};

const link = {
  color: "#D4AF37",
  textDecoration: "underline",
};

const signOff = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#F8F9FA",
  marginTop: "32px",
  marginBottom: "32px",
};

const hr = {
  borderColor: "#1B263B",
  margin: "32px 0",
};

const footer = {
  color: "#8c8c8c",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};
