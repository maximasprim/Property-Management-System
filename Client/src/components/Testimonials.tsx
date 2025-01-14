import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  username: string;
  text: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Leslie Alexander',
    username: '@lesliealexander',
    text: '“The car rental process was seamless. The vehicle was in great condition and the staff were extremely helpful.”',
  },
  {
    id: 2,
    name: 'Michael Foster',
    username: '@michaelfoster',
    text: '“Amazing service! The car was clean and well-maintained. I had no issues during my rental period.”',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    username: '@driesvincent',
    text: '“Great experience! The booking process was quick and easy, and the car exceeded my expectations.”',
  },
  {
    id: 4,
    name: 'Brenno Gayette',
    username: '@brennodayette',
    text: '“Excellent customer service. They were very accommodating and made sure I had everything I needed.”',
  },
  {
    id: 5,
    name: 'Lindsay Walton',
    username: '@lindsaywalton',
    text: '“The rates were very reasonable, and the car was in perfect condition. I will definitely rent from them again.”',
  },
  {
    id: 6,
    name: 'Courtney Henry',
    username: '@courtneyhenry',
    text: '“Very satisfied with the service. The car was delivered on time and the return process was hassle-free.”',
  },
  {
    id: 7,
    name: 'Whitney Francis',
    username: '@whitneyfrancis',
    text: '“Professional and efficient service. The staff were very friendly and helpful throughout the rental.”',
  },
  {
    id: 8,
    name: 'Leonard Krasner',
    username: '@leonardkrasner',
    text: '“I had a fantastic experience renting a car from this company. The vehicle was top-notch and the service was outstanding.”',
  },
  {
    id: 9,
    name: 'Floyd Miles',
    username: '@floydmiles',
    text: '“The entire process was smooth and easy. I highly recommend this car rental company.”',
  },
  {
    id: 10,
    name: 'Emily Seimon',
    username: '@emilyseimon',
    text: '“Great value for money. The car was reliable and the service was excellent.”',
  },
];

const TestimonialCard: React.FC<Testimonial> = ({ name, username, text, avatar }) => (
  <div className="p-6 bg-white shadow-md rounded-lg">
    {avatar && <img src={avatar} alt={name} className="w-12 h-12 rounded-full mb-4" />}
    <p className="text-sm text-gray-600 mb-4">{text}</p>
    <p className="font-semibold">{name}</p>
    <p className="text-xs text-gray-500">{username}</p>
  </div>
);

const Testimonials: React.FC = () => (
  <div className="bg-gradient-to-r from-gray-300  to-white-300 py-12">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">We have worked with thousands of amazing people</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
        <div className="space-y-8">
          {testimonials.slice(3, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
        <div className="space-y-8">
          {testimonials.slice(6, 10).map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
