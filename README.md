# To-Do Uygulaması

Bu proje, kullanıcıların görevlerini (todo) takip etmelerini sağlayan basit bir uygulamadır. Hem frontend (React) hem de backend (Node.js ve Express) içerir. Uygulama, görevleri ekleme, düzenleme, silme ve listeleme gibi temel işlevleri sunmaktadır.

## Teknolojiler

- **Frontend:** React
- **Backend:** Node.js, Express
- **Veritabanı:** MySQL (veya tercih ettiğiniz veritabanı)
- **API İletişimi:** Axios (Frontend - Backend)

## Özellikler

- Görevleri listeleme
- Yeni görev ekleme
- Görevleri düzenleme
- Görevleri silme
- Görevlerin tamamlanma durumunu güncelleme (isteğe bağlı)

## Kurulum

### 1. Projeyi Çekme

GitHub reposunu bilgisayarınıza klonlayın:

```bash
git clone https://github.com/kullaniciadi/proje-adi.git
```

Backend ve Frontend farklı terminallerde çalıştırılmalıdır.

Backend Kurulumu
```bash
cd server
npm install
nodemon index.js
```

Frontend Kurulumu
```bash
cd client
npm install
npm start
```
