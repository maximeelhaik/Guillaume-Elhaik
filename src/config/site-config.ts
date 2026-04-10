/**
 * CONFIGURATION DU SITE
 * Modifiez les valeurs dans l'objet RAW_DATA ci-dessous.
 * Les variables dérivées (liens, adresses complètes) sont calculées automatiquement.
 */

const RAW_DATA = {
  phone: "06 67 83 64 43",
  email: "contact@elhaik.fr",
  addressStreet: "16 rue Saint-Simon",
  addressCity: "78000 Versailles",
  ownerName: "Guillaume El Haik",
  ownerTitle: "Maître Guillaume El Haik",
  barreau: "Barreau de Versailles",
  orderAddress: "Palais de Justice, Place André Mignot, 78000 Versailles",
  social: {
    linkedin: "https://www.linkedin.com/in/guillaume-el-haik-5807951a5/",
    twitter: "#",
    instagram: "#",
  },
  seo: {
    title: "Maître Guillaume El Haik | Avocat à Versailles",
    description: "Cabinet de Maître Guillaume El Haik, avocat au Barreau de Versailles. Conseil et défense devant les juridictions administratives.",
    keywords: "avocat Versailles, droit public, tribunal administratif, recours, OQTF, naturalisation, Maître Guillaume El Haik, Barreau de Versailles",
    ogImage: "/og-image.webp", // À ajouter dans public/
  }
};

/**
 * EXPORT DE LA CONFIGURATION
 * Ne pas modifier cette partie, elle sert à formater les données pour le site.
 */
export const SITE_CONFIG = {
  // Coordonnées
  CONTACT_PHONE: RAW_DATA.phone,
  get CONTACT_PHONE_LINK() {
    return `tel:${RAW_DATA.phone.replace(/\s/g, '').replace(/[()]/g, '')}`;
  },
  CONTACT_EMAIL: RAW_DATA.email,

  // Adresse
  ADDRESS_STREET: RAW_DATA.addressStreet,
  ADDRESS_CITY: RAW_DATA.addressCity,
  get ADDRESS_FULL() {
    return `${RAW_DATA.addressStreet}, ${RAW_DATA.addressCity}`;
  },

  // Réseaux Sociaux
  SOCIAL: {
    LINKEDIN: RAW_DATA.social.linkedin,
    TWITTER: RAW_DATA.social.twitter,
    INSTAGRAM: RAW_DATA.social.instagram,
  },

  // Informations Juridiques / Cabinet
  OWNER_NAME: RAW_DATA.ownerName,
  OWNER_TITLE: RAW_DATA.ownerTitle,
  CABINET_NAME: `Cabinet ${RAW_DATA.ownerName}`,
  CABINET_BARREAU: RAW_DATA.barreau,
  ORDER_ADDRESS: RAW_DATA.orderAddress,

  // SEO
  SEO: {
    TITLE: RAW_DATA.seo.title,
    DESCRIPTION: RAW_DATA.seo.description,
    KEYWORDS: RAW_DATA.seo.keywords,
    OG_IMAGE: RAW_DATA.seo.ogImage,
  }
};
