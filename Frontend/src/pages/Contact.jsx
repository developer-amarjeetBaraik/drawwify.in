
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    document.title = 'Contact'
    
    const [animated, setAnimated] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success("Message sent successfully! I'll get back to you soon.");
            setFormState({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('contact');
            if (!element) return;

            const position = element.getBoundingClientRect();
            const isVisible = position.top < window.innerHeight - 200;

            if (isVisible) {
                setAnimated(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on initial load

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const contactMethods = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email',
            value: 'amarjeetofficial81@gamil.com',
            link: 'mailto:amarjeetofficial81@gamil.com'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Phone',
            value: '+91 7295909081',
            link: 'tel:+917295909081'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Location',
            value: 'Ranchi Jharkhand, India',
            link: 'https://www.google.com/maps/place/Ranchi,+Jharkhand/@23.344386,85.3252262,34451m/data=!3m1!1e3!4m6!3m5!1s0x39f4e104aa5db7dd:0xdc09d49d6899f43e!8m2!3d23.3440997!4d85.309562!16zL20vMDF0dHQ2'
        },
    ];

    const socialLinks = [
        {
            name: 'github',
            link: 'https://github.com/developer-amarjeetBaraik/',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>,
        },
        {
            name: 'linkedin',
            link: 'https://linkedin.com/in/amarjeet-chik-baraik',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>,
        },
        {
            name: 'instagram',
            link: 'https://www.instagram.com/amarjeet_baraik_/',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.76 5.76 0 0122 7.75v8.5A5.76 5.76 0 0116.25 22h-8.5A5.76 5.76 0 012 16.25v-8.5A5.76 5.76 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zm10.5 2.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </svg>,
        },
        {
            name: 'x.com',
            link: 'https://x.com/Amarjeet_c_b',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: 'normal' }}><g transform="scale(8,8)"><path d="M4.01758,4l9.07422,13.60938l-8.75586,10.39063h2.61523l7.29492,-8.65625l5.77148,8.65625h0.53516h7.46289l-9.30273,-13.95703l8.46289,-10.04297h-2.61523l-7.00195,8.31055l-5.54102,-8.31055zM7.75586,6h3.19141l13.33203,20h-3.19141z"></path></g></g>
            </svg>,
        },
    ]

    return (
        <>
            <Navbar />
            <section id="contact" className="pt-10">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
                        <p className="section-subheading">
                            I'm always open to new opportunities and collaborations
                        </p>
                    </div>

                    <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-start">
                        <div
                            className={`space-y-8 transform transition-all duration-700 ${animated ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                                }`}
                        >
                            {/* contact address */}
                            <div className="p-8 mb-10 bg-glass border border-glassBorder rounded-xl ">
                                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                                <div className="space-y-6">
                                    {contactMethods.map((method, index) => (
                                        <a
                                            key={index}
                                            href={method.link}
                                            target='_blank'
                                            className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-navy-dark/50 flex items-center justify-center text-navy-glow group-hover:text-white transition-colors">
                                                {method.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">{method.title}</p>
                                                <p className="font-medium">{method.value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            {/* social links */}
                            <div className="p-8 bg-glass border border-glassBorder rounded-xl ">
                                <h3 className="text-2xl font-bold mb-6">Social Media</h3>

                                <div className="flex gap-4">
                                    {
                                        socialLinks.map(item => (
                                            <a key={item.name} href={item.link} target='_blank' className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                                                {item.icon}
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* contact form */}
                        <div
                            className={`bg-glass border border-glassBorder rounded-xl p-8 transform transition-all duration-700 ${animated ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                                }`}
                        >
                            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* form text input */}
                                <div>
                                    <label htmlFor="name" className="block text-gray-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-navy-glow focus:ring-1 focus:ring-navy-glow transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                {/* form email input */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-navy-glow focus:ring-1 focus:ring-navy-glow transition-colors"
                                        placeholder="Your email"
                                    />
                                </div>
                                {/* form message field */}
                                <div>
                                    <label htmlFor="message" className="block text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-navy-glow focus:ring-1 focus:ring-navy-glow transition-colors resize-none"
                                        placeholder="Your message"
                                    />
                                </div>
                                {/* form submit button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-5 py-3 bg-linear-135 from-secondaryLight to-secondary text-white font-medium rounded-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed glow"
                                >
                                    {isSubmitting ? (
                                        <span className="inline-flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <Toaster richColors />
        </>
    );
};

export default Contact;