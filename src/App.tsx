@@ .. @@
             </div>
           </div>

           {/* Mobile menu button */}
           <div className="md:hidden">
@@ .. @@
                  Contact Us
                </button>
              </div>
            </div>
         )}
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
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed drop-shadow-lg animate-in fade-in-50 slide-in-from-bottom-2 duration-1000 delay-600 mb-12">
                Connect with regulated partners for high-yield, fixed-term products. 
                Professional guidance for all Australian investors.
              </p>
            </div>
          </div>
        </div>
@@ .. @@
            </div>

            <div className="mt-8 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-1000">
              <p className="text-white text-lg">
                Contact form will be added here
              </p>
            </div>

            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`mt-6 p-4 rounded-lg animate-in fade-in-50 slide-in-from-bottom-2 duration-500 ${
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