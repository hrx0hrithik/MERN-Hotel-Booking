import React from "react";
import Footer from "./Footer";

function About() {
  const aboutPageStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '800px auto 20px auto',
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
  };

  const listItemStyle = {
    marginBottom: '10px',
  };
  return(
    <>
        <div className="container " style={aboutPageStyle}>
          <div className="container">
      <h1>Welcome to <span className="fw-bold" style={{ color: '#ff6d38' }}>Go</span><span className="fw-bold" style={{ color: '#2877da' }} >YOLO</span> - Your Ultimate Hotel Room Booking Destination!</h1>
      <p>
        At GoYOLO, we are dedicated to providing you with the best hotel room booking experience. Our mission is to make your travel planning hassle-free and enjoyable. Whether you're traveling for business or leisure, we offer a wide selection of comfortable and luxurious rooms to suit your needs. Our user-friendly interface allows you to explore various hotels, check room availability, compare prices, and book your preferred room with just a few clicks.
      </p>

      <h2>Why choose <span className="fw-bold" style={{ color: '#ff6d38' }}>Go</span><span className="fw-bold" style={{ color: '#2877da' }} >YOLO</span>?</h2>
      <ul>
        <li style={listItemStyle}>
          <strong>Extensive Selection:</strong> We have partnered with top hotels worldwide, offering you a diverse range of accommodation options. From cozy boutique hotels to renowned luxury resorts, we have it all.
        </li>
        <li style={listItemStyle}>
          <strong>Real-time Availability:</strong> Our platform is seamlessly integrated with hotels' booking systems, ensuring you get real-time availability and instant confirmation for your reservations.
        </li>
        <li style={listItemStyle}>
          <strong>Transparent Pricing:</strong> We believe in transparency, which is why we display all costs upfront, including taxes and fees. No hidden charges, no surprises.
        </li>
        <li style={listItemStyle}>
          <strong>User-friendly Interface:</strong> Our website is designed to be intuitive and easy to navigate. You can quickly find the information you need and complete your booking effortlessly.
        </li>
        <li style={listItemStyle}>
          <strong>Secure Payment:</strong> Your security is our priority. We utilize the latest encryption technology to safeguard your payment information and ensure a safe transaction process.
        </li>
      </ul>

      <h2>About the Development:</h2>
      <p>
        Creating a full-stack MERN (MongoDB, Express, React, Node.js) app like GoYOLO was an exhilarating journey, but it also came with its fair share of challenges. Some of the problems we faced during the development process included:
      </p>
      <ul>
        <li style={listItemStyle}>Data Modeling: Designing the data schema and models for hotels, rooms, bookings, and users required careful consideration to ensure efficient querying and proper relationships.</li>
        <li style={listItemStyle}>Authentication & Authorization: Implementing a robust authentication system to secure user accounts and handle authorization for booking access was crucial for the app's security.</li>
        <li style={listItemStyle}>Payment Gateway Integration: Integrating a reliable payment gateway to handle transactions smoothly and securely demanded thorough testing and adherence to industry standards.</li>
        <li style={listItemStyle}>Performance Optimization: As the app's database grew, we encountered performance issues. We had to optimize queries, implement caching strategies, and fine-tune the server to enhance overall performance.</li>
        <li style={listItemStyle}>Error Handling: Ensuring graceful error handling and providing meaningful feedback to users when something went wrong was essential for a positive user experience.</li>
        <li style={listItemStyle}>Responsive Design: Designing a responsive user interface that works seamlessly across various devices and screen sizes required careful planning and testing.</li>
        <li style={listItemStyle}>Deployment & Scalability: Deploying the app to a production environment and ensuring its scalability to handle increasing user demands were challenging but critical steps.</li>
      </ul>

      <p>
        Despite these challenges, our dedicated team of developers worked tirelessly to overcome them and create a web-app that we are proud to present to you today. We are committed to continuously improving GoYOLO, adding new features, and enhancing the user experience.
      </p>

      <p>
        Thank you for choosing GoYOLO. We look forward to serving you and making your hotel room booking experience exceptional. If you have any questions, suggestions, or feedback, please don't hesitate to reach out to our support team.
      </p>

      <p>
        Happy booking!
      </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
