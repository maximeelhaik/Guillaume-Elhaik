---
description: Audit complet et optimisation automatique des performances React/Frontend
---

Ce workflow permet de réaliser un audit de performance profond et d'appliquer les correctifs nécessaires pour garantir un site fluide et rapide.

### Étapes du Workflow

// turbo
1. **Audit de performance** : Lance un audit croisé avec les agents spécialisés sur les fichiers principaux (généralement `App.tsx` et `index.css`).
   - Utilise `@react-component-performance` pour la logique React et Framer Motion.
   - Utilise `@web-performance-optimization` pour les assets, CSS et Core Web Vitals.

2. **Génération d'un rapport détaillé** : Synthétise les résultats dans un artefact `performance_audit.md` classé par sévérité (CRITICAL, HIGH, MEDIUM, LOW).

3. **Plan d'implémentation** : Demande à l'utilisateur de valider les changements proposés ou procède à une correction automatique des points critiques et prioritaires.

4. **Application des correctifs** : 
   - Optimisation des attributs d'images (LCP, lazy-loading).
   - Correction des conflits de transforms CSS/Framer Motion.
   - Ajout de `will-change` sur les éléments animés.
   - Stabilisation des composants React (memoization, callbacks).
   - Intégration du support `prefers-reduced-motion`.

5. **Vérification** : Lance un build ou un check TypeScript pour s'assurer qu'aucune régression n'a été introduite.

### Commande recommandée
Pour déclencher ce workflow sur un nouveau projet :
`Audite le projet avec les agents @react-component-performance et @web-performance-optimization. Crée un plan de correction et applique-le pour optimiser le LCP et la fluidité des animations.`
