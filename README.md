# Duńska Concept Store — Strona internetowa

## Co to jest?

Strona internetowa sklepu Duńska Concept Store. Składa się z:

- **Strona publiczna** — widoczna dla klientów (marki, blog, inspiracje, formularz kontaktowy)
- **Panel administracyjny** — do zarządzania treścią (dostępny pod adresem `/admin`)

---

## Jak uruchomić stronę na swoim komputerze?

### Krok 1: Zainstaluj wymagane programy

Potrzebujesz dwóch darmowych programów. Pobierz i zainstaluj je klikając „Next, Next, Finish":

1. **Node.js** — silnik strony  
   Pobierz z: https://nodejs.org/ (kliknij duży zielony przycisk **LTS**)

2. **MongoDB** — baza danych  
   Pobierz z: https://www.mongodb.com/try/download/community  
   Przy instalacji zaznacz opcję „Install MongoDB as a Service" (żeby baza startowała automatycznie)

Po zainstalowaniu **zrestartuj komputer**.

### Krok 2: Pobierz pliki projektu

Masz dwie opcje:

**Opcja A — Jeśli dostałeś folder ZIP:**

1. Wypakuj folder ZIP w dowolne miejsce (np. na Pulpit)

**Opcja B — Jeśli masz link do repozytorium Git:**

1. Zainstaluj Git: https://git-scm.com/downloads
2. Otwórz **Terminal** (Mac) lub **Wiersz polecenia** (Windows — wpisz `cmd` w wyszukiwarce)
3. Wpisz i naciśnij Enter:
   ```
   git clone ADRES_REPOZYTORIUM
   ```
   (zamień `ADRES_REPOZYTORIUM` na link, który dostałaś)

### Krok 3: Skonfiguruj bazę danych

1. Otwórz folder projektu (ten, w którym widzisz pliki `package.json`, `backend/`, `frontend/`)
2. Znajdź plik `.env` — otwórz go w Notatniku
3. Upewnij się, że linia z bazą danych wygląda tak:
   ```
   MONGODB_URI=mongodb://localhost:27017/dunska
   ```
4. Hasło do panelu admina ustawiasz tutaj:
   ```
   ADMIN_PASSWORD=dunska
   ```
   (możesz zmienić `dunska` na dowolne inne hasło)

> **Uwaga:** Jeśli nie widzisz pliku `.env`, utwórz nowy plik tekstowy o tej nazwie i wklej do niego:
>
> ```
> PORT=3000
> MONGODB_URI=mongodb://localhost:27017/dunska
> ADMIN_PASSWORD=dunska
> ```

### Krok 4: Zainstaluj zależności (jednorazowo)

1. Otwórz **Terminal** / **Wiersz polecenia**
2. Przejdź do folderu projektu. Jeśli folder jest na Pulpicie, wpisz:
   ```
   cd Desktop/dunska
   ```
3. Wpisz kolejno (każda linia to osobna komenda — po każdej naciśnij Enter i poczekaj aż się skończy):
   ```
   npm install
   cd backend
   npm install
   cd ..
   cd frontend
   npm install
   cd ..
   ```

### Krok 5: Uruchom stronę

W terminalu (będąc w głównym folderze projektu) wpisz:

```
npm run dev
```

Poczekaj kilka sekund. Zobaczysz komunikaty potwierdzające uruchomienie.

Teraz otwórz przeglądarkę i wejdź na:

| Co                   | Adres                       |
| -------------------- | --------------------------- |
| **Strona publiczna** | http://localhost:5173       |
| **Panel admina**     | http://localhost:5173/admin |

Hasło do panelu admina to to, co ustawiłaś w pliku `.env` (domyślnie: `dunska`).

### Krok 6: Zamknięcie strony

Żeby zatrzymać stronę, w terminalu naciśnij `Ctrl + C`.

---

## Najczęstsze problemy

| Problem                          | Rozwiązanie                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `command not found: npm`         | Node.js nie jest zainstalowany lub trzeba zrestartować komputer                                                       |
| `ECONNREFUSED` przy uruchomieniu | MongoDB nie działa — uruchom usługę MongoDB lub zrestartuj komputer                                                   |
| Strona nie ładuje się            | Sprawdź czy w terminalu nie ma czerwonych błędów. Upewnij się, że wpisujesz `npm run dev` w głównym folderze projektu |
| Nie widzę pliku `.env`           | Na Windowsie pliki zaczynające się od kropki mogą być ukryte. W Eksploratorze plików włącz „Pokaż ukryte elementy"    |

---

## Struktura projektu

```
dunska/
├── backend/       ← serwer (API, baza danych)
├── frontend/      ← strona wizualna (to co widzi użytkownik)
├── .env           ← konfiguracja (hasła, adresy)
└── package.json   ← informacje o projekcie
```
