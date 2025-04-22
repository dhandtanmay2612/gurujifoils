import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Globe, User, Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  });
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
    try {
      // Replace '/api/contact' with your actual API endpoint for form submission
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you for your message! We'll get back to you soon.");
        setFormData({
          name: '',
          email: '',
          inquiryType: '',
          message: ''
        });
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Oops! Something went wrong. Please try again.");
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
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">Inquiry Type</label>
                  <Select onValueChange={handleSelectChange} value={formData.inquiryType}>
                    <SelectTrigger>
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
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="flex items-center gap-2 w-full bg-guruji-purple hover:bg-guruji-deep-blue transition-colors">
                  <Send className="w-4 h-4" />
                  Send Message
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