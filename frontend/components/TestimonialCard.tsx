
import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 h-full flex flex-col">
      <p className="text-gray-300 italic mb-6 flex-grow">“{testimonial.quote}”</p>
      <div className="flex items-center">
        <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-bold text-white">{testimonial.author}</p>
          <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
