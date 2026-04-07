import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>WhiteHat Jr</h4>
                <h5>Python Development Experience</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Collaborated remotely on Python-based projects during the pandemic, developing a strong foundation in data analysis and visualization using libraries such as NumPy, Pandas, and Matplotlib.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Junior Working Team (Technical)</h4>
                <h5>IEEE Computer Society</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built Virtual Mentor — an AI-powered learning assistant leveraging
              LLMs with multi-modal RAG to process course materials across all
              eight semesters, offering precise and interactive responses.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Core Working Team (Technical Head)</h4>
                <h5>IEEE Computer Society</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Building Hiring Assistant — an AI-powered hiring platform that
              automates resume screening and candidate ranking using NLP,
              embeddings, and cosine similarity with FastAPI and llama-based
              models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
