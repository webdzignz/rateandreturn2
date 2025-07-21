@@ .. @@
             {/* Desktop CTA Button */}
             <div className="hidden md:block">
-              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 transform">
+              <button 
+                onClick={() => scrollToSection('contact')}
+                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
+              >
                 Book Consultation
               </button>
             </div>
@@ .. @@
                 <div className="pt-2">
-                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
+                  <button 
+                    onClick={() => scrollToSection('contact')}
+                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
+                  >
                     Book Consultation
                   </button>
                 </div>
@@ .. @@
 function App() {
   const [isLoading, setIsLoading] = useState(true);
+  const [isSubmitting, setIsSubmitting] = useState(false);
+  const [submitMessage, setSubmitMessage] = useState('');
   const [formData, setFormData] = useState({
     fullName: '',
     email: '',
@@ .. @@
     }));
   };

-  const handleSubmit = (e: React.FormEvent) => {
+  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
-    console.log('Form submitted:', formData);
-    // Handle form submission here
+    setIsSubmitting(true);
+    setSubmitMessage('');
+
+    try {
+      const response = await fetch('/api/send-email', {
+        method: 'POST',
+        headers: {
+          'Content-Type': 'application/json',
+        },
+        body: JSON.stringify(formData),
+      });
+
+      if (response.ok) {
+        setSubmitMessage('Thank you! Your consultation request has been sent. We\'ll contact you within 24 hours.');
+        setFormData({
+          fullName: '',
+          email: '',
+          phoneNumber: '',
+          investmentAmount: '',
+          investmentTimeline: ''
+        });
+      } else {
+        throw new Error('Failed to send email');
+      }
+    } catch (error) {
+      console.error('Error submitting form:', error);
+      setSubmitMessage('Sorry, there was an error sending your request. Please try again or call us directly at 1800 BONDS (26637).');
+    } finally {
+      setIsSubmitting(false);
+    }
   };
@@ .. @@
             <div className="mt-8 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-800 delay-1000">
               <button
                 type="submit"
-                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 inline-flex items-center hover:shadow-2xl hover:scale-105 transform group"
+                disabled={isSubmitting}
+                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 inline-flex items-center hover:shadow-2xl hover:scale-105 transform group disabled:hover:scale-100 disabled:hover:shadow-none"
               >
-                Talk to an Expert Now
-                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
+                {isSubmitting ? (
+                  <>
+                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
+                    Sending...
+                  </>
+                ) : (
+                  <>
+                    Talk to an Expert Now
+                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
+                  </>
+                )}
               </button>
             </div>

+            {/* Success/Error Message */}
+            {submitMessage && (
+              <div className={`mt-6 p-4 rounded-lg text-center animate-in fade-in-50 slide-in-from-bottom-2 duration-500 ${
+                submitMessage.includes('Thank you') 
+                  ? 'bg-green-100 text-green-800 border border-green-200' 
+                  : 'bg-red-100 text-red-800 border border-red-200'
+              }`}>
+                <p className="font-medium">{submitMessage}</p>
+              </div>
+            )}
+
             <div className="mt-6 text-center animate-in fade-in-50 slide-in-from-bottom-2 duration-800 delay-1200">
               <a
-                href="#"
+                href="tel:1800266377"
                 className="text-white hover:text-blue-300 font-medium inline-flex items-center transition-all duration-300 hover:scale-105 transform group"
               >
                 <Phone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
-                Prefer to speak with someone? Schedule a Call →
+                Prefer to speak with someone? Call 1800 BONDS (26637) →
               </a>
             </div>
           </form>