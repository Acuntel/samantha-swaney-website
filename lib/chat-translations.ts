export type ChatLocale = "en" | "es" | "pl" | "auto";

export const CHAT_LOCALES: { code: ChatLocale; label: string; flag: string }[] =
  [
    { code: "auto", label: "Auto", flag: "🌐" },
    { code: "en", label: "EN", flag: "🇺🇸" },
    { code: "es", label: "ES", flag: "🇪🇸" },
    { code: "pl", label: "PL", flag: "🇵🇱" },
  ];

export const LANGUAGE_INSTRUCTION: Record<ChatLocale, string> = {
  auto: "Detect the user's language from their first message and respond in that same language for the rest of the conversation. Support any language (English, Spanish, Polish, Mandarin, Hindi, Tagalog, Korean, Russian, Ukrainian, Arabic, anything). If unsure, default to English.",
  en: "Respond in English regardless of the language the user writes in.",
  es: "Responde siempre en español, incluso si el usuario escribe en otro idioma.",
  pl: "Odpowiadaj zawsze po polsku, nawet jeśli użytkownik pisze w innym języku.",
};

type Strings = {
  headerTitle: string;
  headerSubtitle: string;
  leadIntro: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  intentPlaceholder: string;
  intentOptions: string[];
  start: string;
  preferToCall: (phone: string) => string;
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  greeting: (firstName: string, intent: string | null) => string;
  inputPlaceholder: string;
  send: string;
  proactiveBubble: string;
  dismiss: string;
  openChat: string;
  closeChat: string;
  languageLabel: string;
  error: string;
};

export const STR: Record<ChatLocale, Strings> = {
  auto: {
    headerTitle: "Chat with Samantha's team",
    headerSubtitle: "Typically replies in minutes",
    leadIntro: "A few quick details so Samantha can follow up:",
    namePlaceholder: "Your name *",
    emailPlaceholder: "Email *",
    phonePlaceholder: "Phone (optional)",
    intentPlaceholder: "I'm interested in...",
    intentOptions: ["Buying a home", "Selling a home", "Both", "Market info"],
    start: "Start Chat",
    preferToCall: (p) => `Prefer to talk? Call ${p}`,
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    greeting: (n, intent) =>
      `Hi ${n}, I'm Samantha Swaney's virtual assistant. ${
        intent ? `I see you're interested in ${intent.toLowerCase()}. ` : ""
      }How can I help today?`,
    inputPlaceholder: "Type a message...",
    send: "Send",
    proactiveBubble: "Questions about a property? Chat with us!",
    dismiss: "Dismiss",
    openChat: "Open chat",
    closeChat: "Close chat",
    languageLabel: "Language",
    error: "Something went wrong. Try again or call (630) 532-8747.",
  },
  en: {
    headerTitle: "Chat with Samantha's team",
    headerSubtitle: "Typically replies in minutes",
    leadIntro: "A few quick details so Samantha can follow up:",
    namePlaceholder: "Your name *",
    emailPlaceholder: "Email *",
    phonePlaceholder: "Phone (optional)",
    intentPlaceholder: "I'm interested in...",
    intentOptions: ["Buying a home", "Selling a home", "Both", "Market info"],
    start: "Start Chat",
    preferToCall: (p) => `Prefer to talk? Call ${p}`,
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    greeting: (n, intent) =>
      `Hi ${n}, I'm Samantha Swaney's virtual assistant. ${
        intent ? `I see you're interested in ${intent.toLowerCase()}. ` : ""
      }How can I help today?`,
    inputPlaceholder: "Type a message...",
    send: "Send",
    proactiveBubble: "Questions about a property? Chat with us!",
    dismiss: "Dismiss",
    openChat: "Open chat",
    closeChat: "Close chat",
    languageLabel: "Language",
    error: "Something went wrong. Try again or call (630) 532-8747.",
  },
  es: {
    headerTitle: "Chatea con el equipo de Samantha",
    headerSubtitle: "Suele responder en minutos",
    leadIntro: "Unos datos rápidos para que Samantha te contacte:",
    namePlaceholder: "Tu nombre *",
    emailPlaceholder: "Correo *",
    phonePlaceholder: "Teléfono (opcional)",
    intentPlaceholder: "Me interesa...",
    intentOptions: [
      "Comprar casa",
      "Vender casa",
      "Ambos",
      "Información del mercado",
    ],
    start: "Comenzar chat",
    preferToCall: (p) => `¿Prefieres llamar? ${p}`,
    nameRequired: "El nombre es obligatorio",
    emailRequired: "El correo es obligatorio",
    emailInvalid: "Ingresa un correo válido",
    greeting: (n, intent) =>
      `¡Hola ${n}! Soy el asistente virtual de Samantha Swaney. ${
        intent ? `Veo que te interesa ${intent.toLowerCase()}. ` : ""
      }¿En qué te puedo ayudar?`,
    inputPlaceholder: "Escribe un mensaje...",
    send: "Enviar",
    proactiveBubble: "¿Preguntas sobre una propiedad? ¡Chatea con nosotros!",
    dismiss: "Cerrar",
    openChat: "Abrir chat",
    closeChat: "Cerrar chat",
    languageLabel: "Idioma",
    error: "Algo salió mal. Intenta de nuevo o llama al (630) 532-8747.",
  },
  pl: {
    headerTitle: "Czat z zespołem Samanthy",
    headerSubtitle: "Zwykle odpowiada w kilka minut",
    leadIntro: "Kilka szybkich danych, aby Samantha mogła się odezwać:",
    namePlaceholder: "Imię *",
    emailPlaceholder: "Email *",
    phonePlaceholder: "Telefon (opcjonalnie)",
    intentPlaceholder: "Interesuje mnie...",
    intentOptions: [
      "Kupno domu",
      "Sprzedaż domu",
      "Obie opcje",
      "Informacje o rynku",
    ],
    start: "Rozpocznij czat",
    preferToCall: (p) => `Wolisz rozmawiać? Zadzwoń ${p}`,
    nameRequired: "Imię jest wymagane",
    emailRequired: "Email jest wymagany",
    emailInvalid: "Podaj poprawny email",
    greeting: (n, intent) =>
      `Cześć ${n}! Jestem wirtualnym asystentem Samanthy Swaney. ${
        intent ? `Widzę, że interesuje Cię ${intent.toLowerCase()}. ` : ""
      }Jak mogę pomóc?`,
    inputPlaceholder: "Wpisz wiadomość...",
    send: "Wyślij",
    proactiveBubble: "Masz pytania o nieruchomość? Czatuj z nami!",
    dismiss: "Zamknij",
    openChat: "Otwórz czat",
    closeChat: "Zamknij czat",
    languageLabel: "Język",
    error: "Coś poszło nie tak. Spróbuj ponownie lub zadzwoń (630) 532-8747.",
  },
};
