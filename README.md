# 🛒 Elektronika Mahsulotlari E-Commerce Backend (NestJS + MongoDB)

Bu loyiha **NestJS** va **MongoDB** texnologiyalariga asoslangan elektronika mahsulotlari uchun mo‘ljallangan onlayn do‘konning backend (server) qismi hisoblanadi. U foydalanuvchilar, sotuvchilar va administratorlar uchun mo‘ljallangan turli imkoniyatlarni taqdim etadi: mahsulotlar bilan ishlash, buyurtmalarni boshqarish, kategoriyalar yaratish va ko‘plab boshqa funksiyalar.

---

## 🎯 Loyiha maqsadi

- Elektronika mahsulotlarini internet orqali sotish va xarid qilish imkonini beruvchi zamonaviy tizim yaratish.
- Sotuvchilarga o‘z mahsulotlarini qo‘shish va boshqarish imkoniyatini berish.
- Foydalanuvchilarga mahsulotlarni ko‘rish, qidirish va buyurtma berish imkoniyatini yaratish.
- Adminlar uchun barcha foydalanuvchilar va mahsulotlar ustidan nazorat o‘rnatish.

---

## 👤 Foydalanuvchi rollari

| Roli     | Imkoniyatlari                                                                 |
|----------|--------------------------------------------------------------------------------|
| **User** | Ro‘yxatdan o‘tadi, mahsulotlarni ko‘radi, qidiradi, buyurtma beradi           |
| **Seller** | Mahsulot qo‘shadi, o‘zgartiradi, o‘chiradi, zaxirasini boshqaradi            |
| **Admin** | Foydalanuvchilar va mahsulotlarni boshqaradi, kategoriyalar yaratadi va o‘chiradi |

---

## 🔑 Asosiy funksiyalar

### 1. 🛡 Autentifikatsiya va avtorizatsiya
- Email va parol orqali ro‘yxatdan o‘tish va tizimga kirish
- JWT yordamida xavfsiz tokenlar
- Har bir roldagi foydalanuvchi uchun alohida huquqlar

### 2. 📦 Mahsulotlar bilan ishlash (Product)
- Sotuvchi mahsulot qo‘shadi: nom, tavsif, narx, rasm(lar), texnik xususiyatlar (specs), zaxira
- Mahsulotlarni qidirish, filtrlash (narx, toifa bo‘yicha)
- Mahsulotlarni ko‘rish, tahrirlash, o‘chirish
- Texnik xususiyatlar (specs) dinamik ro‘yxat ko‘rinishida

### 3. 🗂 Kategoriyalar (Category)
- Admin yangi kategoriyalar yaratadi, tahrirlaydi, o‘chiradi
- Har bir mahsulot kategoriyaga biriktiriladi

### 4. 🛍 Buyurtmalar (Order)
- Foydalanuvchi mahsulot(lar)ni tanlab buyurtma beradi
- Buyurtma holatlari: `pending`, `shipped`, `delivered`, `cancelled`
- Buyurtmaning umumiy summasi avtomatik hisoblanadi

### 5. ⚙ Ma'lumotlarni boshqarish
- Foydalanuvchi shaxsiy profilini ko‘rish va tahrirlash
- Admin foydalanuvchilarni bloklash yoki o‘chirish
- Ma'lumotlar validatsiyasi: email formati, ijobiy narx, mavjud toifa