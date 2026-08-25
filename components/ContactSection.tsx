import { Mail, Phone, Instagram, Linkedin } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">GET IN TOUCH</span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Reach out to the NIRVAN '26 team for sponsorships or queries.</p>
        </div>

        <div className="contact-grid">
          {/* Email Card */}
          <a href="mailto:nirvan@gehu.in" className="contact-card group">
            <div className="contact-icon-wrapper">
              <Mail className="contact-icon" />
            </div>
            <div className="contact-info">
              <h3>Email</h3>
              <p>nirvan@gehu.in</p>
            </div>
          </a>

          {/* Phone Card */}
          <a href="tel:+911256489632" className="contact-card group">
            <div className="contact-icon-wrapper">
              <Phone className="contact-icon" />
            </div>
            <div className="contact-info">
              <h3>Phone</h3>
              <p>+91 1256489632</p>
            </div>
          </a>

          {/* Instagram Card */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-card group">
            <div className="contact-icon-wrapper">
              <Instagram className="contact-icon" />
            </div>
            <div className="contact-info">
              <h3>Instagram</h3>
              <p>@nirvan_fest</p>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-card group">
            <div className="contact-icon-wrapper">
              <Linkedin className="contact-icon" />
            </div>
            <div className="contact-info">
              <h3>LinkedIn</h3>
              <p>NIRVAN '26</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
