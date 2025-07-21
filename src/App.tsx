@@ .. @@
             {/* Desktop CTA Button */}
             <div className="hidden md:block">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
              >
                 Book Consultation
               </button>
             </div>
@@ .. @@
                 <div className="pt-2">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                     Book Consultation
                   </button>
                 </div>
@@ .. @@
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState<'success' | 'error'>('success');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
@@ .. @@
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitMessageType('success');

   // Client-side validation
   if (!formData.fullName.trim()) {
     setSubmitMessage('Please enter your full name.');
     setSubmitMessageType('error');
     setIsSubmitting(false);
     return;
   }
   
   if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
     setSubmitMessage('Please enter a valid email address.');
     setSubmitMessageType('error');
     setIsSubmitting(false);
     return;
   }
   
   if (!formData.phoneNumber.trim()) {
     setSubmitMessage('Please enter your phone number.');
     setSubmitMessageType('error');
     setIsSubmitting(false);
     return;
   }
   
   if (!formData.investmentAmount) {
     setSubmitMessage('Please select your investment amount.');
     setSubmitMessageType('error');
     setIsSubmitting(false);
     return;
   }
   
   if (!formData.investmentTimeline) {
     setSubmitMessage('Please select your investment timeline.');
     setSubmitMessageType('error');
     setIsSubmitting(false);
     return;
   }

    try {
     // Simulate form processing
     await new Promise(resolve => setTimeout(resolve, 2000));
     
     // Log the form data to console (you can see this in browser dev tools)
     console.log('=== NEW CONSULTATION REQUEST ===');
     console.log('Full Name:', formData.fullName);
     console.log('Email:', formData.email);
     console.log('Phone:', formData.phoneNumber);
     console.log('Investment Amount:', formData.investmentAmount);
     console.log('Investment Timeline:', formData.investmentTimeline);
     console.log('Submitted at:', new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }));
     console.log('================================');
     
     // Show success message
     setSubmitMessage(`Thank you ${formData.fullName}! Your consultation request has been received. We'll contact you at ${formData.phoneNumber} or ${formData.email} within 24 hours to discuss your ${formData.investmentAmount} bond investment needs.`);
     setSubmitMessageType('success');
     
     // Clear the form
     setFormData({
       fullName: '',
       email: '',
       phoneNumber: '',
       investmentAmount: '',
       investmentTimeline: ''
     });
     
   } catch (error) {
     console.error('Error processing form:', error);
     setSubmitMessage('Sorry, there was an error processing your request. Please call us directly at 1800 BONDS (26637) to speak with an expert immediately.');
     setSubmitMessageType('error');
   } finally {
     setIsSubmitting(false);
   }
  };
@@ .. @@
            <div className="mt-8 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-1000">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 inline-flex items-center hover:shadow-2xl hover:scale-105 transform group disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Talk to an Expert Now
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>

            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`mt-6 p-4 rounded-lg text-center animate-in fade-in-50 slide-in-from-bottom-2 duration-500 ${
                submitMessageType === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                <p className="font-medium">{submitMessage}</p>
              </div>
            )}

            <div className="mt-6 text-center animate-in fade-in-50 slide-in-from-bottom-2 duration-800 delay-1200">
              <a
                href="tel:1800266377"
                className="text-white hover:text-blue-300 font-medium inline-flex items-center transition-all duration-300 hover:scale-105 transform group"
              >
                <Phone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Prefer to speak with someone? Call 1800 BONDS (26637) →
              </a>
            </div>
          </form>