const Footer = () => (
  <>
    <footer className="text-center text-light mt-2">
      <span>&copy; Sagi Levy Project</span>

      <span  className="m-2">{new Date().getFullYear()}</span>
    </footer>
  </>
);
export default Footer;
