const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer p-4 pt-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="mb-3">Contact Us</h4>
            <p>
              <strong>Madina Chemists and Druggists</strong>
              <br />
              New Bypass road, Wanpoh
              <br />
              Anantnag, Jammu and Kashmir, 192124
            </p>
            <p>
              <strong>Phone:</strong> +919682586995
              <br />
              <strong>WhatsApp:</strong> +919186006025
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="mb-3">About Us</h4>
            <p>
              Founded in 2023, Madina Chemists and Druggist has been a
              cornerstone of the community's health. Our mission is to provide
              reliable, affordable, and accessible healthcare solutions to
              everyone.
            </p>
          </div>

          <div className="col-lg-4 col-md-12 mb-4">
            <h4 className="mb-3">Opening Hours</h4>
            <p>Mon - Sun: 8:00 AM - 8:00 PM</p>
          </div>
        </div>

        <div>
          <ul className="list-inline text-center">
            <li className="list-inline-item">
              <a href="tel:+919682586995" target="_blank">
                <img src="./images/telephone.png" width="30px" alt="tele" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://wa.me/+919682586995" target="_blank">
                <img src="./images/whatsapp.png" width="30px" alt="whatsapp" />
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="https://www.instagram.com/madina.chemists?igsh=MWw3dmJnaXp1enBhNA=="
                target="_blank"
              >
                <img src="./images/instagram.png" width="30px" alt="insta" />
              </a>
            </li>
          </ul>
        </div>

        <hr className="text-white-50" />
        <div className="text-center">
          <p className="mb-0 small">
            Copyright © {currentYear} Madina Chemists and Druggist. Designed by{" "}
            <a href="http://hameem.fun/" target="_blank">
              Hameem Shah.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
