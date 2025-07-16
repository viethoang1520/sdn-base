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

V. Nhắc nhở 

  - Chèn middleware vào trước hàm xử lí trong routes/endpoint.js
  - Ref đến tên collections (tên bảng) khi linking, thường nhầm với ref đến model
  - NHỚ AWAIT KHI QUERY DATABASE
  - res.json sau khi CRUD để biết được đã thực hiện thành công hay chưa?

