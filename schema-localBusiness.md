# Schema.org LocalBusiness — JG67 Services

Bloc JSON-LD à coller dans le `<head>` de **chaque page HTML** du site.
Colle-le juste avant la balise `</head>`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "JG67 Services",
  "description": "Service de ménage Airbnb et gestion opérationnelle de locations courte durée à Strasbourg. Nettoyage professionnel, gestion du linge, suivi qualité. Disponible 7j/7.",
  "url": "https://jg67services.fr",
  "telephone": "+33754817008",
  "email": "contact@jg67services.fr",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Strasbourg",
    "addressRegion": "Bas-Rhin",
    "postalCode": "67000",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.5734,
    "longitude": 7.7521
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 48.5734,
      "longitude": 7.7521
    },
    "geoRadius": "20000"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
    ],
    "opens": "07:00",
    "closes": "21:00"
  },
  "priceRange": "€€",
  "serviceType": [
    "Ménage Airbnb",
    "Nettoyage location courte durée",
    "Remise à blanc Airbnb",
    "Gestion du linge",
    "Préparation logement"
  ],
  "sameAs": [
    "https://www.google.com/search?kgmid=/g/11z5p5sp4k"
  ]
}
</script>
```

## Notes
- Le champ `sameAs` contient l'URL de la fiche Google Business Profile JG67 Services.
- Si tu crées un profil Facebook/Instagram pour JG67, ajoute les URLs dans `sameAs` également.
- Ce bloc est identique sur toutes les pages — une seule version à maintenir.
