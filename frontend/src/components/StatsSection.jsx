import "./StatsSection.css";

function StatsSection() {
  const stats = [
    {
      number: "50+",
      title: "Active Members",
    },
    {
      number: "25+",
      title: "Drone Projects",
    },
    {
      number: "12+",
      title: "Competitions",
    },
    {
      number: "8+",
      title: "Workshops",
    },
  ];

  return (
    <section className="stats">

      <div className="stats-heading">

        <h2>Dronex AeroTech In Numbers</h2>

        <p>
          Passion, Innovation and Engineering Excellence.
        </p>

      </div>

      <div className="stats-grid">

        {stats.map((item, index) => (

          <div
            className="stat-card"
            key={index}
          >

            <h1>{item.number}</h1>

            <p>{item.title}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default StatsSection;
