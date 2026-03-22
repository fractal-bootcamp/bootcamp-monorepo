import { useState } from "react";

interface FullDiagramImageProps {
  src: string;
  alt: string;
}

export default function FullDiagramImage({ src, alt }: FullDiagramImageProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div style={{ position: "relative" }}>
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            display: "block",
            border: "2px solid var(--color-charcoal)",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.15)",
          }}
        />
        <button
          onClick={() => setModalOpen(true)}
          title="View fullscreen"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.55)",
            border: "2px solid rgba(255,255,255,0.5)",
            color: "#fff",
            width: 38,
            height: 38,
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polyline points="2,7 2,2 7,2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="13,2 18,2 18,7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="18,13 18,18 13,18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7,18 2,18 2,13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <button
            onClick={() => setModalOpen(false)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              width: 36,
              height: 36,
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "95vw",
              maxHeight: "95vh",
              objectFit: "contain",
              cursor: "default",
            }}
          />
        </div>
      )}
    </>
  );
}
