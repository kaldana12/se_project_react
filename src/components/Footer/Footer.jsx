import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <span className="footer__name">Developed by Karen Aldana</span>
      <span className="footer__year"> {new Date().getFullYear()}</span>
    </footer>
  );
}

export default Footer;
