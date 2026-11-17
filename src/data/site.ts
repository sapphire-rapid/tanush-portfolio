// One place for everything personal. Leave a link as "" and the site hides
// every button that would have pointed to it.
export const site = {
  name: "Tanush",
  title: "Tanush | Edge AI and embedded systems",
  description:
    "Portfolio of Tanush, an MTech AI student who builds machine learning that runs on microcontrollers: TinyML, computer vision and embedded systems.",
  links: {
    github: "https://github.com/sapphire-rapid",
    email: "tanushadithiya5@gmail.com",
    linkedin: "https://www.linkedin.com/in/tanush-adithiya-g/",
    resume: "", // TODO: link to a PDF (Drive link or /resume.pdf in public/)
  },
} as const;

export const focusAreas = [
  "TinyML and on-device inference",
  "Computer vision",
  "Embedded firmware and sensors",
  "Low-power wireless mesh networks",
];

export const stack = [
  "TensorFlow",
  "Keras",
  "PyTorch",
  "Python",
  "C",
  "RIOT OS",
  "nRF52840",
  "ESP32-CAM",
  "Arduino",
  "Raspberry Pi",
  "Verilog",
  "6LoWPAN / RPL",
  "YOLO",
  "SHAP",
];

export type Education = {
  degree: string;
  school: string;
  place: string;
  status: "In progress" | "Completed";
};

export const education: Education[] = [
  {
    degree: "MTech, Artificial Intelligence",
    school: "Amrita Vishwa Vidyapeetham",
    place: "Coimbatore",
    status: "In progress",
  },
  {
    degree: "BTech, Electronics and Communication",
    school: "VIT Chennai",
    place: "Chennai",
    status: "Completed",
  },
];

export type Role = {
  role: string;
  org: string;
  detail: string;
  period?: string; // TODO: add dates, e.g. "Jun 2023 - Jul 2023"
};

// Newest first.
export const experience: Role[] = [
  {
    role: "MTech researcher",
    org: "Knowledge Engineering and Semantic Computing group, Amrita",
    detail:
      "Thesis on a privacy-preserving wearable mesh with on-device fall detection.",
  },
  {
    role: "VLSI intern",
    org: "Areca Embedded Systems",
    detail: "Implemented SPI in Verilog on an Intel Cyclone FPGA.",
  },
  {
    role: "Software QA automation intern",
    org: "Itechnowiz Solutions",
    detail: "Test automation for software QA.", // TODO: one line on what you built
  },
];
