import { Resend } from 'resend';
import { SITE_CONFIG } from '../src/config/site-config';
// Types Vercel (peuvent être importés si installés, sinon on peut utiliser des types génériques)
type VercelRequest = any;
type VercelResponse = any;


// On initialise Resend avec la clé API
if (!process.env.RESEND_API_KEY) {
  console.error("ERREUR: RESEND_API_KEY est manquante dans les variables d'environnement.");
}
const resend = new Resend(process.env.RESEND_API_KEY || 'no-key');

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
    // Remarque : Tant que vous n'avez pas validé de domaine sur Resend, 
    // l'expéditeur doit être 'onboarding@resend.dev' et le destinataire votre mail de compte vérifié.
    // Configuration des destinataires et expéditeur
    const notificationRecipient = process.env.CONTACT_RECIPIENT_EMAIL || 'maxime.elhaik@gmail.com';
    const senderEmail = process.env.CONTACT_FROM_EMAIL || 'contact@elhaik.fr';

    // Style commun inspiré des fiches du site
    // Couleurs : Acajou (#3D060C), Lin (#CDBDA3), Porcelaine (#F5F6F1)
    const emailStyles = `
      background-color: #F5F6F1;
      font-family: 'Georgia', serif;
      color: #3D060C;
      margin: 0;
      padding: 40px 20px;
    `;

    const cardStyles = `
      background-color: rgba(61, 6, 12, 0.05);
      border-left: 2px solid #CDBDA3;
      padding: 30px;
      max-width: 600px;
      margin: 0 auto;
      border-radius: 2px;
    `;

    const titleStyles = `
      font-style: italic;
      font-size: 24px;
      border-bottom: 1px solid rgba(61, 6, 12, 0.1);
      padding-bottom: 12px;
      margin-bottom: 20px;
      font-weight: normal;
    `;

    const contentStyles = `
      font-family: 'Helvetica', 'Arial', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #3D060C;
    `;

    const labelStyles = `
      font-weight: bold;
      color: #3D060C;
      display: inline-block;
      width: 100px;
    `;

    // 1. Email de Notification (pour Guillaume Elhaik)
    const notificationEmail = {
      from: `${SITE_CONFIG.CABINET_NAME} <${senderEmail}>`,
      to: [notificationRecipient],
      subject: `Notification : Nouvelle demande — ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <div style="${emailStyles}">
          <div style="${cardStyles}">
            <h1 style="${titleStyles}">Nouvelle demande reçue</h1>
            <div style="${contentStyles}">
              <p><span style="${labelStyles}">Nom :</span> ${firstName} ${lastName}</p>
              <p><span style="${labelStyles}">Email :</span> ${email}</p>
              <p><span style="${labelStyles}">Domaine :</span> ${domain}</p>
              <div style="margin-top: 20px; border-top: 1px solid rgba(61, 6, 12, 0.05); pt-4">
                <p style="font-weight: bold; margin-bottom: 8px;">Message :</p>
                <p style="white-space: pre-wrap; font-style: italic;">"${message}"</p>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // 2. Email d'Accusé de Réception (pour l'utilisateur)
    const acknowledgmentEmail = {
      from: `${SITE_CONFIG.CABINET_NAME} <${senderEmail}>`,
      to: [email],
      subject: `Accusé de réception — Votre demande concernant : ${domain}`,
      html: `
        <div style="${emailStyles}">
          <div style="${cardStyles}">
            <h1 style="${titleStyles}">Accusé de réception</h1>
            <div style="${contentStyles}">
              <p>Cher/Chère ${firstName},</p>
              <p>Nous avons bien reçu votre demande concernant le domaine suivant : <strong>${domain}</strong>.</p>
              <p>Le Cabinet a été informé de votre message et reviendra vers vous dans les plus brefs délais pour une étude attentive de votre dossier.</p>
              <p>Nous vous remercions de la confiance que vous témoignez au Cabinet.</p>
              <p style="margin-top: 30px;">
                Cordialement,<br />
                <strong style="color: #3D060C;">${SITE_CONFIG.CABINET_NAME}</strong>
              </p>
            </div>
          </div>
          <p style="text-align: center; font-size: 10px; color: rgba(61, 6, 12, 0.4); margin-top: 20px; text-transform: uppercase; letter-spacing: 0.2em;">
            © ${new Date().getFullYear()} ${SITE_CONFIG.CABINET_NAME}. Tous droits réservés.
          </p>
        </div>
      `,
    };

    // Envoi simultané des deux emails
    console.log(`Envoi des emails : Notification à ${notificationRecipient} et Accusé à ${email}`);

    const results = await Promise.all([
      resend.emails.send(notificationEmail),
      resend.emails.send(acknowledgmentEmail)
    ]);

    const errors = results.filter(res => res.error);

    if (errors.length > 0) {
      console.error('Erreurs lors de l\'envoi des emails:', errors);
      // On retourne une erreur si au moins un envoi a échoué
      return response.status(400).json({
        error: 'Une erreur est survenue lors de l\'envoi des messages.',
        details: errors.map(e => e.error?.message)
      });
    }

    return response.status(200).json({ success: true });
  } catch (err) {
    console.error('Erreur serveur:', err);
    return response.status(500).json({ error: 'Erreur technique lors de l\'envoi' });
  }
}
