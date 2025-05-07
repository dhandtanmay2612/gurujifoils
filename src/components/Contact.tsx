import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Globe, User, Send, Download, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from 'sonner';

// Helper to determine the correct API URL based on environment
const getApiUrl = () => {
  // In development, use the API server port (3000)
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/api/contact';
  }
  // In production, use the relative path
  return '/api/contact';
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading toast
    const loadingToast = toast.loading('Sending your message...', {
      icon: <Loader2 className="animate-spin h-5 w-5" />,
      duration: 10000 // 10 seconds timeout
    });
    
    setIsSubmitting(true);
    
    try {
      const apiUrl = getApiUrl();
      console.log('Attempting to send request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        toast.error(
          <div className="flex flex-col">
            <span className="font-semibold text-base">Message Not Sent</span>
            <span className="text-sm mt-1">{data.error || "Something went wrong. Please try again."}</span>
          </div>,
          {
            icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            duration: 5000
          }
        );
        return;
      }

      // Success toast
      toast.success(
        <div className="flex flex-col">
          <span className="font-semibold text-base">Message Sent Successfully!</span>
          <span className="text-sm mt-1">Thank you for contacting Guruji Foils. We'll get back to you soon.</span>
          {data.customerEmail && (
            <span className="text-xs mt-2">A confirmation email has been sent to {data.customerEmail}</span>
          )}
        </div>,
        {
          icon: <Check className="h-5 w-5 text-green-500" />,
          duration: 6000
        }
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: ''
      });
    } catch (error) {
      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      
      toast.error(
        <div className="flex flex-col">
          <span className="font-semibold text-base">Connection Error</span>
          <span className="text-sm mt-1">Network error. Please check your connection and try again.</span>
        </div>,
        {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          duration: 5000
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadBrochure = () => {
    // Replace '/brochure.pdf' with the actual path to your brochure file
    const link = document.createElement('a');
    link.href = '/brochure.pdf';
    link.download = 'guruji_foils_brochure.pdf'; // Optional: Set a specific filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Brochure download started!");
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title pb-4">Contact Us</h2>

        <div
          ref={ref}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-purple rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold font-heading text-guruji-deep-blue mb-6">Get In Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-guruji-purple shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-gray-600">
                      Choudhary Mohalla, Village DhulSiras, Near Bus Stand, Gurugram, Haryana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-guruji-purple shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+919999551918" className="hover:underline">+91-9999-55-1918</a>
                      <br />
                      <a href="tel:+918477834579" className="hover:underline">+91-8477-83-4579</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-guruji-purple shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:gurujifoils@gmail.com" className="hover:underline">gurujifoils@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-guruji-purple shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">Website</h4>
                    <p className="text-gray-600">
                      <a href="https://www.gurujifoils.com" className="hover:underline" target="_blank" rel="noopener noreferrer">www.Gurujifoils.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="w-6 h-6 text-guruji-purple shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">Sales Executive</h4>
                    <p className="text-gray-600">Mr.Jatin</p>
                  </div>
                </div>
              </div>

              {/* Download Brochure */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <Button
                  onClick={handleDownloadBrochure}
                  className="flex items-center gap-2 bg-guruji-gold hover:bg-guruji-deep-blue transition-colors text-white"
                >
                  <Download className="w-4 h-4" />
                  Download Digital Brochure
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold font-heading text-guruji-deep-blue mb-6">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-black">Name *</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="text-black"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">Email *</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="text-black"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-black">Phone Number *</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91-XXXXXXXXXX"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    className="text-black"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium mb-2 text-black">Inquiry Type *</label>
                  <Select onValueChange={handleSelectChange} value={formData.inquiryType} disabled={isSubmitting}>
                    <SelectTrigger className="text-black">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="quote">Request a Quote</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-black">Message *</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="text-black"
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="flex items-center gap-2 w-full bg-guruji-purple hover:bg-guruji-deep-blue transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Optional Google Map */}
          <div className="mt-12">
            <div className="rounded-lg overflow-hidden shadow-lg h-80 bg-gray-200">
              {/* Replace the src with your actual Google Maps Embed URL */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.47787418279!2d77.0618742753283!3d28.672588782408886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d023b55c7b3b1%3A0x8a6a5e8a7e9b7b7f!2sDhulsiras%2C%20Delhi!5e0!3m2!1sen!2sin!4v1703780758979!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;