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
    location: "Toronto",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 4.5,
    comment:
      "I love NaijaBites! Finding authentic Nigerian groceries in Canada has never been easier. The palm oil tastes just like home and the delivery is always fresh.",
  },
  {
    id: 2,
    name: "Fatima Ibrahim",
    location: "Calgary",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 4,
    comment:
      "Great selection of authentic Nigerian products. I can finally make proper jollof rice in Canada! Fast delivery and excellent customer service.",
  },
  {
    id: 3,
    name: "Aisha Tanko",
    location: "Vancouver",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 4.5,
    comment:
      "NaijaBites saved me so much time! I was driving 2 hours to African stores before. Now I get everything delivered to my door in Vancouver. Life saver!",
  },
  {
    id: 4,
    name: "Chinedu Okafor",
    location: "Ottawa",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    comment:
      "Finally found authentic Nigerian ingredients in Canada! The rice quality is exactly like what I remember from home, and delivery is always on time.",
  },
  {
    id: 5,
    name: "Blessing Adebayo",
    location: "Montreal",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 4,
    comment:
      "NaijaBites has made cooking Nigerian meals so much easier here in Montreal. Everything arrives fresh and the prices are very reasonable for Canada.",
  },
  {
    id: 6,
    name: "Emeka Nwankwo",
    location: "Edmonton",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    comment:
      "The customer service is excellent and they have Nigerian brands I can't find anywhere else in Canada. Highly recommend for all Nigerians in the diaspora!",
  },
];
