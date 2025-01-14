import { IoClose } from "react-icons/io5";

type Modal = {
    children: any;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    size?: "sm" | "lg"
  };
  
  export function Modal(props: Modal) {
    const { className, children, isOpen, onClose, size = "lg" } = props;
  
    if (!isOpen) return null;
  
    return (
      <div
        className={`fixed inset-0 bg-[#00000080] flex justify-center items-center ${className}`}
        onClick={onClose}
      >
        <div
          className={`${size === "lg" ? "w-8/12 h-[700px]" : "w-[500px] h-[300px]" } bg-white rounded p-2 relative`}
          onClick={(e) => e.stopPropagation()}
        >
            <IoClose className="absolute right-6 top-2 hover:text-gray-400 cursor-pointer" size={22} onClick={onClose} />
          {children}
        </div>
      </div>
    );
  }
  