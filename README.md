# Dt207g - Moment 4.1 - registrering och inloggning

Repositoryt innehåller ett REST API byggt med Express. APIet hanterar en tabell i mongodb med användarnamn och hashade lösenord för inloggning. 

Klona ned källkodsfilerna, kör kommando npm install för att installera de npm-paket du behöver. Kör kommandot node server för att köra filen server.js och starta servern. 

För att nå API använd "http//:127.0.0.1/3005/users"
Routes:
- Skapa användare /register (POST)
- Logga in /login (POST)
- Skyddad route /protected (GET)