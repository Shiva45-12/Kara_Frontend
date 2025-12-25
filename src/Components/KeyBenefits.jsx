const KeyBenefits = () => {
  const benefits = [
    {
      icon: "/assets/images/home01/cost.png",
      title: "Cost Saving",
      description: "Reduce electricity bills by up to 90% and enjoy long-term savings"
    },
    {
      icon: "/assets/images/home01/ecco.png",
      title: "Eco-Friendly",
      description: "Clean renewable energy that reduces carbon footprint significantly"
    },
    {
      icon: "/assets/images/home01/roi.png",
      title: "Quick ROI",
      description: "Recover your investment in 3-4 years with guaranteed returns"
    },
    {
      icon: "/assets/images/home01/grid.png",
      title: "Grid Independence",
      description: "Freedom from power cuts and rising electricity rates"
    },
    {
      icon: "/assets/images/home01/custom copy.png",
      title: "Custom Engineering",
      description: "Tailored solutions designed for your specific needs"
    }
  ];

  return (
    <section className="key-benefits-section">
      <div className="container">
        <div className="section-header">
          <h2>Key Benefits</h2>
          <p>Discover why solar energy is the smart choice for your future</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <img src={benefit.icon} alt={benefit.title} />
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;