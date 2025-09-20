import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Ambil API Key dari environment
  useEffect(() => {
    setApiKey(import.meta.env.VITE_GEMINI_API_KEY);
  }, []);

  // Fungsi untuk membersihkan respons dari tanda ** dan bullet
  const formatResponse = (text) => {
    if (!text) return "";

    // Hapus semua **...** dan jadikan normal
    let cleaned = text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Hapus bold: **Real Madrid** → Real Madrid
      .replace(/\*/g, "") // Hapus sisa *
      .replace(/^\s+|\s+$/g, "") // Trim whitespace
      .replace(/\s+/g, " "); // Spasi ganda → satu spasi

    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !apiKey) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Format riwayat percakapan untuk Gemini
      const geminiChatHistory = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const chat = model.startChat({
        history: geminiChatHistory,
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
        },
      });

      // ✅ FIX: Kirim sebagai STRING, bukan array
      const result = await chat.sendMessageStream(input); // <-- Hanya string!

      let responseText = "";
      for await (const chunk of result.stream) {
        const text = chunk.text();
        responseText += text;

        // Format sebelum ditampilkan
        const formattedResponse = formatResponse(responseText);

        // Update real-time
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last.role === "assistant") {
            const updated = prev.slice(0, -1);
            return [
              ...updated,
              { role: "assistant", content: formattedResponse },
            ];
          }
          return [...prev, { role: "assistant", content: formattedResponse }];
        });
      }

      if (!responseText.trim()) {
        throw new Error("Empty response");
      }
    } catch (err) {
      console.error("AI Error:", err);
      const errorMsg = {
        role: "assistant",
        content: "Maaf, terjadi kesalahan saat menghubungi AI.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChatbot = () => setIsOpen(!isOpen);
  const closeChatbot = () => setIsOpen(false);

  // Tombol cloud saat diminimize
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleChatbot}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Buka chatbot"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border border-blue-200 rounded-xl shadow-xl p-4 z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
          <h3 className="font-bold text-blue-700">Asisten Wira Store</h3>
        </div>
        <button
          onClick={closeChatbot}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Area Pesan */}
      <div className="h-60 overflow-y-auto text-sm mb-3 bg-blue-50 rounded-lg p-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-300 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <p>Halo! Saya asisten Wira Store. Ada yang bisa saya bantu?</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 ${
                m.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-3 rounded-2xl max-w-xs lg:max-w-md ${
                  m.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-blue-100 rounded-bl-none shadow-sm"
                }`}
              >
                {m.content}
              </span>
            </div>
          ))
        )}
        {loading && (
          <div className="text-left">
            <span className="inline-block p-3 rounded-2xl bg-white text-gray-800 border border-blue-100 rounded-bl-none shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-150"></div>
              </div>
            </span>
          </div>
        )}
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya sesuatu..."
          className="flex-1 border border-blue-200 p-2 text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-lg transition duration-200 disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
