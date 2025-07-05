I. Cài đặt dependencies

  - npm install

II. Tạo file .env ở thư mục gốc 

  - PORT=3000
  - MONGO_URI=mongodb://localhost:27017/your-db-name
  - SESSION_SECRET_KEY=your-session-secret
  - JWT_SECRET=your-jwt-secret

III. Chạy dự án

  - npm start

IV. Quy trình tạo 1 endpoint

  - Thêm route mới: Tạo file trong src/routes/ và khai báo trong src/routes/index.js.
  - Thêm controller/model: Tạo file trong src/app/controllers/ hoặc src/app/models/.
  - Thêm view: Tạo file .hbs trong src/views/.

V. Nhắc nhở 

  - Debug từ routes/index.js -> routes/endpoint.js -> controller nếu gặp lỗi
  - Chèn middleware vào trước hàm xử lí trong routes/endpoint.js
  - Ref đến tên collections (tên bảng) khi linking, thường nhầm với ref đến model
