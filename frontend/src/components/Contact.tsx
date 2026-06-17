import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertOctagon, Terminal, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Name field is required.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) {
      tempErrors.message = 'Message contents cannot be blank.';
    } else if (formData.message.length < 10) {
      tempErrors.message = 'Please provide a message with at least 10 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-neutral-950 light:bg-slate-50 border-t border-white/5 light:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400 light:text-teal-600">
            Get In Touch
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-white light:text-neutral-900 mt-2">
            Let&apos;s Launch Something Great
          </h2>
          <p className="mt-4 text-sm text-neutral-400 light:text-neutral-600 leading-relaxed">
            Ready to integrate a secure REST API service, build a 3-tier AWS architecture, or ask for consultation? Drop a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Board */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 rounded-2xl bg-neutral-900/40 light:bg-white border border-white/5 light:border-slate-200">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-teal-400" />
                <span className="font-mono text-xs font-extrabold uppercase text-white light:text-neutral-900 tracking-wider">Mithun Channels</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-white light:text-neutral-900">Direct Email</h4>
                    <a href="mailto:mithunhp1212@gmail.com" className="text-xs md:text-sm text-neutral-400 light:text-neutral-600 hover:text-teal-400 transition-colors">
                      mithunhp1212@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-white light:text-neutral-900">Direct Line</h4>
                    <span className="text-xs md:text-sm text-neutral-400 light:text-neutral-600">
                      +91 98457xxxxx (Available on request)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-white light:text-neutral-900">Current Base</h4>
                    <span className="text-xs md:text-sm text-neutral-400 light:text-neutral-600">
                      Bangalore, Karnataka, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
              <p className="text-[11px] font-mono text-neutral-500 leading-normal">
                🔐 Encryption Guard ACTIVE: Inquiries stored in local JSON session tables safely.
              </p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-8 p-8 rounded-2xl bg-neutral-900/20 light:bg-white border border-white/5 light:border-slate-200">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-sans font-bold text-2xl text-white light:text-neutral-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-neutral-400 light:text-neutral-600 max-w-sm leading-relaxed mb-6">
                  Thank you for reaching out, Mithun. Your message has been safely saved in the Admin Inbox database. I will get back to you immediately!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-teal-400 text-white transition-colors cursor-pointer"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-neutral-400 light:text-neutral-600 uppercase tracking-widest mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Mithun Client"
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-950 light:bg-slate-50 border text-white light:text-neutral-900 text-sm focus:outline-none focus:border-teal-400 duration-150 ${
                        errors.name ? 'border-rose-500' : 'border-white/5 light:border-slate-200'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-rose-500 mt-1.5 font-mono">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-neutral-400 light:text-neutral-600 uppercase tracking-widest mb-2 font-medium">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="client@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-950 light:bg-slate-50 border text-white light:text-neutral-900 text-sm focus:outline-none focus:border-teal-400 duration-150 ${
                        errors.email ? 'border-rose-500' : 'border-white/5 light:border-slate-200'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1.5 font-mono">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-neutral-400 light:text-neutral-600 uppercase tracking-widest mb-2 font-medium">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Core Java backend & AWS Architecture"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 light:bg-slate-50 border text-white light:text-neutral-900 text-sm focus:outline-none focus:border-teal-400 duration-150 ${
                      errors.subject ? 'border-rose-500' : 'border-white/5 light:border-slate-200'
                    }`}
                  />
                  {errors.subject && <p className="text-xs text-rose-500 mt-1.5 font-mono">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-neutral-400 light:text-neutral-600 uppercase tracking-widest mb-2 font-medium">
                    Detailed Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your goals, tech expectations, or timeline integrations..."
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 light:bg-slate-50 border text-white light:text-neutral-900 text-sm focus:outline-none focus:border-teal-400 duration-150 ${
                      errors.message ? 'border-rose-500' : 'border-white/5 light:border-slate-200'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-rose-500 mt-1.5 font-mono">{errors.message}</p>}
                </div>

                {/* Submitting Status feedback alerts */}
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5 font-mono animate-fade-in">
                    <AlertOctagon className="w-5 h-5 shrink-0" />
                    <span>Failed to transmit inquiry packet. Please check server console or try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-sans font-bold text-sm bg-gradient-to-r from-teal-500 to-indigo-600 text-[#0B0F19] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Transmitting Inquiries...' : 'Send Inquiry Packet'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
