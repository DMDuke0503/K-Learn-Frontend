-- Show Databases
SHOW DATABASES;

-- Create and Use Database
CREATE DATABASE klearn;
USE klearn;

-- Show Tables
SHOW TABLES;

-- Insert Data into Users Table
INSERT INTO users (avatar, dob, email, fullname, gender, is_deleted, last_login, last_modified, password, role, type, username) 
VALUES 
    ('https://example.com/avatar1.jpg', '1990-05-12', 'user1@example.com', 'John Doe', 'Male', 0, '2024-10-18 16:00:00', '2024-10-18 16:00:00', '$2a$10$somehashedpassword1', 0, 'normal', 'johndoe'),
    ('https://example.com/avatar2.jpg', '1985-07-23', 'user2@example.com', 'Jane Smith', 'Female', 0, '2024-10-18 16:05:00', '2024-10-18 16:05:00', '$2a$10$somehashedpassword2', 0, 'normal', 'janesmith'),
    ('https://example.com/avatar3.jpg', '1992-09-14', 'user3@example.com', 'Alice Johnson', 'Female', 0, '2024-10-18 16:10:00', '2024-10-18 16:10:00', '$2a$10$somehashedpassword3', 1, 'normal', 'alicejohnson'),
    ('https://example.com/avatar4.jpg', '1988-03-30', 'user4@example.com', 'Bob Brown', 'Male', 0, '2024-10-18 16:15:00', '2024-10-18 16:15:00', '$2a$10$somehashedpassword4', 2, 'normal', 'bobbrown'),
    ('https://example.com/avatar5.jpg', '1995-12-01', 'user5@example.com', 'Charlie Davis', 'Male', 0, '2024-10-18 16:20:00', '2024-10-18 16:20:00', '$2a$10$somehashedpassword5', 0, 'normal', 'charliedavis');

-- Show Users Data
SELECT * FROM users;

-- Insert Data into Courses Table
INSERT INTO courses (course_name, course_level, course_description, course_image, course_price, created_at, last_modified, is_deleted)
VALUES
    ('Tiếng Hàn Sơ Cấp', 'Beginner', 
     CONCAT('Khóa học này giúp người mới bắt đầu học tiếng Hàn xây dựng nền tảng từ vựng vững chắc thông qua các chủ đề quen thuộc như: Gia đình, ẩm thực, trường học, nghề nghiệp, và mua sắm.\n',
     '- Phương pháp học: Từ vựng được chia theo chủ đề, kết hợp hình ảnh, âm thanh và ví dụ minh họa để học viên dễ ghi nhớ.\n',
     '- Tương tác và luyện tập: Bài tập và quiz sau mỗi bài học giúp củng cố kiến thức và luyện phát âm chuẩn.\n',
     '- Tham gia ngay để nắm vững hơn 500 từ vựng cơ bản và tự tin giao tiếp tiếng Hàn!'),
     'https://example.com/han_beginner.jpg', 
     28.00, 
     NOW(), 
     NOW(), 
     0),
     
    ('Tiếng Hàn Trung Cấp', 'Intermediate', 
     CONCAT('Khóa học này mở rộng từ vựng và ngữ pháp, giúp học viên phát triển kỹ năng nghe, nói, đọc, viết ở mức độ phức tạp hơn. Học viên sẽ học cách diễn đạt ý tưởng rõ ràng hơn trong các tình huống giao tiếp đa dạng.\n',
     '- Học viên sẽ tiếp cận phương pháp học kết hợp giữa lý thuyết và thực hành.\n',
     '- Bài học bao gồm các chủ đề ngữ pháp trung cấp, bài tập đọc hiểu, và các bài luyện nghe từ các đoạn hội thoại thực tế, giúp cải thiện kỹ năng giao tiếp đa dạng hơn.'),
     'https://example.com/han_intermediate.jpg', 
     30.00, 
     NOW(), 
     NOW(), 
     0),
     
    ('Tiếng Hàn Cao Cấp', 'Advanced', 
     CONCAT('Khóa học dành cho những người muốn nâng cao trình độ thông thạo tiếng Hàn. Học viên sẽ học cách sử dụng ngữ pháp nâng cao, viết luận, phân tích văn bản, và thảo luận các chủ đề xã hội, văn hóa một cách chuyên sâu và tự tin.\n',
     '- Tập trung vào các bài tập đọc và viết chuyên sâu.\n',
     '- Phương pháp phân tích văn bản, thảo luận nhóm, và viết luận.\n',
     '- Học viên cũng sẽ thực hành nghe và nói qua các bài thuyết trình và các buổi thảo luận trực tiếp về các vấn đề xã hội và văn hóa.'),
     'https://example.com/han_advanced.jpg', 
     33.00, 
     NOW(), 
     NOW(), 
     0);

