
export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isFeatured: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
}
