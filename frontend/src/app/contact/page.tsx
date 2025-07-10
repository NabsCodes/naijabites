import { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import Image from "next/image";
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with NaijaBites for support, questions, or partnership inquiries. We're here to help bring Nigerian flavors to your doorstep.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="container-padding relative bg-green-deep py-10">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Get in <span className="text-lemon-light">Touch</span> with Us
              </h1>
              <p className="mb-6 text-base text-white/90 sm:text-lg md:text-xl lg:text-xl">
                Have questions about our authentic Nigerian products? Need help
                with your order? We're here to help you bring the flavors of
                home to your kitchen.
              </p>

              {/* Quick Contact Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lemon-light">
                    <ClockIcon className="h-5 w-5 text-green-deep" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Response Time
                    </p>
                    <p className="text-xs text-white/80">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lemon-light">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-deep" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Support Team
                    </p>
                    <p className="text-xs text-white/80">Always ready</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Decorative Image */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[450px]">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 animate-pulse bg-gray-800/50" />
                <Image
                  src="/images/contact-us.png"
                  alt="Customer service representative helping with Nigerian grocery orders"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-3xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container-padding bg-gray-50 py-10 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar Content */}
            <div className="hidden space-y-6 lg:block">
              {/* Why Choose NaijaBites */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-dark/10">
                    <BuildingOfficeIcon className="h-5 w-5 text-green-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Why Choose Us?
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lemon-deep"></div>
                    <span>
                      <strong>Authentic Products:</strong> Direct from trusted
                      Nigerian suppliers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lemon-deep"></div>
                    <span>
                      <strong>Fast Delivery:</strong> Same-day processing across
                      Canada
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lemon-deep"></div>
                    <span>
                      <strong>Community Focus:</strong> Supporting Nigerian
                      diaspora
                    </span>
                  </li>
                </ul>
              </div>

              {/* Customer Testimonial */}
              <div className="rounded-2xl bg-gradient-to-br from-green-dark/5 to-lemon-deep/10 p-6">
                <div className="mb-4">
                  <div className="mb-2 flex text-lemon-deep">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm italic text-gray-700">
                    "Finally found a reliable source for authentic Nigerian
                    ingredients in Canada. Their customer service is
                    exceptional!"
                  </p>
                  <p className="mt-2 text-xs font-medium text-green-dark">
                    - Adaeze O., Toronto
                  </p>
                </div>
              </div>

              {/* Contact Tips */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-dark/10">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Get Faster Help
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-dark"></div>
                    <span>
                      Include your order number for order-related inquiries
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-dark"></div>
                    <span>
                      Specify product names for availability questions
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-dark"></div>
                    <span>Mention your location for shipping estimates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards - Redesigned */}
      <section className="container-padding bg-white py-10 lg:py-20">
        <div className="section-container">
          <div className="mb-10 text-center lg:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-green-deep md:text-4xl lg:text-5xl">
              Other Ways to Reach Us
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
              Choose the method that works best for you
            </p>
          </div>

          {/* Modern Contact Cards Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Email Support - Spans 4 columns on md, 5 on lg */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-deep to-green-dark p-[2px] transition-all duration-300 hover:shadow-lg md:col-span-6 lg:col-span-5">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 transition-all duration-300 group-hover:bg-gray-50">
                <div className="mb-4">
                  <div className="w-fit rounded-xl bg-green-dark/10 p-3">
                    <EnvelopeIcon className="h-6 w-6 text-green-dark" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Email Support
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  For order inquiries, product questions, and general support
                </p>
                <div className="mt-auto">
                  <p className="text-base font-medium text-green-dark">
                    support@naijabites.com
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Response within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Support - Spans 4 columns on md, 4 on lg */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-deep to-green-dark p-[2px] transition-all duration-300 hover:shadow-lg md:col-span-6 lg:col-span-4">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 transition-all duration-300 group-hover:bg-gray-50">
                <div className="mb-4">
                  <div className="w-fit rounded-xl bg-green-dark/10 p-3">
                    <PhoneIcon className="h-6 w-6 text-green-dark" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Phone Support
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Speak with our customer service team directly
                </p>
                <div className="mt-auto">
                  <p className="text-base font-medium text-green-dark">
                    +1 (555) 123-4567
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Mon-Fri: 9AM-6PM EST
                  </p>
                </div>
              </div>
            </div>

            {/* Business Inquiries - Spans 4 columns on md, 3 on lg */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-deep to-green-dark p-[2px] transition-all duration-300 hover:shadow-lg md:col-span-12 lg:col-span-3">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 transition-all duration-300 group-hover:bg-gray-50">
                <div className="mb-4">
                  <div className="w-fit rounded-xl bg-green-dark/10 p-3">
                    <BuildingOfficeIcon className="h-6 w-6 text-green-dark" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Business Inquiries
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Partnerships and wholesale opportunities
                </p>
                <div className="mt-auto">
                  <p className="text-base font-medium text-green-dark">
                    business@naijabites.com
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Response within 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location Section */}
      <section className="container-padding bg-gray-50 py-10 lg:py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-2xl font-bold text-green-deep md:text-4xl lg:text-5xl">
                Visit Our <span className="text-lemon-deep">Warehouse</span>
              </h2>
              <p className="mb-6 text-base text-gray-600 lg:text-lg">
                Located in the heart of Toronto, our warehouse is where we
                carefully store and package your favorite Nigerian products
                before they make their way to your doorstep.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-1 h-5 w-5 text-green-dark" />
                  <div>
                    <p className="font-medium text-gray-900">Our Address</p>
                    <p className="text-sm text-gray-600">
                      123 Avenue Road
                      <br />
                      Toronto, ON M4B 1B3
                      <br />
                      Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="mt-1 h-5 w-5 text-green-dark" />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-sm text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Map Placeholder */}
            <div className="relative h-[300px] lg:h-[400px]">
              <div className="absolute inset-0 overflow-hidden rounded-3xl bg-gray-200">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="mx-auto mb-4 h-12 w-12 text-green-dark" />
                    <p className="text-lg font-medium text-gray-700">
                      Interactive Map
                    </p>
                    <p className="text-sm text-gray-500">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
