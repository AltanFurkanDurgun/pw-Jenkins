FROM mcr.microsoft.com/playwright:v1.55.0-jammy

WORKDIR /app

# Önce sadece manifest dosyalarını kopyala (cache için)
COPY . /app/

# Daha güvenli ve deterministik kurulum
RUN npm install --force
RUN npx playwright install
# Şimdi diğer tüm proje dosyalarını kopyala

