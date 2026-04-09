import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

interface Project {
  title: string;
  category: string;
  summary: string;
  problem: string;
  contribution: string;
  tools: string;
  features: string[];
  results: string[];
  github?: string;
  demo?: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Production-level RAG System",
    category: "Retrieval Augmented Generation / AI System",
    summary:
      "End-to-end RAG pipeline for reliable document Q&A at production scale",
    problem:
      "LLMs hallucinate on unstructured documents without grounded retrieval",
    contribution:
      "Multi-stage pipeline — hybrid retrieval, cross-encoder reranking, structured chunking, FastAPI serving",
    tools: "LangChain, Dockling, FastAPI, PgVector, Docker",
    features: [
      "Hybrid vector + BM25 search",
      "Cross-encoder reranking",
      "Dockling-based structured chunking",
      "REST API with FastAPI",
      "Docker-containerized deployment",
    ],
    results: [
      "Grounded answers reduce hallucinations",
      "Modular architecture scales to new document types",
    ],
    github: "",
    image: "/images/FullRAG.webp",
  },
  {
    title: "Self-Hosted Infrastructure Hub",
    category: "DevOps / Edge Computing",
    summary:
      "Full homelab stack running production AI services with zero cloud dependency",
    problem:
      "Cloud costs and data sovereignty for running personal AI workloads",
    contribution:
      "Proxmox hypervisor, LXC containers, ZFS storage, Coolify PaaS, Cloudflare SSL",
    tools: "Proxmox, LXC, Docker Containers, Tailscale, DataResilience",
    features: [
      "Proxmox + LXC for service isolation",
      "ZFS mirror with SSD L2ARC cache",
      "GTX 1650 Super for local inference",
      "Cloudflare SSL + reverse proxy",
      "Tailscale mesh VPN for remote access",
    ],
    results: [
      "Hosts RAG system + portfolio + hiring assistant",
      "24/7 uptime with ZFS data resilience",
    ],
    github: "",
    image: "/images/homelab.webp",
  },
  {
    title: "Vaidya Healthcare — Yoga Assistant",
    category: "Healthcare / Computer Vision",
    summary:
      "Real-time pose estimation AI for yoga-guided physical wellness support",
    problem:
      "Affordable, accessible AI-guided physiotherapy without specialized hardware",
    contribution:
      "CV pipeline with joint angle tracking, posture classification, and NLP health assistant",
    tools: "MediaPipe, OpenCV, ML Models, NLP",
    features: [
      "MediaPipe real-time pose estimation",
      "Joint angle scoring and feedback",
      "Custom ML posture classification",
      "NLP-powered symptom assistant",
    ],
    results: [
      "Runs on a standard webcam",
      "Fully offline — no cloud dependency",
    ],
    github: "",
    image: "/images/vaidya-heath.webp",
  },
  {
    title: "Self-Hosted Home Cloud",
    category: "DevOps / Homelab Infrastructure",
    summary:
      "Private cloud storage and media server replacing commercial cloud services",
    problem: "Reliance on third-party cloud for sensitive data and media",
    contribution:
      "TrueNAS NAS with Docker services, remote Tailscale access, Cloudflare SSL",
    tools: "TrueNAS, Docker, Tailscale, Cloudflare, NGINX",
    features: [
      "ZFS data protection with scrubbing",
      "Tailscale remote access from anywhere",
      "Cloudflare SSL termination",
      "NGINX reverse proxy routing",
      "Automated backup schedules",
    ],
    results: [
      "Multi-TB private cloud storage",
      "Replaced Google Drive and OneDrive entirely",
    ],
    github: "",
    image: "/images/sapphire.webp",
  },
  {
    title: "Virtual Mentor (IEEE CS)",
    category: "AI Learning Assistant",
    summary:
      "Multi-modal RAG chatbot processing 8 semesters of IEEE CS course materials",
    problem:
      "Students need precise, fast answers from hundreds of lecture PDFs and slides",
    contribution:
      "Multi-modal RAG pipeline, FastAPI endpoint, LLM integration with course-material grounding",
    tools: "LLMs, Multi-modal RAG, FastAPI, Python",
    features: [
      "Processes multi-format documents (PDF, slides)",
      "8-semester course material coverage",
      "FastAPI REST API backend",
      "LLM-grounded Q&A responses",
    ],
    results: [
      "Deployed for IEEE CS members",
      "Handles multi-format queries reliably",
    ],
    github: "",
    image: "/images/Maxlife.png",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setExpandedIndex(null);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const toggleDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-summary">{project.summary}</p>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tech Stack</span>
                          <p>{project.tools}</p>
                        </div>
                        <button
                          className={`details-toggle ${expandedIndex === index ? "details-toggle-active" : ""}`}
                          onClick={() => toggleDetails(index)}
                          data-cursor="disable"
                        >
                          Details <MdExpandMore />
                        </button>
                        <div
                          className={`carousel-detail-panel ${expandedIndex === index ? "panel-open" : ""}`}
                        >
                          <div className="detail-panel-inner">
                            <div className="detail-block">
                              <span className="detail-label">Problem</span>
                              <p>{project.problem}</p>
                            </div>
                            <div className="detail-block">
                              <span className="detail-label">What I Built</span>
                              <p>{project.contribution}</p>
                            </div>
                            <div className="detail-block">
                              <span className="detail-label">Key Features</span>
                              <ul>
                                {project.features.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="detail-block">
                              <span className="detail-label">Results</span>
                              <ul>
                                {project.results.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="detail-github-btn"
                                data-cursor="disable"
                              >
                                <FaGithub /> View on GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
