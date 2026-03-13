# Standard Operating Procedure (SOP) - SlowDown HareApp

Ten dokument opisuje standardowe procedury korzystania, utrzymania i aktualizacji aplikacji SlowDown HareApp.

---

## 1. Cel i Zakres
Zapewnienie użytkownikowi regularnych przerw w celu redukcji zmęczenia cyfrowego (Digital Eye Strain) i poprawy ergonomii pracy.

## 2. Procedura Użytkowania (User Guide)

### Konfiguracja (Setup):
1. **Wybór Interwału**: Rekomendowany czas pracy to 1 godzina.
2. **Inicjalizacja**: Kliknij "START ACTIVITY", aby rozpocząć odliczanie.

### Obsługa Alertu:
- **Relax Now**: Natychmiastowe odejście od komputera (Rekomendowane).
- **Delay Relax**: Odroczenie przerwy (używać tylko w sytuacjach wyjątkowych).

### Sesja Relaksacyjna:
- Zastosuj zasadę 20-20-20 (patrzenie w dal przez 20 sekund).
- Wykonaj proste ćwiczenia rozciągające.
- Po powrocie naciśnij dowolny klawisz, aby zresetować system.

---

## 3. Zarządzanie Zasobami (Technical Maintenance)

Aplikacja polega na plikach multimedialnych umieszczonych w głównym katalogu repozytorium na GitHubie.

### Aktualizacja zdjęć:
1. Przygotuj plik `.jpg` lub `.JPG`.
2. Nadaj mu nazwę `zorza.jpg` (dla ekranu relaksu) lub `hare_relax.JPG` (dla ekranu alertu).
3. Wgraj plik do repozytorium GitHub, nadpisując istniejący.

### Aktualizacja dźwięku:
1. Przygotuj plik `.mp3`.
2. Nadaj mu nazwę `soundreality-notification-piano-443094.mp3`.
3. Wgraj do repozytorium.

## 4. Konfiguracja Interwałów (Kod)

Interwały czasowe są zdefiniowane bezpośrednio w pliku `index.html` w sekcji `<script>`.
- Przyciski wywołują funkcję `startTimer(sekundy)`.
- Możesz dodać nowy przycisk w sekcji `<!-- SCREEN 1: START -->`.

## 5. Tryb Offline i PWA (Progressive Web App)

Aplikacja została wzbogacona o funkcje PWA, co pozwala na jej działanie bez dostępu do internetu.

### Jak zainstalować na telefonie?
1. Otwórz link do aplikacji w przeglądarce (Safari na iOS, Chrome na Android).
2. Wybierz opcję **"Udostępnij"** (iOS) lub menu (trzy kropki na Android).
3. Kliknij **"Dodaj do ekranu głównego"** (Add to Home Screen).
4. Aplikacja pojawi się jako ikona na pulpicie i będzie działać nawet bez internetu.

### Jak to działa technicznie?
- Plik `manifest.json` definiuje wygląd aplikacji na telefonie.
- Plik `sw.js` (Service Worker) zapisuje pliki aplikacji (kod, zdjęcia, dźwięk) w pamięci podręcznej telefonu przy pierwszym uruchomieniu.

## 6. Procedura Wdrażania (Deployment)

1. Po dokonaniu zmian w AI Studio, użyj funkcji **Export to GitHub**.
2. **WAŻNE**: Przy eksporcie do nowego repozytorium, pamiętaj o ponownym wgraniu plików graficznych i dźwiękowych (GitHub ich nie przesyła automatycznie z AI Studio).

---
*Ostatnia aktualizacja: 13 marca 2026*
