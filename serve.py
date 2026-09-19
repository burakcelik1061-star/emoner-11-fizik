"""Geliştirme sunucusu — tarayıcı önbelleğini devre dışı bırakır.

Akıllı tahtada gerekmez (orada index.html'e çift tıklanır); bu dosya yalnızca
geliştirme sırasında dosya değişikliklerinin anında görünmesi içindir.
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8099
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