-- Show Courses Data
SELECT * FROM courses;

-- Insert Data into Vocabulary Topic Table
INSERT INTO vocabulary_topic (topic_name, topic_description, topic_image, created_at, last_modified, is_deleted, course_id)
VALUES
    ('Trường học', 
     'Học từ vựng về lớp học, giáo viên, sách vở, và hoạt động trường học với hình ảnh minh họa và phát âm chuẩn, giúp dễ ghi nhớ và sử dụng trong giao tiếp hằng ngày.', 
     'https://example.com/school_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
	 1),

    ('Gia đình', 
     'Tìm hiểu từ vựng về các thành viên trong gia đình, mối quan hệ, và hoạt động gia đình, kèm theo hình ảnh minh họa và phát âm chuẩn để ghi nhớ và sử dụng dễ dàng trong giao tiếp hằng ngày.', 
     'https://example.com/family_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     1),

    ('Mua sắm', 
     'Làm quen với từ vựng liên quan đến sản phẩm, giá cả, và các cụm từ thông dụng khi mua sắm, giúp bạn giao tiếp tự tin trong các tình huống thực tế.', 
     'https://example.com/shopping_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     1),

    ('Du lịch', 
     'Làm quen với từ vựng liên quan đến các địa điểm du lịch, dịch vụ, và các cụm từ thông dụng trong các tình huống du lịch.', 
     'https://example.com/travel_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     1),

    ('Ngân hàng', 
     'Tìm hiểu từ vựng liên quan đến các dịch vụ ngân hàng, giao dịch, và các cụm từ thường dùng khi giao dịch tài chính.', 
     'https://example.com/banking_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     1),

    ('Ẩm Thực', 
     'Khám phá từ vựng về các món ăn, nguyên liệu, và phong cách ẩm thực từ nhiều quốc gia khác nhau, giúp bạn tự tin gọi món và hiểu thực đơn khi đi ăn ngoài.', 
     'https://example.com/food_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     2),

    ('Thời Trang', 
     'Học từ vựng về quần áo, phụ kiện, và xu hướng thời trang, giúp bạn giao tiếp tự tin khi mua sắm hoặc tham gia các sự kiện thời trang.', 
     'https://example.com/fashion_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     2),

    ('Công Nghệ', 
     'Tìm hiểu từ vựng liên quan đến công nghệ thông tin, các thiết bị điện tử, và thuật ngữ chuyên ngành, giúp bạn dễ dàng hiểu các tài liệu và trao đổi về công nghệ.', 
     'https://example.com/technology_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     2),

    ('Sức Khỏe', 
     'Làm quen với từ vựng về cơ thể con người, các loại bệnh và triệu chứng, cũng như các lời khuyên về sức khỏe để có thể giao tiếp tự tin trong các tình huống y tế.', 
     'https://example.com/health_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     2),

    ('Thể Thao', 
     'Khám phá từ vựng liên quan đến các môn thể thao, dụng cụ và trang thiết bị thể thao, giúp bạn giao tiếp tự tin trong các cuộc trò chuyện về thể thao.', 
     'https://example.com/sports_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     2),

    ('Nghệ Thuật', 
     'Tìm hiểu các từ vựng liên quan đến âm nhạc, hội họa, và điện ảnh, giúp bạn có thể tham gia các cuộc trò chuyện về nghệ thuật một cách tự tin.', 
     'https://example.com/art_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     2),

    ('Giải Trí', 
     'Khám phá từ vựng về các hoạt động giải trí, trò chơi, và phim ảnh, giúp bạn thư giãn và giao tiếp tốt hơn về các chủ đề giải trí.', 
     'https://example.com/entertainment_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     2),

    ('Tài Chính', 
     'Tìm hiểu từ vựng liên quan đến tài chính, đầu tư, và thị trường chứng khoán, giúp bạn hiểu rõ hơn về lĩnh vực tài chính và kinh doanh.', 
     'https://example.com/finance_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     3),

    ('Chính Trị', 
     'Làm quen với các thuật ngữ chính trị, từ vựng liên quan đến các chính sách và quan điểm xã hội, giúp bạn tham gia vào các cuộc thảo luận chính trị một cách tự tin.', 
     'https://example.com/politics_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     3),

    ('Văn Hóa', 
     'Khám phá từ vựng liên quan đến phong tục, lễ hội, và văn hóa các quốc gia, giúp bạn hiểu và trao đổi về văn hóa một cách sâu sắc.', 
     'https://example.com/culture_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     3),

    ('Môi Trường', 
     'Học từ vựng liên quan đến các vấn đề môi trường, biến đổi khí hậu, và bảo vệ thiên nhiên, giúp bạn tham gia vào các cuộc thảo luận về môi trường.', 
     'https://example.com/environment_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     3),

    ('Kinh Doanh', 
     'Tìm hiểu từ vựng về kinh doanh, các chiến lược marketing, và kỹ năng đàm phán, giúp bạn tự tin trong các cuộc trao đổi về lĩnh vực kinh doanh.', 
     'https://example.com/business_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     3),

    ('Khoa Học', 
     'Khám phá từ vựng về các lĩnh vực khoa học như vật lý, hóa học, và sinh học, giúp bạn hiểu rõ hơn về các tài liệu khoa học và các cuộc thảo luận liên quan.', 
     'https://example.com/science_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     3),

    ('Du Học', 
     'Làm quen với các thuật ngữ liên quan đến cuộc sống du học, các kỳ thi ngôn ngữ, và các thủ tục cần thiết khi du học nước ngoài.', 
     'https://example.com/study_abroad_topic.jpg', 
     NOW(), 
     NOW(), 
     0, 
     3);

-- Show Vocabulary Topic Data
SELECT * FROM vocabulary_topic;


-- Vocabulary 
INSERT INTO vocabulary (word, definition, transcription, image, last_modified, is_deleted, topic_id)
VALUES
    -- For topic 'Trường học' (topic_id = 1)
    ('교실', 'Phòng học', 'gyo-sil', 'https://example.com/classroom.jpg', NOW(), 0, 1),
    ('책', 'Sách', 'chaek', 'https://example.com/book.jpg', NOW(), 0, 1),
    ('연필', 'Bút chì', 'yeon-pil', 'https://example.com/pencil.jpg', NOW(), 0, 1),
    ('칠판', 'Bảng', 'chil-pan', 'https://example.com/blackboard.jpg', NOW(), 0, 1),
    ('학생', 'Học sinh', 'hak-saeng', 'https://example.com/student.jpg', NOW(), 0, 1),
    
    -- For topic 'Gia đình' (topic_id = 2)
    ('어머니', 'Mẹ', 'eo-meo-ni', 'https://example.com/mother.jpg', NOW(), 0, 2),
    ('아버지', 'Bố', 'a-beo-ji', 'https://example.com/father.jpg', NOW(), 0, 2),
    ('형제', 'Anh em', 'hyeong-je', 'https://example.com/siblings.jpg', NOW(), 0, 2),
    ('할아버지', 'Ông', 'hal-a-beo-ji', 'https://example.com/grandfather.jpg', NOW(), 0, 2),
    ('할머니', 'Bà', 'hal-meo-ni', 'https://example.com/grandmother.jpg', NOW(), 0, 2),
    
    -- For topic 'Mua sắm' (topic_id = 3)
    ('가격', 'Giá cả', 'ga-gyeok', 'https://example.com/price.jpg', NOW(), 0, 3),
    ('쇼핑몰', 'Trung tâm mua sắm', 'syo-ping-mol', 'https://example.com/shopping_mall.jpg', NOW(), 0, 3),
    ('상품', 'Sản phẩm', 'sang-pum', 'https://example.com/product.jpg', NOW(), 0, 3),
    ('할인', 'Giảm giá', 'hal-in', 'https://example.com/discount.jpg', NOW(), 0, 3),
    ('영수증', 'Hóa đơn', 'yeong-su-jeung', 'https://example.com/receipt.jpg', NOW(), 0, 3),
    
    -- For topic 'Du lịch' (topic_id = 4)
    ('호텔', 'Khách sạn', 'ho-tel', 'https://example.com/hotel.jpg', NOW(), 0, 4),
    ('비행기', 'Máy bay', 'bi-haeng-gi', 'https://example.com/airplane.jpg', NOW(), 0, 4),
    ('관광지', 'Địa điểm du lịch', 'gwan-gwang-ji', 'https://example.com/tourist_spot.jpg', NOW(), 0, 4),
    ('지도', 'Bản đồ', 'ji-do', 'https://example.com/map.jpg', NOW(), 0, 4),
    ('여권', 'Hộ chiếu', 'yeo-gwon', 'https://example.com/passport.jpg', NOW(), 0, 4),
    
    -- For topic 'Ngân hàng' (topic_id = 5)
    ('계좌', 'Tài khoản ngân hàng', 'gye-jwa', 'https://example.com/account.jpg', NOW(), 0, 5),
    ('이자', 'Lãi suất', 'i-ja', 'https://example.com/interest_rate.jpg', NOW(), 0, 5),
    ('환전', 'Đổi tiền', 'hwan-jeon', 'https://example.com/currency_exchange.jpg', NOW(), 0, 5),
    ('대출', 'Cho vay', 'dae-chul', 'https://example.com/loan.jpg', NOW(), 0, 5),
    ('송금', 'Chuyển tiền', 'song-geum', 'https://example.com/remittance.jpg', NOW(), 0, 5),
    
    -- For topic 'Ẩm Thực' (topic_id = 6)
    ('음식', 'Thức ăn', 'eum-sik', 'https://example.com/food.jpg', NOW(), 0, 6),
    ('요리', 'Nấu ăn', 'yo-ri', 'https://example.com/cooking.jpg', NOW(), 0, 6),
    ('메뉴', 'Thực đơn', 'me-nyu', 'https://example.com/menu.jpg', NOW(), 0, 6),
    ('맛있다', 'Ngon', 'mas-iss-da', 'https://example.com/tasty.jpg', NOW(), 0, 6),
    ('식당', 'Nhà hàng', 'sik-dang', 'https://example.com/restaurant.jpg', NOW(), 0, 6),
    
    -- For topic 'Thời Trang' (topic_id = 7)
    ('옷', 'Quần áo', 'ot', 'https://example.com/clothes.jpg', NOW(), 0, 7),
    ('구두', 'Giày', 'gu-du', 'https://example.com/shoes.jpg', NOW(), 0, 7),
    ('모자', 'Mũ', 'mo-ja', 'https://example.com/hat.jpg', NOW(), 0, 7),
    ('패션', 'Thời trang', 'pae-syon', 'https://example.com/fashion.jpg', NOW(), 0, 7),
    ('악세사리', 'Phụ kiện', 'ak-se-sa-ri', 'https://example.com/accessory.jpg', NOW(), 0, 7),
    
    -- For topic 'Công Nghệ' (topic_id = 8)
    ('컴퓨터', 'Máy tính', 'keom-pyu-teo', 'https://example.com/computer.jpg', NOW(), 0, 8),
    ('스마트폰', 'Điện thoại thông minh', 'seu-ma-teu-pon', 'https://example.com/smartphone.jpg', NOW(), 0, 8),
    ('소프트웨어', 'Phần mềm', 'so-peu-teu-weo', 'https://example.com/software.jpg', NOW(), 0, 8),
    ('프린터', 'Máy in', 'peu-rin-teo', 'https://example.com/printer.jpg', NOW(), 0, 8),
    ('인터넷', 'Internet', 'in-teo-net', 'https://example.com/internet.jpg', NOW(), 0, 8),
    
    -- For topic 'Sức Khỏe' (topic_id = 9)
    ('병원', 'Bệnh viện', 'byeong-won', 'https://example.com/hospital.jpg', NOW(), 0, 9),
    ('약국', 'Nhà thuốc', 'yak-guk', 'https://example.com/pharmacy.jpg', NOW(), 0, 9),
    ('의사', 'Bác sĩ', 'ui-sa', 'https://example.com/doctor.jpg', NOW(), 0, 9),
    ('환자', 'Bệnh nhân', 'hwan-ja', 'https://example.com/patient.jpg', NOW(), 0, 9),
    ('치료', 'Điều trị', 'chi-ryo', 'https://example.com/treatment.jpg', NOW(), 0, 9);
    
-- Display the inserted dataW
SELECT * FROM vocabulary;