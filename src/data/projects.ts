export const categories = ["Edge AI", "Vision", "Embedded"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: Category;
  // The signal path, in order, from input to output. Drawn as a trace on the card.
  pipeline: string[];
  tags: string[];
  status?: string;
  link?: { label: string; href: string };
  featured?: boolean;
};

// To add a project, copy one block, change the text, and set featured: true
// if it should also show on the home page.
export const projects: Project[] = [
  {
    slug: "wearable-mesh",
    title: "Privacy-preserving wearable mesh",
    summary:
      "Wearable nodes that monitor heart rate and detect falls on the device itself, then route alerts over a self-organising mesh. No cloud, and no raw health data leaves the building.",
    category: "Edge AI",
    pipeline: ["IMU + PPG", "Fall classifier", "RPL mesh", "Border router"],
    tags: ["RIOT OS", "nRF52840", "TinyML", "6LoWPAN"],
    status: "MTech thesis, in progress",
    link: {
      label: "View code",
      href: "https://github.com/sapphire-rapid/privacy-preserving-wearable",
    },
    featured: true,
  },
  {
    slug: "drowsiness-detection",
    title: "Driver drowsiness detection",
    summary:
      "TinyML research on spotting driver fatigue with a model small enough to run inside the truck cab, aimed at long-haul logistics.",
    category: "Edge AI",
    pipeline: ["Driver signals", "Features", "Tiny model", "In-cab alert"], // TODO: replace with your real pipeline
    tags: ["TinyML", "Edge AI", "TensorFlow"],
    status: "Research in progress",
    featured: true,
  },
  {
    slug: "rescue-rover",
    title: "Search-and-rescue rover",
    summary:
      "A four-wheeled reconnaissance rover that senses obstacles, body heat and tilt, and streams live video back to the operator.",
    category: "Embedded",
    pipeline: ["Ultrasonic + thermal", "Dual Arduino", "ESP32-CAM", "Live feed"],
    tags: ["Arduino", "ESP32-CAM", "MLX90614", "Accelerometer"],
    featured: true,
  },
  {
    slug: "face-attendance",
    title: "Face recognition attendance",
    summary:
      "Marks a whole class present from one photo. Faces are detected, turned into embeddings and matched by a small classifier, which reached 100% on the AT&T Face Database in five epochs.",
    category: "Vision",
    pipeline: ["Class photo", "YOLOv11-face", "VGG-Face embeddings", "FCNN"],
    tags: ["PyTorch", "YOLOv11", "VGG-Face"],
    featured: true,
  },
  {
    slug: "tiny-yolo",
    title: "Tiny YOLO from scratch",
    summary:
      "An object detection pipeline written from the ground up in PyTorch: the network, the loss and the box decoding, with no detection library underneath.",
    category: "Vision",
    pipeline: ["Image", "Conv backbone", "Grid predictions", "Boxes"],
    tags: ["PyTorch", "Object detection"],
  },
  {
    slug: "xai-case-studies",
    title: "Explainable AI case studies",
    summary:
      "Opened up image and tabular models to see what they actually look at, using SHAP on VGG16, ResNet and XGBoost.",
    category: "Vision",
    pipeline: ["Trained model", "SHAP", "Attribution maps"],
    tags: ["TensorFlow", "Keras", "SHAP", "XGBoost"],
  },
  {
    slug: "spi-fpga",
    title: "SPI on an FPGA",
    summary:
      "A serial peripheral interface written in Verilog and brought up on an Intel Cyclone board during a VLSI internship.",
    category: "Embedded",
    pipeline: ["Verilog RTL", "Simulation", "Cyclone FPGA"],
    tags: ["Verilog", "FPGA", "SPI"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
