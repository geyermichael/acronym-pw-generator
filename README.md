# Acronym Quote Password Generator

Generiert ein Passwort aus einem gegebenen Zitat.
Dabei werden die Anfangsbuchstaben der einzelnen Wörter aneinandergereit.
Sonderzeichen werden ebenfalls an der entsprechenden Stelle übernommen.

## Character Replacement

Es können definierte Zeichen (s. numRepObj) durch entsprechende Zahlen erstetzt werden.

```javascript
const numRepObj = {
  g: "9",
  G: "9",
  i: "1",
  I: "1",
  o: "0",
  O: "0",
  x: "10",
  X: "10",
};
```

Zudem können definierte Zeichen (s. specCharRepObj) durch erweiterete Sonderzeichen ersetzt
werden, welche sich in der Regel nicht in Zitaten finden lassen.

```javascript
const specCharRepObj = {
  u: "_",
  h: "-",
};
```
