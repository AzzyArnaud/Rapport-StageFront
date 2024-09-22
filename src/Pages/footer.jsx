import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Ndangira</h3>
            <p className="mb-4">
              Une brève description de votre entreprise, de sa mission et de ses
              valeurs. Vous pouvez inclure des informations sur vos services ou
              produits principaux.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-white">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Service 1
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Service 2
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Service 3
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Service 4
                </a>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-2">
              <li>
                <span>Adresse : Ngagara Q3 Avenue sangwe N 02</span>
              </li>
              <li>
                <span>Téléphone : +257 62 379 428</span>
              </li>
              <li>
                <span>Email : azzyarnaud@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 border-t border-gray-700 pt-6 text-center md:text-left md:flex md:items-center md:justify-between">
          <p>© 2024 NexusX Tech. Libérez Votre potentiel numérique.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              Termes et conditions
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
