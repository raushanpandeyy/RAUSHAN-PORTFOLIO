import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import GlassCard from "../../components/common/GlassCard";
import MagneticButton from "../../components/common/MagneticButton";
import SectionShell from "../../components/common/SectionShell";
import emailjsConfig from "../../data/emailjs";

const icons = {
  Mobile: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  ),
  WhatsApp: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  ),
  Email: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  ),
  GitHub: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
    </svg>
  ),
  Instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
};

const links = [
  ["Mobile", "tel:+919984185916", "+91 9984185916"],
  ["WhatsApp", "https://wa.me/919984185916", "Chat on WhatsApp"],
  ["Email", "mailto:raushanpandey894@gmail.com", "raushanpandey894@gmail.com"],
  ["GitHub", "https://github.com/raushanpandeyy", "github.com/raushanpandeyy"],
  ["Instagram", "https://instagram.com/raushanpandeyyy", "@raushanpandeyyy"],
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const valid = form.name.length > 1 && /\S+@\S+\.\S+/.test(form.email) && form.message.length > 8;

  const submit = async (event) => {
    event.preventDefault();
    if (!valid) return;
    setStatus("sending");
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        emailjsConfig.publicKey,
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <SectionShell eyebrow="Contact" title="Open a signal channel." copy="Reach me by phone, WhatsApp, email, GitHub, or Instagram.">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          {links.map(([label, href, value], index) => (
            <GlassCard key={label} className="p-5" delay={index * 0.08}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-coral">{icons[label]}</span>
                <motion.p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300" whileHover={{ x: 5 }}>{label}</motion.p>
              </div>
              <motion.a className="mt-2 block break-words text-lg font-bold text-black hover:text-cyan-300" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" whileHover={{ x: 4 }}>
                {value}
              </motion.a>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-6">
          <form onSubmit={submit} className="grid gap-4">
            {[
              ["name", "Name", "text"],
              ["email", "Email", "email"],
            ].map(([key, label, type]) => (
              <label key={key} className="grid gap-2 text-sm font-bold text-black">
                {label}
                <input
                  type={type}
                  value={form[key]}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                  className="rounded-md border border-cyan-200 bg-white/95 px-4 py-3 font-bold text-ink outline-none transition focus:border-coral focus:shadow-coral"
                />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-bold text-black">
              Message
              <textarea
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                rows={5}
                className="resize-none rounded-md border border-cyan-200 bg-white/95 px-4 py-3 font-bold text-ink outline-none transition focus:border-coral focus:shadow-coral"
              />
            </label>
            <MagneticButton className="rounded-md bg-coral px-5 py-3 font-bold text-ink disabled:cursor-not-allowed disabled:opacity-45" disabled={!valid || status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </MagneticButton>
            {status === "sent" && (
              <motion.p className="rounded-md border border-plasma/40 bg-cyan-100 px-4 py-3 text-sm text-ink" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                Transmission received. I will reply soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold text-red-600" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                Failed to send. Check your EmailJS config in src/data/emailjs.js
              </motion.p>
            )}
          </form>
        </GlassCard>
      </div>
    </SectionShell>
  );
}
