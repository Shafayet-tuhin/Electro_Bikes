import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggleOpen = (index) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const faqs = [
    { question: "Are Electric Bicycles safe?", answer: "Electric bicycles are generally safe as long as they are used responsibly and follow traffic rules." },
    { question: "Are Electric Bicycles faster than normal bicycles?", answer: "Yes, electric bicycles are faster than normal bicycles when riding in the electric-assisted mode and can go up to 25kmph speed. One can operate them as a regular bicycle by turning off the electric assist, and they will be as fast as a regular bicycle." },
    { question: "Do I need a Licence to ride an Electric Bicycle?", answer: "In most regions, you do not need a license to ride an electric bicycle. However, local laws may vary, so it is advisable to check with local authorities." },
    { question: "What is the Electric Cycle Price in India 2023?", answer: "The price of electric cycles in India varies depending on the brand and model, typically ranging from INR 20,000 to INR 50,000." },
    { question: "How fast can Electric Cycles go?", answer: "Electric cycles can typically reach speeds of up to 25kmph." },
    { question: "Can Electric Cycles climb up-hills easily?", answer: "Yes, electric cycles can climb hills more easily compared to regular bicycles, especially when using the electric assist mode." },
    { question: "Can you lose weight by riding Electric Bicycles?", answer: "Yes, riding electric bicycles can contribute to weight loss when combined with a balanced diet and regular exercise." },
    { question: "What is the range of an Electric Bicycle?", answer: "The range of an electric bicycle depends on the battery capacity, terrain, and usage but typically ranges from 30 to 60 km on a single charge." }
  ];

  return (
    <div className=''>
      <p className='font-semibold text-4xl text-center font-abc'>FAQ <span className='text-[#14C9C9]'>for Electobike</span></p>
      <p className='text-[#667085] mt-5 lg:w-[40rem] mx-auto font-normal text-base leading-6 text-center font-abc'>
        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
      </p>
      <div className='mt-8 max-w-3xl mx-auto'>
        {faqs.map((faq, index) => (
          <div key={index} className='mb-4 border-b'>
            <button
              onClick={() => toggleOpen(index)}
              className='flex justify-between items-center w-full py-4 text-left font-medium font-abc text-lg'
            >
              {faq.question}
              {open === index ? <FaMinus className="text-[#14C9C9]" /> : <FaPlus className="text-[#14C9C9] animate-pulse" />}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${open === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className='px-4 py-2 text-base font-abc text-[#667085]'>
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
