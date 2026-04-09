import { PropsWithChildren } from "react";
import { smoother } from "./Navbar";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const handleScroll = (target: string) => {
    if (smoother) {
      smoother.scrollTo(target, true, "top top");
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SHUBH
              <br />
              <span>SOMANI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Designing and Deploying</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI system</div>
              <div className="landing-h2-2">Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1">AI system</div>
            </h2>
            <p className="landing-subtext">
              RAG pipelines · Computer Vision · Self-hosted Infrastructure
            </p>
            <div className="landing-cta">
              <button
                className="cta-primary"
                onClick={() => handleScroll("#work")}
                data-cursor="disable"
              >
                View Projects
              </button>
              <button
                className="cta-secondary"
                onClick={() => handleScroll("#contact")}
                data-cursor="disable"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
