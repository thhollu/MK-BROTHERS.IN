import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 py-8">
      <div className="container mx-auto text-center text-gray-800 dark:text-gray-200">
        <p className="mb-2">
          MK Brothers, Kamaspur Road, Samana‑147101 (Punjab)
        </p>
        <p className="mb-2">
          Mobile:
          <a href="tel:9988977549" className="text-primary mx-1">
            9988977549
          </a>,
          <a href="tel:9915568549" className="text-primary mx-1">
            9915568549
          </a>,
          <a href="tel:6284193388" className="text-primary mx-1">
            6284193388
          </a>
        </p>
        <p className="mb-4">
          Emails:
          <a href="mailto:mkbmunshi23@gmail.com" className="text-primary mx-1">
            mkbmunshi23@gmail.com
          </a>,
          <a href="mailto:mkbcommercials@gmail.com" className="text-primary mx-1">
            mkbcommercials@gmail.com
          </a>,
          <a href="mailto:mkbrajesh23@gmail.com" className="text-primary mx-1">
            mkbrajesh23@gmail.com
          </a>
        </p>
        <div className="flex justify-center space-x-4 text-2xl mb-4">
          <a href="#" className="text-primary hover:text-primary/80">
            <FaFacebookF />
          </a>
          <a href="#" className="text-primary hover:text-primary/80">
            <FaInstagram />
          </a>
          <a href="#" className="text-primary hover:text-primary/80">
            <FaLinkedinIn />
          </a>
          <a href="#" className="text-primary hover:text-primary/80">
            <FaTwitter />
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MK Brothers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}