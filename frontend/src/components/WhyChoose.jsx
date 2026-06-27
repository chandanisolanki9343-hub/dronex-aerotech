import "./WhyChoose.css";

function WhyChoose() {

  const features = [
    {
      icon: "🚁",
      title: "Drone Innovation",
      description:
        "Design, build and test next-generation drones with hands-on engineering experience.",
    },
    {
      icon: "🤖",
      title: "AI & Robotics",
      description:
        "Work on autonomous navigation, computer vision and intelligent robotic systems.",
    },
    {
      icon: "🛰",
      title: "Research & Competitions",
      description:
        "Represent the college in hackathons, drone competitions and aerospace challenges.",
    },
    {
      icon: "💼",
      title: "Career Growth",
      description:
        "Gain practical skills, leadership experience and industry exposure for your future career.",
    },
  ];

  return (
    <section className="why-section">

      <div className="why-header">

        <h2>Why Choose Dronex AeroTech?</h2>

        <p>
          Learn, innovate and grow with one of the most exciting technology communities.
        </p>

      </div>

      <div className="why-grid">

        {features.map((item, index) => (

          <div
            className="why-card"
            key={index}
          >

            <div className="why-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyChoose;
