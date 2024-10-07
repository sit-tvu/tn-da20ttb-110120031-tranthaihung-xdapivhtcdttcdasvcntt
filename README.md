# XÂY DỰNG API VÀ HỆ THỐNG CHẤM ĐIỂM TRỰC TUYẾN CHO ĐỒ ÁN SINH VIÊN CNTT

## Tác giả
- **Trần Thái Hưng**
- Lớp: **DA20TTB**

## Giới thiệu
Dự án này xây dựng hệ thống API và giao diện trực tuyến giúp giảng viên chấm điểm đồ án sinh viên CNTT dễ dàng, tự động hóa các quy trình chấm điểm và theo dõi tiến độ.

## Công nghệ sử dụng
- **Backend**: Node.js, Express.js, MySQL, Sequelize, Puppeteer (để tạo PDF)
- **Frontend**: React.js, NextUI, Axios, Tailwind CSS, Ant Design

## Yêu cầu hệ thống
- **Node.js** v18.18.0 hoặc mới hơn
- **npm** v7.x hoặc mới hơn
- **MySQL**

## Hướng dẫn cài đặt
- git clone
- cd backend
- npm i
- cd frontend
- npm i

## Tạo file `.env` cho Backend
Tạo một file `.env` trong thư mục `backend` với nội dung sau:

```env
JWT_SECRET=my_secret_key
DB_NAME=TVU
DB_USER=demo_user
DB_PASSWORD=demo_password
DB_HOST=localhost
DB_DIALECT=mysql
```
### Giải thích các biến môi trường cho Backend

- **`JWT_SECRET`**: Chuỗi bí mật dùng để mã hóa và giải mã JSON Web Token (JWT). 
- **`DB_NAME`**: Tên của cơ sở dữ liệu mà ứng dụng sẽ kết nối tới. 
- **`DB_USER`**: Tên người dùng của cơ sở dữ liệu. 
- **`DB_PASSWORD`**: Mật khẩu cho người dùng cơ sở dữ liệu. 
- **`DB_HOST`**:  Địa chỉ IP hoặc tên miền của máy chủ cơ sở dữ liệu. 
- **`DB_DIALECT`**: Loại cơ sở dữ liệu đang sử dụng. 

## Tạo file `.env` cho 
Tạo một file `.env` trong thư mục `frontend` với nội dung sau:

```env
REACT_APP_APIKEY=AIzaSyCZPdWAoY1kZ3PGy_02JQP4bHe4EAyVn2M
REACT_APP_AUTH_DOMAIN=ploclo-fd713.firebaseapp.com
REACT_APP_PROJECT_ID=ploclo-fd713
REACT_APP_STORAGE_BUCKET=ploclo-fd713.appspot.com
REACT_APP_MESSAGING_SENDER_ID=857065623701
REACT_APP_APP_ID=1:857065623701:web:19f5ea47b15996b4fccb9c
REACT_APP_MEASUREMENT_ID=G-Y40B4ZXLTQ

REACT_APP_API_DOMAIN_CLIENT=http://localhost:1509/api
REACT_APP_API_DOMAIN_ADMIN=http://localhost:1509/api/admin
```
### Giải thích các biến môi trường cho Frontend

- **`REACT_APP_APIKEY`**: Khóa API để kết nối với Firebase.
- **`REACT_APP_AUTH_DOMAIN`**: Miền xác thực Firebase của bạn.
- **`REACT_APP_PROJECT_ID`**: ID của dự án Firebase.
- **`REACT_APP_STORAGE_BUCKET`**: Nơi lưu trữ tệp trong Firebase Storage.
- **`REACT_APP_MESSAGING_SENDER_ID`**: ID người gửi cho Firebase Cloud Messaging.
- **`REACT_APP_APP_ID`**: ID của ứng dụng Firebase.
- **`REACT_APP_MEASUREMENT_ID`**: ID đo lường cho Google Analytics.
- **`REACT_APP_API_DOMAIN_CLIENT`**: Địa chỉ API dành cho người dùng.
- **`REACT_APP_API_DOMAIN_ADMIN`**: Địa chỉ API dành cho quản trị viên.
