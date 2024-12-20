/** @format */

import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-6 mb-8">
      <Container>
        <p className="text-sm">Inovoicivic &copy; {new Date().getFullYear()}</p>
        <p className="text-sm">
          Created by Neektech IT Solutions {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
