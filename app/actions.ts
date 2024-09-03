"use server";

export const callRing = async (name: string) => {
    const response = await fetch('https://maker.ifttt.com/trigger/ring_pressed/json/with/key/5uEKdf7yEC2kwboMDNe4y', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            nombre: name
         }),
      });
  
      if(!response.ok) {
        return null
      }
      const contentType = response.headers.get('content-type');
      let data;
  
      if (contentType && contentType.includes('application/json')) {
        data = await response.json(); // Parsear como JSON
      } else {
        data = await response.text(); // Parsear como texto
      }

      return data;
}