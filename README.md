# Acronym Quote Password Generator

Generiert ein Passwort aus einem gegebenen Zitat.
Dabei werden die Anfangsbuchstaben der einzelnen Wörter aneinandergereit.
Sonderzeichen werden ebenfalls an der entsprechenden Stelle übernommen.

## Character Replacement

Es können zudem definierte Zeichen durch Zahlen erstetzt werden.

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

Auch entsprechend definierte Zeichen können durch erweiterete Sonderzeichen ersetzt werden.

const specCharRepObj = {
u: "\_",
h: "-",
};
