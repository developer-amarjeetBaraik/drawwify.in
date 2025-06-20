import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const brandName = getComputedStyle(root).getPropertyValue('--brand-name')
  document.title = `Privacy ${brandName}`

  return (
    <div className='text-white bg-background'>
      <Navbar />
      <div className="max-w-7xl w-[650px] mt-8 mx-auto px-6 flex flex-col gap-5">
        <h1 className="text-4xl text-center font-bold border-b border-white/10 pb-4">Privacy Policy - <span className='bg-linear-135 from-secondaryLight to-secondary bg-clip-text text-transparent'>{brandName}</span></h1>
        <p>Effective Date: <strong>19 Jun 2025</strong></p>

        <p className=''>
          At <strong>{brandName}</strong>, we respect your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and store the data you share with us when you use our services.
        </p>

        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p>When you use {brandName}, we may collect the following information</p>
        <ul className="list-disc list-inside">
          <li><b>Name and Email Address</b>: Provided during sign-up or login.</li>
          <li><b>Password</b>: Stored securely using encryption.</li>
          <li><b>Drawings and Workspace Data</b>: Content you create using our canvas.</li>
          <li><b>Cookies</b>: To enhance your experience, track usage, and store session data.</li>
        </ul>

        <p className=''>We may also collect anonymous usage data to improve the platform</p>

        <h2 className="text-2xl font-semibold">Use of Third-Party Services</h2>
        <p className=''>
          We may integrate third-party tools (like analytics, authentication, or cloud storage) now or in the future. These tools may collect data in accordance with their own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>

        <p>We use your data to:</p>
        <ul className="list-disc list-inside">
          <li>Provide and personalize the {brandName} experience</li>
          <li>communicate with you about updates and support</li>
          <li>Analyze trends and improve the service</li>
        </ul>

        <p>We do <strong>not sell or rent</strong> your personal information to any third party.</p>

        <h2 className="text-2xl font-semibold">Data Retention & Limitations</h2>
        <p>
          While we aim to maintain your data securely, we do <strong>not guarantee permanent data storage or lifelong access to your content</strong>. We recommend downloading or backing up any important work.
        </p>

        <h2 className="text-2xl font-semibold">Your Rights</h2>
        <p>You have right to:</p>
        <ul className="list-disc list-inside">
          <li>Access and update your data</li>
          {/* <li>Delete your account</li> */}
          <li>Request your stored data</li>
        </ul>

        <p className="pt-2">
          For any privacy concerns or requests, email us at <strong>amarjeetofficial81@gmail.com</strong>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
