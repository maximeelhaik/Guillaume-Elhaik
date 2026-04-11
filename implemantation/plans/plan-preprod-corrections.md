# Plan de Modifications : Phase de Test et Pré-production - TERMINÉ

Ce plan détaille les actions correctives identifiées suite à l'audit défini dans `test-preprod.md`. 

## 1. Optimisation des Assets (Images) [COMPLÉTÉ]

* [x] **Conversion au format WebP :**
    * Converti `src/assets/images/Guillaume silhouette.png` -> `Guillaume silhouette.webp` (75 Ko vs 2.4 Mo)
    * Converti `src/assets/images/carbon-fibre.png` -> `carbon-fibre.webp`
* [x] **Refactoring des Imports (`src/App.tsx`) :**
    * Mis à jour l'import de `guillaumeSilhouette` vers `.webp`.
    * Mis à jour l'import de `carbonFibreImg` vers `.webp`.
* [x] **Nettoyage :**
    * Supprimé les fichiers source PNG d'origine.

## 2. Optimisation des Performances (Lazy Loading & Rendu) [COMPLÉTÉ]

* [x] **Ajout de `loading="lazy"` & `decoding="async"` :**
    * Appliqué sur les balises `<img />` sous la ligne de flottaison :
        * Section Expertises
        * Section Équipe/Avocats
        * Section Témoignages
        * Footer Porcelaine
* [x] **Vérification du Layout Stability :**
    * Vérifié via subagent : Les conteneurs Hero ont des aspects ratios fixes, évitant le Layout Shift.

## 3. Audit Runtime (Console & Erreurs) [COMPLÉTÉ]

* [x] **Correction des erreurs détectées :**
    * Aucune erreur bloquante détectée sur `localhost:3000`.
    * Une alerte mineure Framer Motion identifiée, sans impact fonctionnel.

## 4. Audit Visuel (Subagent Navigateur) [COMPLÉTÉ]

* [x] **Vérification des Overflows :**
    * Vérifié sur mobile (375px) : Aucun `overflow-x` détecté.
* [x] **Livrable :** Audit validé.

---
**Statut :** Exécuté le 11/04/2026.
