"use server";

export const callRing = async (name: string) => {
  const chatId = process.env.NEXT_PUBLIC_CHAT_ID;  // Lee el chat_id de las variables de entorno
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;  // Lee el token de bot de las variables de entorno
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `Alguien ha tocado el timbre: ${name}`,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();  // Asume que siempre será JSON
  return data;
}
