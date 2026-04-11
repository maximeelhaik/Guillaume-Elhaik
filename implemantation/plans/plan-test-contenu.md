# Plan d'Implémentation : Audit Métier & Conversion

Ce document détaille les étapes techniques pour appliquer les recommandations du fichier `test-contenu.md`. **Aucune modification n'a été apportée au code source.**

## Phase 1 : Audit de Confiance (Design & UX)

*   **Homogénéité des logos clients/partenaires :**
    *   **Fichiers concernés :** Composant contenant les logos (ex: `src/components/Partners.tsx` ou `Hero.tsx`).
    *   **Action :** Appliquer des classes utilitaires CSS pour harmoniser l'affichage. Exemple : `grayscale opacity-70 hover:opacity-100 transition-opacity` ou `brightness-0 invert` (pour un affichage monochrome sur fond sombre). Définir une hauteur fixe (`h-8` ou `h-10`) et laisser la largeur en `auto`.
*   **Validation des 3 CTA (Call-to-Action) stratégiques :**
    *   **Fichiers concernés :** `App.tsx` et composants de section.
    *   **Action :** S'assurer de la présence d'un CTA primaire dans le Hero ("Prendre rendez-vous / Contact"), un CTA secondaire au milieu de la page (ex: après les Expertises), et un CTA final dans le Footer / avant le bloc de contact.

## Phase 2 : Audit SEO & Schema (Acquisition & Réseaux)

*   **Balisage JSON-LD `ProfessionalService` :**
    *   **Fichiers concernés :** `index.html` ou un composant de gestion du Head (`SEO.tsx`).
    *   **Action :** Injecter le bloc script JSON-LD avec les variables de `src/config/site-config.ts` (Nom, Adresse, Téléphone). Cela améliore le référencement local.
*   **Balises OpenGraph :**
    *   **Fichiers concernés :** `index.html`
    *   **Action :** Vérifier que les balises `<meta property="og:title" ... />`, `og:description`, `og:image`, et `og:url` sont correctement renseignées pour garantir un bel aperçu lors du partage sur LinkedIn ou Twitter.

## Phase 3 : Conformité & Accessibilité (RGPD)

*   **Mention de consentement RGPD :**
    *   **Fichiers concernés :** `src/components/Contact.tsx`
    *   **Action :** Ajouter une petite mention textuelle sous les champs ou sous le bouton submit de type : *"En soumettant ce formulaire, j'accepte que mes données soient utilisées pour traiter ma demande."* Idéalement, la lier également à une page de Politique de Confidentialité si elle existe.

## Phase 4 : Analyse du Ton (Copywriting & Branding)

*   **Vérification de l'expertise :**
    *   **Fichiers concernés :** Fichiers textes ou composants affichant la proposition de valeur (`Hero.tsx`, `About.tsx`).
    *   **Action :** Éviter les phrases trop génériques comme "Nous vous accompagnons". Privilégier un ton affirmé, expert et juridique, adapté à la cible. (Action nécessitant potentiellement une passe d'Intelligence Artificielle spécifique sur les textes).
