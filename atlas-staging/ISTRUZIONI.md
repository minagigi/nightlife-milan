# ATLAS — staging per il nuovo repository

Questa cartella è il contenuto COMPLETO del futuro repo privato `atlas-commerce`.

Per il Claude locale sul PC:
1. Crea il repository privato `atlas-commerce` sull'account GitHub dell'utente
   (gh CLI se disponibile, altrimenti browser su github.com/new).
2. Copia il contenuto di questa cartella in una nuova directory `atlas-commerce`.
3. Rinomina `_gitignore` in `.gitignore`.
4. `git init -b main && git add -A && git commit -m "ATLAS: initial import" && git push`.
5. Suggerisci all'utente l'import su Vercel: vercel.com → Add New → Project → atlas-commerce
   (sito statico, index.html in root, nessuna configurazione).
