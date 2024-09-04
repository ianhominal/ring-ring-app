export const callRing = async (name: string) => {
  const chatId = process.env.NEXT_PUBLIC_CHAT_ID;  // Lee el chat_id de las variables de entorno
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;  // Lee el token de bot de las variables de entorno
  const messageTemplate = process.env.NEXT_PUBLIC_NOTIFICATION_MESSAGE || '{name} está afuera, atende!';  // Lee el mensaje de las variables de entorno
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  // Reemplazar el marcador de posición {name} por el valor real de name
  const message = messageTemplate.replace('{name}', name);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `🔔 *${name}* está afuera, 🚪 atende!`,
      parse_mode: 'Markdown'
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();  // Asume que siempre será JSON
  return data;
}
