import { useState, useRef, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Mailer() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        autoResize();
    }, [message]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !name || !message) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, message }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsSent(true);
            } else {
                alert(`Failed to send message: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }

        setEmail("");
        setName("");
        setMessage("");
    };

    if (isSent) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-[#1a1a1a] border border-white/10 rounded-lg p-8 text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-teal-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">
                    Thanks for reaching out, {name}. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                    onClick={() => setIsSent(false)}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-colors"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full"
        >
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-200"
                >
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-200"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-200"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-200"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-200"
                >
                    Message
                </label>
                <textarea
                    ref={textareaRef}
                    id="message"
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full p-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-200 resize-none min-h-[120px] font-sans"
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 px-6 bg-teal-400 hover:bg-teal-300 text-black font-medium rounded-lg shadow-lg shadow-teal-500/20 transition-all duration-200 transform hover:scale-[1.02] mt-2"
            >
                Send Message
            </button>
        </form>
    );
}