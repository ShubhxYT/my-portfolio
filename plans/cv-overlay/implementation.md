# CV Overlay on Resume Button Click

## Goal
Replace the resume download link with an in-page PDF overlay that opens on click (desktop) or opens in a new tab (mobile), and dismisses via backdrop click, Escape key, or X button.

## Prerequisites
Make sure that you are currently on the `feat/cv-overlay` branch before beginning implementation.
If not, move to the correct branch. If the branch does not exist, create it from main.

---

### Step-by-Step Instructions

#### Step 1: Fix PDF reference + convert anchor to button

- [x] Open `src/components/SocialIcons.tsx`
- [x] Replace the entire file contents with the code below:

```tsx
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";
import CVOverlay from "./CVOverlay";

const SocialIcons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResumeClick = () => {
    if (window.innerWidth < 768) {
      window.open("/CV-Shubh.pdf", "_blank");
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/ShubhxYT" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/shubh-somani" target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com/shubhsomani" target="_blank">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/shubhsomani" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      <div className="resume-button" onClick={handleResumeClick}>
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </div>
      <CVOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default SocialIcons;
```

##### Step 1 Verification Checklist
- [x] No build errors (the build will show an error about missing `CVOverlay` — this is expected and will be resolved in Step 2)
- [x] The resume button in `SocialIcons.tsx` is now a `<div>` with `onClick` instead of an `<a>` with `href`
- [x] The PDF path is corrected to `/CV-Shubh.pdf`
- [x] `useState` and `CVOverlay` are imported

#### Step 1 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 2: Create CVOverlay component + styles

- [x] Create a new file `src/components/CVOverlay.tsx`
- [x] Copy and paste the code below into `src/components/CVOverlay.tsx`:

```tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles/CVOverlay.css";

interface CVOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVOverlay = ({ isOpen, onClose }: CVOverlayProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="cv-overlay-backdrop" onClick={onClose}>
      <div
        className="cv-overlay-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cv-overlay-close"
          onClick={onClose}
          aria-label="Close CV overlay"
        >
          ✕
        </button>
        <iframe
          className="cv-overlay-iframe"
          src="/CV-Shubh.pdf"
          title="CV - Shubh Somani"
        />
      </div>
    </div>,
    document.body
  );
};

export default CVOverlay;
```

- [x] Create a new file `src/components/styles/CVOverlay.css`
- [x] Copy and paste the code below into `src/components/styles/CVOverlay.css`:

```css
.cv-overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: cv-overlay-fade-in 0.25s ease-out;
}

.cv-overlay-panel {
  position: relative;
  width: 80vw;
  height: 85vh;
  max-width: 1200px;
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.cv-overlay-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.cv-overlay-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: background 0.2s;
}

.cv-overlay-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes cv-overlay-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

##### Step 2 Verification Checklist
- [x] No build errors
- [x] Click the RESUME button on desktop → overlay appears with the PDF visible inside an iframe
- [x] Click the dark backdrop area → overlay closes
- [x] Press Escape key → overlay closes
- [x] Click the X button (top-right corner) → overlay closes
- [x] Resize the browser to < 768px width and click RESUME → PDF opens in a new tab (no overlay)
- [x] The overlay renders above the navbar (z-index 9999), social icons (z-index 999), and 3D character
- [x] Clicking inside the PDF/panel does NOT close the overlay (stopPropagation is working)

#### Step 2 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.
