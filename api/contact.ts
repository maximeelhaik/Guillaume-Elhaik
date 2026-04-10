import { Resend } from 'resend';
// Types Vercel (peuvent être importés si installés, sinon on peut utiliser des types génériques)
type VercelRequest = any;
type VercelResponse = any;


// On initialise Resend avec la clé API (stockée dans les variables d'environnement)
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // On n'autorise que la méthode POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, domain, message } = request.body;

    // Validation basique côté serveur
    if (!firstName || !lastName || !email || !message) {
      return response.status(400).json({ error: 'Champs manquants' });
    }

    // Envoi de l'e-mail via Resend
    // Remarque : Si vous n'avez pas encore validé un domaine sur Resend, 
    // l'expéditeur doit être 'onboarding@resend.dev' et le destinataire votre mail vérifié.
    const { data, error } = await resend.emails.send({
      from: 'Cabinet Elhaik <onboarding@resend.dev>',
      to: [process.env.CONTACT_RECIPIENT_EMAIL || 'g.elhaik.avocat@gmail.com'],
      subject: `Nouveau message de ${firstName} ${lastName} - ${domain}`,
      html: `
        <h2>Nouveau message depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Domaine :</strong> ${domain}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return response.status(400).json({ error: error.message });
    }

    return response.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Erreur serveur:', err);
    return response.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
  }
}
