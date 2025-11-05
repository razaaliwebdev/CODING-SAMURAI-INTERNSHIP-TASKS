import React, { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // Make it async
    e.preventDefault();
    setLoading(true);
    try {
      if (!name || !email || !subject || !message) {
        return toast.error("Please fill all the fields");
      }

      const templateParams = {
        from_name: name, // Template parameter names often differ from state names
        user_email: email,
        subject: subject,
        message: message,
      };

      // FIX: Use .send() and pass the parameters object
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams, // Pass the parameters object
        import.meta.env.VITE_PUBLIC_KEY
      );

      toast.success("Email sent successfully");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send Email");
      console.log("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="md:py-12 py-8">
      <div className="border border-secondary p-4 rounded">
        <h3 className="text-center my-2 text-text md:text-3xl text-2xl">
          Let's Build Something Great
        </h3>
        <p className="text-center text-muted py-2">
          Have a project in your mind or just want to say hello? My Inbox is
          always open. <br /> I'll get back to you as soon as possible.
        </p>

        <div className="md:w-3xl mx-auto my-2">
          <form onSubmit={handleSubmit} className=" w-full">
            <div className="flex gap-4 w-full">
              <div className="field w-1/2">
                <label
                  htmlFor="name"
                  className="text-text text-sm md:text-md block mb-1"
                >
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-primary w-full rounded p-2 md:text-md text-sm text-text placeholder:text-muted focus:ring-1 ring-primary"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                />
              </div>
              <div className="field w-1/2">
                <label
                  htmlFor="email"
                  className="text-text text-sm md:text-md block mb-1"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-primary w-full rounded p-2 md:text-md text-sm text-text placeholder:text-muted focus:ring-1 ring-primary"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="field w-full mt-2">
              <label
                htmlFor="subject"
                className="text-text text-sm md:text-md block mb-1"
              >
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border border-primary w-full rounded p-2 md:text-md text-sm text-text placeholder:text-muted focus:ring-1 ring-primary"
                type="text"
                id="subject"
                name="subject"
                placeholder="Email Subject"
              />
            </div>
            <div className="w-full my-4">
              <div className="field">
                <label
                  htmlFor="message"
                  className=" text-text block text-sm md:text-md my-2"
                >
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name=""
                  id=""
                  placeholder="tell me about your project..."
                  className="border border-primary w-full rounded p-2 md:text-md text-sm text-text placeholder:text-muted focus:ring-1 ring-primary h-40"
                ></textarea>
              </div>
              <div className="">
                <button
                  className="px-6 py-2 text-sm md:text-md rounded-full text-text bg-primary hover:bg-secondary hover:border border-primary border cursor-pointer my-4"
                  type="submit"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
