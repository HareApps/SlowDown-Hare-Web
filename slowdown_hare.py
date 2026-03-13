
import tkinter as tk
from tkinter import ttk
import threading
import time
import os
import sys
import logging
from PIL import Image, ImageTk
import urllib.request
import io

# --- KONFIGURACJA LOGOWANIA DO PLIKU ---
LOG_DIR = "./Logs"
LOG_FILE = os.path.join(LOG_DIR, "hare_app.log")

# Tworzenie folderu Logs, jeśli nie istnieje
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

# Konfiguracja logowania - tylko do pliku, bez StreamHandler (konsoli)
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename=LOG_FILE,
    filemode='a', # 'a' - dopisywanie, 'w' - nadpisywanie przy każdym starcie
    encoding='utf-8'
)
logger = logging.getLogger(__name__)
# ---------------------------------------

class SlowDownHareApp:
    def __init__(self, root):
        logger.info("Inicjalizacja aplikacji SlowDownHareApp")
        self.root = root
        self.root.title("SlowDown HareApp")
        self.root.geometry("450x600")
        self.root.configure(bg="#0f172a")
        
        # Obsługa systemowego przycisku zamknięcia (X)
        self.root.protocol("WM_DELETE_WINDOW", self.safe_exit)
        
        # Startujemy z przezroczystością 0
        self.root.attributes("-alpha", 0.0)
        
        self.activity_intervals = {
            "6 seconds (Test)": 6,
            "0.5 hour": 1800,
            "1 hour": 3600,
            "1.5 hours": 5400,
            "2 hours": 7200,
            "2.5 hours": 9000,
            "3 hours": 10800,
            "3.5 hours": 12600,
            "4 hours": 14400
        }
        
        # Interwały opóźnienia
        self.delay_intervals = {
            "6 seconds (Test)": 6,
            "5 minutes": 300,
            "10 minutes": 600,
            "15 minutes": 900,
            "30 minutes": 1800
        }

        self.setup_ui()
        self.fade_in()

    def safe_exit(self):
        """Łagodne i bezpieczne zamknięcie aplikacji, przyjazne dla Jupyter Notebook."""
        logger.info("Zamykanie aplikacji (safe_exit)...")
        try:
            self.root.quit()
            self.root.destroy()
            logger.info("Zniszczono obiekt root.")
        except Exception as e:
            logger.debug(f"Informacja: Okno mogło zostać zamknięte wcześniej: {e}")
        finally:
            logger.info("Proces zamykania zakończony pomyślnie.")

    def setup_ui(self):
        logger.info("Wchodzenie do setup_ui (Menu główne)")
        try:
            self.root.attributes("-fullscreen", False)
            self.root.attributes("-topmost", False)
        except Exception as e:
            logger.error(f"Błąd resetowania atrybutów: {e}")

        self.root.geometry("450x600")
        self.root.unbind_all("<Key>") 
        self.root.unbind_all("<Button-1>")

        for widget in self.root.winfo_children():
            widget.destroy()

        self.root.configure(bg="#0f172a")
        self.root.deiconify()

        # UI Elementy
        tk.Label(self.root, text="SlowDown HareApp", font=("Segoe UI", 24, "bold"), bg="#0f172a", fg="#10b981").pack(pady=(30, 10))
        tk.Label(self.root, text="REST YOUR EYES, REFRESH YOUR MIND", font=("Segoe UI", 8), bg="#0f172a", fg="#64748b").pack()

        tk.Label(self.root, text="Select Activity Period:", font=("Segoe UI", 10), bg="#0f172a", fg="#94a3b8").pack(pady=(40, 5))
        self.interval_var = tk.StringVar(value="6 seconds (Test)")
        
        self.combo = ttk.Combobox(self.root, textvariable=self.interval_var, values=list(self.activity_intervals.keys()), state="readonly", width=30)
        self.combo.pack(pady=10)

        btn_start = tk.Button(self.root, text="Start Activity", command=self.start_activity, bg="#10b981", fg="#0f172a", font=("Segoe UI", 14, "bold"), padx=40, pady=15, bd=0, cursor="hand2")
        btn_start.pack(pady=50)

        btn_close = tk.Button(self.root, text="Close App", command=self.safe_exit, bg="#0f172a", fg="#ef4444", font=("Segoe UI", 9, "bold"), bd=0, cursor="hand2")
        btn_close.pack(side="bottom", pady=20)

    def fade_in(self, target=1.0):
        alpha = self.root.attributes("-alpha")
        if alpha < target:
            alpha += 0.1
            self.root.attributes("-alpha", alpha)
            self.root.after(30, lambda: self.fade_in(target))

    def start_activity(self):
        val = self.interval_var.get()
        seconds = self.activity_intervals[val]
        logger.info(f"Naciśnięto Start Activity: {val} ({seconds}s)")
        self.root.withdraw()
        threading.Thread(target=self.countdown, args=(seconds,), daemon=True).start()

    def countdown(self, seconds):
        logger.debug(f"Wątek odliczania: {seconds} sekund do alertu...")
        time.sleep(seconds)
        logger.debug("Odliczanie zakończone, wywołuję show_alert")
        self.root.after(0, self.show_alert)

    def get_image(self, path, fallback_url):
        try:
            if os.path.exists(path):
                logger.info(f"Ładowanie obrazka z dysku: {path}")
                return Image.open(path)
            else:
                logger.warning(f"Brak pliku {path}. Próba pobrania fallback: {fallback_url}")
                with urllib.request.urlopen(fallback_url) as response:
                    return Image.open(io.BytesIO(response.read()))
        except Exception as e:
            logger.error(f"Błąd ładowania obrazka: {e}")
            return None

    def show_alert(self):
        logger.info("Wyświetlanie okna ALERT")
        self.root.deiconify()
        self.root.attributes("-alpha", 0.0)
        self.root.attributes("-topmost", True)
        self.fade_in()

        for widget in self.root.winfo_children():
            widget.destroy()

        img = self.get_image("hare_relax.jpg", "https://picsum.photos/seed/hare/400/300")
        if img:
            img = img.resize((380, 220), Image.Resampling.LANCZOS)
            self.photo = ImageTk.PhotoImage(img)
            tk.Label(self.root, image=self.photo, bg="#0f172a").pack(pady=20)
        else:
            tk.Frame(self.root, width=380, height=220, bg="#1e293b").pack(pady=20)

        tk.Label(self.root, text="Hare says: SlowDown", font=("Segoe UI", 22, "italic bold"), bg="#0f172a", fg="white").pack(pady=10)

        tk.Button(self.root, text="RelaxNow", command=self.relax_now, bg="#10b981", fg="white", font=("Segoe UI", 12, "bold"), width=25, pady=12, bd=0, cursor="hand2").pack(pady=5)

        delay_frame = tk.Frame(self.root, bg="#0f172a")
        delay_frame.pack(pady=10)
        self.delay_var = tk.StringVar(value="6 seconds (Test)")
        
        tk.Button(delay_frame, text="DelayRelax", command=self.delay_relax, bg="#334155", fg="white", font=("Segoe UI", 10), width=15, pady=5, bd=0).pack(side="left", padx=5)
        ttk.Combobox(delay_frame, textvariable=self.delay_var, values=list(self.delay_intervals.keys()), state="readonly", width=12).pack(side="left")

        tk.Button(self.root, text="CloseApp", command=self.safe_exit, bg="#0f172a", fg="#64748b", font=("Segoe UI", 8), bd=0).pack(pady=20)

    def relax_now(self):
        logger.info("Naciśnięto RelaxNow - Tryb pełnoekranowy")
        self.root.attributes("-topmost", False)
        self.root.attributes("-fullscreen", True)
        self.root.configure(bg="black")
        
        for widget in self.root.winfo_children():
            widget.destroy()

        self.instr_lbl = tk.Label(
            self.root, 
            text="HIT ANY KEY OR CLICK MOUSE TO RETURN", 
            font=("Segoe UI", 24, "bold"), 
            bg="black", 
            fg="#10b981"
        )
        self.instr_lbl.pack(side="bottom", pady=60)

        img = self.get_image("hare_relax.jpg", "https://picsum.photos/seed/relax/1200/800")
        if img:
            screen_h = self.root.winfo_screenheight()
            img.thumbnail((int(screen_h * 1.5), int(screen_h * 0.7)), Image.Resampling.LANCZOS)
            self.photo_large = ImageTk.PhotoImage(img)
            tk.Label(self.root, image=self.photo_large, bg="black", bd=0).pack(expand=True)

        self.root.update_idletasks()
        self.root.lift()
        self.root.focus_force()
        
        self.root.bind_all("<Key>", self.finish_relax)
        self.root.bind_all("<Button-1>", self.finish_relax)
        logger.info("Tryb relaksu aktywny...")

    def finish_relax(self, event=None):
        logger.info("Powrót z trybu relaksu.")
        self.root.unbind_all("<Key>")
        self.root.unbind_all("<Button-1>")
        self.setup_ui()

    def delay_relax(self):
        val = self.delay_var.get()
        seconds = self.delay_intervals[val]
        logger.info(f"Naciśnięto DelayRelax: {val} ({seconds}s)")
        self.root.withdraw()
        threading.Thread(target=self.countdown, args=(seconds,), daemon=True).start()

if __name__ == "__main__":
    logger.info("=== SYSTEM START ===")
    root = tk.Tk()
    app = SlowDownHareApp(root)
    
    try:
        root.mainloop()
        logger.info("Pętla mainloop zakończona pomyślnie.")
    except Exception as e:
        logger.error(f"Nieoczekiwany błąd: {e}")
    finally:
        logger.info("Aplikacja zakończyła działanie.")
