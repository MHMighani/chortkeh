import "./footer.scss";

const Footer = () => {
  const link = (
    <a
      rel="noreferrer"
      target="_blank"
      href="https://www.linkedin.com/in/mh-mighani/"
    >
      محمدحسین میقانی
    </a>
  );
  return (
    <footer className="footer">
      <p className="footer-text">ساخته شده توسط {link} </p>
    </footer>
  );
};

export default Footer;
