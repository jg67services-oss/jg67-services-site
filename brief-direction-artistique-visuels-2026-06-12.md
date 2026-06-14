# JG67 Services — Direction artistique des visuels premium
*Brief de production photo/vidéo · Juin 2026 · Palette DA : bleu nuit #0E1E2A · champagne #B7935B · lin #F6F4EF*

---

## 1. État des lieux

**Galerie résultats** (≈30 photos de logements réels) : capital d'authenticité conservé tel quel.

**Visuels équipe en action** : seulement 2 actuellement (`JG67 SERVICES MENAGE LOCATION COURTE DUREE.jpg` et `JG67 SERVICES PREPARATION AVANT L'ARRIVE DES VOYAGEURS.webp`). Objectif : 6 à 8 scènes premium avec uniforme identifiable.

---

## 2. L'uniforme JG67

- Tunique ou polo bleu nuit (#0E1E2A), coupe nette, manches courtes ou 3/4
- Liseré ou col champagne/doré discret
- Logo JG67 Services brodé côté cœur
- Tablier court en option (scènes cuisine/salle de bain)
- Cheveux attachés, gants nitrile noirs ou blancs
- Codes hôtellerie 4-5 étoiles

---

## 3. Shot list — 7 scènes

| # | Scène | Usage |
|---|-------|-------|
| 1 | Intervenante lissant un drap blanc, suite lumineuse, parquet point de Hongrie | Hero accueil |
| 2 | Gros plan mains gantées — lit au carré | Section prestations / linge |
| 3 | Pliage serviette (nœud ou cygne), lumière de fenêtre | Détails / galerie |
| 4 | Salle de bain marbre : essuyage robinetterie chromée, reflets | Page nettoyage courte durée |
| 5 | Cuisine plan noir : chiffon microfibre, surfaces brillantes | Page services |
| 6 | Contrôle qualité : rapport photo smartphone | Section "Comment ça marche" étape 4 |
| 7 | Duo d'intervenantes, check-list à l'entrée d'un appartement | Page À propos |

---

## 4. Prompts IA prêts à l'emploi

Modèles recommandés : **Midjourney v7** · **Flux 1.1 Pro / Flux Kontext** · **Imagen / Nano Banana** (Google)
Ratio : 3:2 ou 4:5. Prompts en anglais.

**Socle commun (fin de chaque prompt) :**
```
editorial photography for a luxury hospitality brand, soft natural window light,
golden hour glow, shallow depth of field, 50mm lens, candid in-motion moment,
not posed, photorealistic, high-end Parisian apartment aesthetic, clean minimal
composition, color palette of deep navy uniform, warm gold accents, crisp white
linen --no stock photo look, plastic skin, harsh flash, cluttered background,
text, watermark
```

**Scène 1 — Hero :**
```
A professional housekeeper in an elegant deep navy uniform with subtle gold
piping smooths a crisp white duvet on a king bed, luxurious bright apartment
with herringbone parquet floor and tall French windows, sheer curtains glowing
with morning light, she is captured mid-gesture, focused and graceful
```

**Scène 2 — Lit au carré :**
```
Close-up of gloved hands tucking a perfect hospital corner on white hotel
bedding, deep navy uniform sleeve with embroidered crest visible, soft
directional daylight raking across the linen texture
```

**Scène 3 — Pliage serviette :**
```
A housekeeper in navy uniform places a white towel folded into an elegant swan
shape on a freshly made bed, boutique hotel styling, warm soft light from a
nearby window, gentle smile, natural posture
```

**Scène 4 — Salle de bain marbre :**
```
A professional cleaner in deep navy uniform polishes a chrome rainfall shower
fixture in a marble-tiled bathroom, water droplets sparkling, bright clean
reflections, steam softly visible, meticulous gesture
```

**Scène 5 — Cuisine :**
```
A housekeeper wipes a matte black kitchen countertop with a folded grey
microfiber cloth, modern open kitchen with brass fixtures, morning light,
mid-action with slight motion in the arm, immaculate surfaces
```

**Scène 6 — Rapport photo :**
```
A professional housekeeper in navy uniform photographs a perfectly made bed
with her smartphone for a quality report, standing by a bright window, candid
documentary style
```

**Scène 7 — Duo équipe :**
```
Two professional housekeepers in matching deep navy uniforms with gold detail
review a checklist together at the entrance of an elegant apartment, natural
confident body language, candid documentary moment
```

---

## 5. Logo sur l'uniforme — méthode recommandée

1. **Incrustation post-prod (recommandé)** : générer avec `small blank embroidered crest on the chest`, puis incruster dans Photoshop / Photopea / Canva. 5 min par photo.
2. **Édition par référence** : Flux Kontext ou Nano Banana — fournir l'image du logo + instruction `place this exact logo embroidered on the chest`.
3. **Ideogram 3** : meilleur sur le texte mais photoréalisme inférieur — dépannage seulement.

---

## 6. Cinémagraphes (2-3 visuels max)

Outils : Runway Gen-4, Kling 2.x, Hailuo, Luma.

**Prompt type :**
```
subtle cinemagraph, static camera, sheer curtain gently swaying in a light
breeze, dust particles floating in the sunbeam, everything else perfectly
still, seamless loop, slow cinematic motion
```

**Specs web pour Angelo :**
- Durée : 5-6 s boucle parfaite
- Formats : `.webm` + `.mp4` H.265/VP9
- Poids max : 2,5 Mo
- Balise : `<video autoplay muted loop playsinline poster="[image-fixe]">`
- Désactivation : `@media (prefers-reduced-motion: reduce)`
- Mobile : servir l'image fixe uniquement (vitesse + indexation Google)

---

## 7. Stratégie recommandée

- **IA** : hero, détails gestuels (mains, linge, robinetterie), cinémagraphes
- **Réel** : demi-journée de shooting avec les vraies intervenantes en polos brodés (smartphone récent + lumière de fenêtre) pour page À propos et section équipe
- **SEO** : nommer chaque fichier `menage-airbnb-strasbourg-[scene].webp`, compression < 300 Ko, alt tags systématiques

---

## 8. Refonte DA site — effectuée le 2026-06-12

La palette a été appliquée sur les 10 pages HTML + effects.css :
- `primary` : #0556c3 → **#0E1E2A** (bleu nuit)
- `background` / `surface` : #f8f9ff → **#F6F4EF** (lin)
- Accent doré CSS : #C9A96E → **#B7935B** (champagne)
- Icônes hero check : #afc6ff → **#B7935B** (champagne)
- Secondary containers : tons bleutés → tons lin/champagne chauds
- Nav overlay transparent : quasi-noir → bleu nuit rgba(14,30,42,0.85)
