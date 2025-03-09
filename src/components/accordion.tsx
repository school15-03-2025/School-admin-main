import { useState, ReactNode } from 'react';

interface AccordionProps {
  title: ReactNode;
  content?: ReactNode; 
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="border-b border-gray-300">
      <button
        type='button'
        className="w-full flex justify-between border-b border-gray-200 items-center p-2 text-left text-gray-800 font-semibold hover:bg-gray-200 focus:outline-none"
        aria-expanded={isOpen}>
        <span>{title}</span>
        {(content) && (
            <span className={`transform text-xl transition-transform ${isOpen ? 'rotate-45' : 'rotate-0'}`} onClick={toggleAccordion}>
              +
            </span>
        )}
      </button>
      {content && (
          <div
            className={`accordion-content transition-max-height duration-300 ease-in-out overflow-hidden ${
              isOpen ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <div className="p-4 text-gray-600">
              {content}  {/* Render any JSX passed as content */}
            </div>
          </div>
      )}
    </div>
  );
};

export default Accordion;