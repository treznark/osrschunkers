import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
  //   const { show, onClose, className, children } = props;
  const { show, className, children } = props;

  const [isBrowser, setIsBrowser] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (show) {
      // Save the current scroll position and prevent scrolling
      setScrollY(window.scrollY);
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      // Restore scrolling and scroll position
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
    }
  }, [show, scrollY]);

  //   const handleClose = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
  //     e.preventDefault();
  //     onClose();
  //   };

  const modalContent = (
    <div
      className={`fixed inset-0 bg-overlay flex justify-center items-center ${
        show ? "block" : "hidden"
      }`}
      style={{ pointerEvents: show ? "auto" : "none", zIndex: 10 }}
    >
      <div
        className={`bg-white p-10 pt-5 rounded-lg ${className}`}
        style={{
          opacity: show ? 1 : 0,
          transition: "opacity 0.5s",
          minWidth: "400px",
        }}
      >
        <div className="flex justify-end">
          {/* <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer text-2xl"
            onClick={handleClose}
          /> */}
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );

  if (isBrowser) {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;
    return createPortal(modalContent, modalRoot);
  } else {
    return null;
  }
}
