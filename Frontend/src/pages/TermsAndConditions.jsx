import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const TermsAndConditions = () => {
  const brandName = getComputedStyle(root).getPropertyValue('--brand-name')
  document.title = `Terms ${brandName}`

  return (
    <div className='text-white bg-background'>
      <Navbar />
      <div className="max-w-7xl w-[650px] mt-8 mx-auto px-6 flex flex-col gap-5">
        <h1 className="text-4xl text-center font-bold border-b border-white/10 pb-4">Terms & Conditions - <span className='bg-linear-135 from-secondaryLight to-secondary bg-clip-text text-transparent'>{brandName}</span></h1>
        <p>Effective Date: <strong>19 Jun 2025</strong></p>

        <p>Welcome to <strong>{brandName}</strong>. By accessing or using this web app, you agree to the following terms and conditions. If you do not agree, please do not use the service.</p>

        <h2 className="text-2xl font-semibold">Use of the Service</h2>
        <p>
          Drawwify is an interactive canvas platform for drawing and creating. You are responsible for the content you create and share on the platform.
        </p>

        <p>You agree to:</p>

        <ul className="list-disc list-inside">
          <li>Use the service legally and respectfully</li>
          <li>Not upload offensive or harmful content</li>
          <li>Not attempt to hack, overload, or misuse the platform</li>
        </ul>

        <h2 className="text-2xl font-semibold">Account & Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your login information. Please use a strong password and keep your credentials secure.
        </p>

        <p>
          We store passwords in encrypted from and do our best to protect your data - but we do not take legal responsibility for data breaches.
        </p>

        <h2 className="text-2xl font-semibold">Data & Content Ownership</h2>
        <p>
          You retain ownership of the drawings and content you create. By using {brandName}, you grant us permission to store and display your content to provide the service.
        </p>

        <p>
          We may store your data, but we do <strong>not guarantee lifetime access or permanent backup</strong>.
        </p>

        <h2 className="text-2xl font-semibold">Service Availability</h2>
        <p>
          {brandName} is a growing platform, and features may change or be discontinued at any time. We do not guarantee uninterrupted or lifetime service availability.
        </p>

        <h2 className="text-2xl font-semibold">Third-Party Services</h2>
        <p>
          We may use or integrate third-party tools (e.g., analytics, auth, storage). Use of such services is subject to their own terms and policies.
        </p>

        <h2 className="text-2xl font-semibold">Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at any time for violations of these terms or harmful behavior.
        </p>

        <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
        <p>
          We are not liable for:
        </p>

        <ul className="list-disc list-inside">
          <li>Loss of data</li>
          <li>Inaccurate results</li>
          <li>Damages resulting from using the app</li>
        </ul>

        <p>Use {brandName} at your own risk.</p>

        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="pt-2">
          For any questions or legal inquiries, please contact: <strong>amarjeetofficial81@gmail.com</strong>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
