export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adebayo Olanrewaju",
    location: "Lagos",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 4.5,
    comment:
      "I love Naijabites! The groceries are fresh and the prices are unbeatable. I've been using them for years and I'll continue to do so.",
  },
  {
    id: 2,
    name: "Fatima Ibrahim",
    location: "Kano",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 4,
    comment:
      "Great selection of authentic Nigerian products. Fast delivery and excellent customer service. Highly recommended!",
  },
  {
    id: 3,
    name: "Aisha Tanko",
    location: "Lagos",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 4.5,
    comment:
      "Naijabites saved me so much time! I can now shop for all my essentials and have them delivered right to my doorstep. Their delivery is always quick and reliable!",
  },
  {
    id: 4,
    name: "Chinedu Okafor",
    location: "Abuja",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    comment:
      "Finally found authentic Nigerian ingredients! The rice quality is exactly like what I remember, and delivery is always on time.",
  },
  {
    id: 5,
    name: "Blessing Adebayo",
    location: "Port Harcourt",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 4,
    comment:
      "NaijaBites has made cooking Nigerian meals so much easier. Everything arrives fresh and the prices are very reasonable.",
  },
  {
    id: 6,
    name: "Emeka Nwankwo",
    location: "Enugu",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    comment:
      "The customer service is excellent and they have brands I can't find anywhere else. Highly recommend for all Nigerians!",
  },
];
