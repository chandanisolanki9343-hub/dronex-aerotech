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
  // Secretary
  {
    name: "Harshvardhan Kaushal",
    position: "Secretary",
    department: "Secretary",
    bio: "Manages administrative affairs, meeting records, inter-domain correspondence, and event schedules.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783575415/dronex-aerotech/b089ymfvqcqjyqv77rwf.png",
    linkedin: "https://www.linkedin.com/in/harsh-vardhan-kaushal-84212b317?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/coolharsh408",
    isLeader: true
  },
  // Technical
  {
    name: "Ankit Gurjar",
    position: "Technical Lead",
    department: "Technical",
    bio: "Leads drone aerodynamic designs, flight control systems integration, and hardware prototyping.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783525258/dronex-aerotech/x9fwvu9g3fcnkhne0bu8.jpg",
    linkedin: "https://www.linkedin.com/in/ankit-gurjar-16501a34a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Aryan Narwariya",
    position: "Technical Co-lead",
    department: "Technical",
    bio: "Specializes in drone design, autonomous navigation systems, flight hardware calibration, and embedded systems integration.",
    image: "/aryan_narwariya.png",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    portfolio: "https://my-portfolio-2cs.pages.dev/",
    isLeader: true
  },
  {
    name: "Prajwal Pandey",
    position: "Aerodynamics Specialist",
    department: "Technical",
    bio: "Focuses on wing optimization, CFD simulations, and lightweight fuselage designs.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783524972/dronex-aerotech/xqkxtoz7qmgfrfl5olmu.jpg",
    linkedin: "https://www.linkedin.com/in/prajwal-pandey-5252b7329?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Shiva Gupta",
    position: "Avionics Specialist",
    department: "Technical",
    bio: "Handles ESC calibration, power distribution networks, and flight controller setups.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783506006/dronex-aerotech/uavbr2iosc77d7tskp6g.jpg",
    linkedin: "https://www.linkedin.com/in/shiva-gupta-7bab633a6",
    github: "https://github.com/Shiva981",
    portfolio: "https://shiva-gupta-portfolio.vercel.app/",
    isLeader: false
  },
  {
    name: "Aryan Bhadoriya",
    position: "Structural Analyst",
    department: "Technical",
    bio: "Analyzes structural integrity, stress points, and load capacities of custom-built multirotors.",
    image: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Divyansh Sharma",
    position: "Technical Executive",
    department: "Technical",
    bio: "Focuses on drone software integration, flight testing, telemetry systems, and hardware-software synchronization.",
    image: "/divyansh_sharma.png",
    linkedin: "https://www.linkedin.com/in/workdivyanshsharma/",
    github: "https://github.com/workdivyansh",
    isLeader: false
  },
  // Photo & Video Editing
  {
    name: "Anushree Khatri",
    position: "Video Editor",
    department: "Photo & Video Editing",
    bio: "Cuts and sequences raw footage from workshops, flight tests, and competition updates.",
    image: "/anushree_khatri.png",
    linkedin: "https://www.linkedin.com/in/anushree-khatri-72b78237b",
    github: "https://github.com/anushreekhatri028-coder",
    isLeader: false
  },
  {
    name: "Love Singh Rajput",
    position: "Video Editor",
    department: "Photo & Video Editing",
    bio: "Edits and sequences raw footage from flight tests, workshops, and club activities.",
    image: "/love_singh_rajput.png",
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

  // Event Management
  {
    name: "Vaishnavi Sharma",
    position: "Management Lead",
    department: "Event Management",
    bio: "Coordinates event logistics, management, university approvals, and workshops booking.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783505019/dronex-aerotech/txtq8xra4xal0z6dmca9.jpg",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeader: true
  },
  {
    name: "Gaurav Pal",
    position: "Logistics Manager",
    department: "Event Management",
    bio: "Organizes transportation, hardware supply logistics, and setup arrangements on event locations.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783508165/dronex-aerotech/qduodqo3xthgj4l4c3zs.jpg",
    linkedin: "https://www.linkedin.com/in/gaurav-pal-4b59b1420?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Yash Baghel",
    position: "Sponsorship In-Charge",
    department: "Event Management",
    bio: "Develops pitch decks, reaches out to industry sponsors, and manages the event budgets.",
    image: "/yash_baghel.png",
    linkedin: "https://www.linkedin.com/in/yash-baghel-042085305?utm_source=share_via&utm_content=profile&utm_medium=membeur_android",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Puneet Choudhary",
    position: "Publicity Manager",
    department: "Event Management",
    bio: "Drives physical flyer distribution, class-to-class announcements, and registers participants.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783506963/dronex-aerotech/iwlmfryv0kroqbfqueqj.jpg",
    linkedin: "https://www.linkedin.com/in/puneet-choudhary-b9b07a37b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Anushka Tomar",
    position: "Management Executive",
    department: "Event Management",
    bio: "Contributes to club logistics, management operations, and event orchestration.",
    image: "/anushka_tomar.png",
    linkedin: "https://www.linkedin.com/in/anushka-tomar-1479b0420?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Sakshi Thakur",
    position: "Management Executive",
    department: "Event Management",
    bio: "Contributes to club logistics, management operations, and event orchestration.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783509520/dronex-aerotech/bgurnh0ur5rchbbrlppy.jpg",
    linkedin: "https://www.linkedin.com/in/sakshi-thakur-645248329?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Abhayraj Chaurasia",
    position: "Management Executive",
    department: "Event Management",
    bio: "Contributes to club logistics, management operations, and event orchestration.",
    image: "https://res.cloudinary.com/dbkednkcg/image/upload/v1783510153/dronex-aerotech/f3u20yrmctw4o11sd1yi.jpg",
    linkedin: "https://www.linkedin.com/in/abhayraj-chaurasia-94a2503a2?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com",
    isLeader: false
  },
  {
    name: "Prajjwal Rai",
    position: "Management Executive",
    department: "Event Management",
    bio: "Contributes to club logistics, management operations, and event orchestration.",
    image: "/prajjwal_rai.png",
    linkedin: "https://www.linkedin.com/in/prajjwal-rai-036020343?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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
