# API-Contrast-ratio

Création d'une mini API sur Node.js, retournant le contrast ratio de 2 valeurs passées en paramètre `GET` via une URL à la forme :

```
http://localhost/contrast-ratio?background=f95050&foreground=232D33
```

Les couleurs de `background` et `foreground` sont en valeur hexadécimale (sans le préfixe `#`).

L'API retourne un fichier JSON avec les niveaux de validité (AA, AALarge, AAA, AAALarge).
