import { useState } from "react";

/* --------------------- Reusable box --------------------- */
export function Box({ children, element }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {/* We use element instead of children */}
      {isOpen && <>{element}</>}
      {/* {isOpen && <>{children}</>} */}
    </div>
  );
}
