import "dotenv/config";
import mongoose from "mongoose";
import Team from "./models/Team.js";
import Gallery from "./models/Gallery.js";
import dns from "dns";

// Prevent connection issues on some networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const newTeamMembers = [
  // Club President
  {
    name: "Parth Soni",
    position: "Club President",
    department: "President",
    bio: "Visionary leader overseeing the club operations, industry partnerships, and overall growth of Dronex AeroTech.",
    image: "/parth_soni.jpg",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  // Technical
  {
    name: "Kabir Mehta",
    position: "Technical Lead",
    department: "Technical",
    bio: "Leads drone aerodynamic designs, flight control systems integration, and hardware prototyping.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Arjun Patel",
    position: "Aerodynamics Specialist",
    department: "Technical",
    bio: "Focuses on wing optimization, CFD simulations, and lightweight fuselage designs.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Dev Shah",
    position: "Avionics Specialist",
    department: "Technical",
    bio: "Handles ESC calibration, power distribution networks, and flight controller setups.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Aarav Joshi",
    position: "Structural Analyst",
    department: "Technical",
    bio: "Analyzes structural integrity, stress points, and load capacities of custom-built multirotors.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  // Photo & Video Editing
  {
    name: "Ishan Malhotra",
    position: "Editing Lead",
    department: "Photo & Video Editing",
    bio: "Manages visual narratives, color grading, sound design, and post-production for all club media.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Rhea Sen",
    position: "Video Editor",
    department: "Photo & Video Editing",
    bio: "Cuts and sequences raw footage from workshops, flight tests, and competition updates.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Kunal Roy",
    position: "VFX Artist",
    department: "Photo & Video Editing",
    bio: "Integrates visual effects, 3D graphics overlay, and animations for promotional videos.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Tanvi Bose",
    position: "Motion Graphics Designer",
    department: "Photo & Video Editing",
    bio: "Designs intros, title transitions, kinetic typography, and animated overlays.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  // Promotion & Social Media
  {
    name: "Kiara Advani",
    position: "PR & Social Lead",
    department: "Promotion & Social Media",
    bio: "Directs online marketing campaigns, public relations, community engagement, and brand aesthetics.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Neil D'Souza",
    position: "Social Media Manager",
    department: "Promotion & Social Media",
    bio: "Schedules content across channels, tracks engagement metrics, and optimizes outreach strategies.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Ananya Panday",
    position: "Content Planner",
    department: "Promotion & Social Media",
    bio: "Develops editorial calendars, content pillars, and interactive social polls/quizzes.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Armaan Malik",
    position: "Community Representative",
    department: "Promotion & Social Media",
    bio: "Interacts with student clubs, replies to messages, and manages subscriber newsletters.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  // Photography & Videography
  {
    name: "Rohan Das",
    position: "Creative Director",
    department: "Photography & Videography",
    bio: "Sets visual concepts, directs camera angles, and oversees high-quality photo-shoots for club events.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Sneha Kapoor",
    position: "Lead Photographer",
    department: "Photography & Videography",
    bio: "Captures high-resolution macro shots of hardware details, avionics setups, and student teams.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Aryan Khan",
    position: "Drone Operator & Videographer",
    department: "Photography & Videography",
    bio: "Flies tracking camera rigs to capture aerial footage of fixed-wing and multirotor test flights.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Maya Ali",
    position: "Event Photographer",
    department: "Photography & Videography",
    bio: "Focuses on capturing candid moments during workshops, presentations, and team meetings.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  // Event Management
  {
    name: "Divya Nair",
    position: "Events Lead",
    department: "Event Management",
    bio: "Coordinates event logistics, guest speaker sessions, university approvals, and workshops booking.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Sameer Varma",
    position: "Logistics Manager",
    department: "Event Management",
    bio: "Organizes transportation, hardware supply logistics, and setup arrangements on event locations.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Preeti Desai",
    position: "Sponsorship In-Charge",
    department: "Event Management",
    bio: "Develops pitch decks, reaches out to industry sponsors, and manages the event budgets.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Yash Singhania",
    position: "Publicity Manager",
    department: "Event Management",
    bio: "Drives physical flyer distribution, class-to-class announcements, and registers participants.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  // Content Writing
  {
    name: "Aanya Gupta",
    position: "Editorial Head",
    department: "Content Writing",
    bio: "Reviews and polishes copy for social media posts, newsletters, competition abstracts, and blogs.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Ritvik Sood",
    position: "Technical Writer",
    department: "Content Writing",
    bio: "Writes documentation, hardware specification sheets, and project reports.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Natasha Gill",
    position: "Social Media Copywriter",
    department: "Content Writing",
    bio: "Composes engaging, punchy post captions and announcements for Instagram and LinkedIn.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Siddharth Malhotra",
    position: "Club Reporter",
    department: "Content Writing",
    bio: "Interviews members, reports on event highlights, and drafts monthly activity summaries.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  // Web Development
  {
    name: "Chandani Solanki",
    position: "Web Development Lead",
    department: "Web Development",
    bio: "Passionate web developer building interactive applications and responsive portal for Dronex AeroTech.",
    image: "/chandani.jpg",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Rohan Mehta",
    position: "Systems Administrator",
    department: "Web Development",
    bio: "Maintains club servers, manages credentials, and guarantees portal database backups.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Lisa Geller",
    position: "DevOps Engineer",
    department: "Web Development",
    bio: "Configures and optimizes automated build test and deploy actions on cloud hostings.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Arpita Makwana",
    position: "Front-End Developer",
    department: "Web Development",
    bio: "Develops smooth interactive dashboards and web page components with CSS and React.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1782485715/dronex-aerotech/dcbnt5oetlnil3kfd0d1.jpg",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  // Graphic Designing & Auto CAD
  {
    name: "Vikram Rathore",
    position: "Design Head",
    department: "Graphic Designing & Auto CAD",
    bio: "Supervises all visual assets, promotional poster graphic models, and CAD designs for the drone frames.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Pooja Hegde",
    position: "CAD Modeler",
    department: "Graphic Designing & Auto CAD",
    bio: "Drafts high-precision 3D CAD blueprints of motor brackets, arm connections, and custom landing gears.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Varun Dhawan",
    position: "UI/UX Designer",
    department: "Graphic Designing & Auto CAD",
    bio: "Researches user flows, wireframes website mockups, and establishes a premium visual guide.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Shruti Haasan",
    position: "3D Rendering Artist",
    department: "Graphic Designing & Auto CAD",
    bio: "Renders ultra-realistic visual models of completed drone builds for sponsorship proposals.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  }
];

const newGalleryItems = [
  {
    title: "Flight Test Day",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600",
    description: "Field testing our custom quadcopter configuration for payload stabilization."
  },
  {
    title: "Avionics Soldering Workshop",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    description: "Hands-on student training session covering soldering, ESC calibration, and wiring."
  },
  {
    title: "CFD Simulation Analysis",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600",
    description: "Simulated aerodynamic drag and lift analysis on our fixed-wing drone design."
  },
  {
    title: "Team Competition Presentation",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
    description: "Pitching our drone design and autonomous software architecture to industry experts."
  },
  {
    title: "Club Booth Exhibition",
    type: "image",
    mediaUrl: "/gallery_1.jpg",
    description: "Our Dronex AeroTech team presenting custom drone designs at the college tech exhibition booth."
  },
  {
    title: "Flight Simulator Training",
    type: "image",
    mediaUrl: "/gallery_2.jpg",
    description: "Students practicing drone navigation and flight maneuvers on our specialized joystick controller setup."
  },
  {
    title: "Faculty Inspection",
    type: "image",
    mediaUrl: "/gallery_3.jpg",
    description: "Inspecting fixed-wing drone construction alongside faculty members and advisors during flight day."
  },
  {
    title: "Interactive Drone Workshop",
    type: "image",
    mediaUrl: "/gallery_4.jpg",
    description: "Providing hands-on guidance to students setting up drone flight parameters and hardware testing."
  },
  {
    title: "Multirotor Hardware Showcase",
    type: "image",
    mediaUrl: "/gallery_5.jpg",
    description: "Display of our carbon-fiber quadcopter configurations ready for structural flight testing."
  },
  {
    title: "Aarunya 2026 Simulation Arena",
    type: "image",
    mediaUrl: "/gallery_6.jpg",
    description: "The Dronex AeroTech team posing together at the Aarunya 2026 Simulation Arena booth."
  },
  {
    title: "Multirotor Calibration",
    type: "image",
    mediaUrl: "/gallery_7.jpg",
    description: "Detailed adjustments and calibration of our carbon-fiber quadcopter frame prior to flight demonstrations."
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding.");

    // Seed Team Members
    // Clear existing team members first to ensure a clean state
    await Team.deleteMany({});
    console.log("Cleared existing team members.");

    for (const member of newTeamMembers) {
      await Team.create(member);
      console.log(`Added team member: ${member.name}`);
    }

    // Seed Gallery Items
    for (const item of newGalleryItems) {
      const exists = await Gallery.findOne({ title: item.title });
      if (!exists) {
        await Gallery.create(item);
        console.log(`Added gallery item: ${item.title}`);
      } else {
        console.log(`Gallery item already exists: ${item.title}`);
      }
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedData();
