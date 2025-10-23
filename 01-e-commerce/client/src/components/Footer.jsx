import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navItems = {
    Company: ["About Us", "Careers", "News", "Sustainability"],
    Products: ["Aerospace", "Medical", "Automotive", "Industrial"],
    Support: ["Contact", "FAQ", "Privacy Policy", "Terms of Service"],
  };

  const contactInfo = [
    { icon: Mail, text: "sales@cnc-precision.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: MapPin, text: "450 Industrial Blvd, Tech City, TX 78701" },
  ];

  const SocialIcon = ({ Icon, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 hover:text-orange-400 transition duration-300 p-2 rounded-full border border-gray-700 hover:border-orange-400"
    >
      <Icon size={20} />
    </a>
  );

  return (
    <footer className="bg-gray-100 text-white mt-12">
      <div className="max-w-360 mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info & Logo */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-orange-400 mb-4">
              CNC Precision
            </h3>
            <p className="text-gray-800 text-sm max-w-sm">
              Delivering the future of manufacturing through advanced CNC
              machining and strict quality control for critical industries.
            </p>

            <div className="flex space-x-4 mt-6">
              <SocialIcon Icon={Linkedin} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Facebook} href="#" />
            </div>
          </div>

          {/* Navigation Columns */}
          {Object.entries(navItems).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4 text-orange-300">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-800 hover:text-orange-400 transition duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-300">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start space-x-2">
                  <Icon
                    size={18}
                    className="text-orange-400 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-800 text-sm leading-snug">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-orange-400 text-center">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} CNC Precision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
