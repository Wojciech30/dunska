# TODO - Admin panel v2 (dla użytkownika bez wiedzy IT)

## Faza A - Stabilizacja i naprawy krytyczne

- [x] A1. Naprawić puste formularze edycji marki i wpisu blogowego.
  - Problem: formularze pobierają dane po `id`, ale obecne endpointy publiczne działają po `slug`.
  - Backend:
    - [x] dodać `GET /api/brands/admin/:id` w `backend/routes/brands.js`
    - [x] dodać `GET /api/blog/admin/:id` w `backend/routes/blog.js`
  - Frontend:
    - [x] `frontend/src/views/admin/BrandEditorView.vue` - pobieranie danych z nowego endpointu admin
    - [x] `frontend/src/views/admin/BlogEditorView.vue` - pobieranie danych z nowego endpointu admin
    - [x] dodać stan błędu ładowania zamiast cichego `catch`

- [x] A2. Ujednolicić stany `loading/empty/error` na listach admina.
  - [x] `frontend/src/views/admin/BrandsView.vue`
  - [x] `frontend/src/views/admin/BlogView.vue`
  - [x] `frontend/src/views/admin/InspirationsView.vue`
  - [x] `frontend/src/views/admin/InquiriesView.vue`
  - [x] `frontend/src/views/admin/DashboardView.vue`

## Faza B - Edycja treści bez HTML (WYSIWYG)

- [x] B1. Dodać edytor tekstu z toolbar (pogrubienie, kursywa, nagłówki, lista, cytat, link).
  - Pola:
    - [x] opis marki
    - [x] treść wpisu blogowego
    - [x] treść strony "O nas"
  - Frontend:
    - [x] `frontend/src/views/admin/BrandEditorView.vue`
    - [x] `frontend/src/views/admin/BlogEditorView.vue`
    - [x] nowy widok "O nas" (patrz Faza D)
  - Backend:
    - [x] walidacja/sanitizacja HTML przed zapisem (route-level lub middleware)

- [x] B2. Dodać podgląd "Tak zobaczy to klient" dla edycji treści.
  - [x] marka
  - [x] blog
  - [x] o nas

## Faza C - Formularz zapytania o produkt

- [x] C1. Dodać możliwość wyboru marki w formularzu zapytania.
  - Frontend:
    - [x] `frontend/src/components/InquiryModal.vue`
      - [x] pobierać listę marek z `/api/brands`
      - [x] dodać `select` z markami
      - [x] zachować prefill po wejściu z karty marki (localStorage)
  - Backend:
    - [x] `backend/models/Inquiry.js` - dodać `brandId` (ObjectId, opcjonalne), zostawić `brand` (tekst) dla kompatybilności
    - [x] `backend/routes/inquiries.js` - przyjmować i zapisywać `brandId` + `brand`

- [x] C2. W panelu zapytań pokazywać markę po relacji i/lub nazwie.
  - [x] `frontend/src/views/admin/InquiriesView.vue`
  - [x] opcjonalnie populate w `GET /api/inquiries/admin`

## Faza D - Nowa struktura panelu admin (bardziej intuicyjna)

- [x] D1. Podzielić panel na czytelne sekcje i uprościć nazewnictwo.
  - [x] `frontend/src/views/admin/AdminLayout.vue` - nowe menu:
    - Start
    - Strona główna
    - Marki
    - Blog
    - Inspiracje
    - Zapytania
    - O nas
    - Kontakt
    - Ustawienia techniczne

- [x] D2. Przenieść edycję "O nas" z ustawień do osobnej podstrony admin.
  - Frontend:
    - [x] nowy widok `frontend/src/views/admin/AboutEditorView.vue`
    - [x] nowa trasa w `frontend/src/router/index.js` (np. `/admin/dashboard/about`)
  - Backend:
    - [x] użyć istniejących pól `aboutTitle`, `aboutPreview`, `aboutContent`, `aboutImage` w `SiteSettings`

- [x] D3. Stworzyć osobną podstronę "Kontakt" + panel edycji.
  - Frontend public:
    - [x] nowy widok `frontend/src/views/ContactView.vue`
    - [x] nowa trasa w `frontend/src/router/index.js` (np. `/kontakt`)
  - Frontend admin:
    - [x] nowy widok `frontend/src/views/admin/ContactEditorView.vue`
    - [x] nowa trasa w `frontend/src/router/index.js` (np. `/admin/dashboard/contact`)
  - Backend:
    - [x] użyć istniejących pól: `contactEmail`, `phone`, `address`, `mapUrl`, `instagramUrl`, `instagramDmUrl`, `facebookUrl`

## Faza E - Edytowalny układ strony głównej (prościej)

- [x] E1. Zamienić strzałki sekcji na prosty drag-and-drop.
  - [x] `frontend/src/views/admin/SettingsView.vue` lub nowy `HomeLayoutView.vue`
  - [x] zachować zapis do `homepageSections` (type, enabled, order)

- [x] E2. Dodać etykiety biznesowe sekcji (bez technicznego słownictwa).
  - Przykład: "Baner główny", "Marki", "Inspiracje", "O nas", "CTA", "Blog", "Social media"

## Faza F - Czyszczenie plików graficznych z serwera

- [x] F1. Dodać serwis do bezpiecznego usuwania lokalnych obrazów z `/uploads`.
  - Zasady:
    - [x] usuwać tylko pliki lokalne (`/uploads/...`)
    - [x] nigdy nie usuwać URL zewnętrznych
    - [x] usuwać dopiero po sprawdzeniu, że plik nie jest używany w innych rekordach

- [x] F2. Podpiąć cleanup pod usuwanie i aktualizacje.
  - [x] `backend/routes/brands.js` (logo, hero, galeria)
  - [x] `backend/routes/blog.js` (coverImage)
  - [x] `backend/routes/inspirations.js` (image)
  - [x] opcjonalnie `backend/routes/settings.js` (hero/about image)

- [ ] F3. Dodać testy/regresję scenariuszy usuwania.
  - [ ] usunięcie wpisu/marki/inspiracji kasuje nieużywane pliki
  - [ ] zmiana obrazka usuwa stary plik tylko gdy nie ma referencji
  - [ ] błędy usuwania pliku nie blokują odpowiedzi API

## Definicja ukończenia (DoD)

- [ ] Użytkownik nietechniczny jest w stanie:
  - dodać markę
  - edytować markę
  - opublikować wpis blogowy
  - zmienić kolejność sekcji strony głównej
  - obsłużyć zapytanie klienta
  - bez instrukcji i bez edycji ręcznego HTML

- [ ] Brak pustych formularzy edycji.
- [ ] Brak cichych błędów (wszędzie czytelny komunikat błędu).
- [ ] "O nas" i "Kontakt" mają osobne podstrony w adminie.
- [ ] Nieużywane obrazy są usuwane z serwera.
