-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 26, 2018 lúc 09:38 AM
-- Phiên bản máy phục vụ: 10.1.31-MariaDB
-- Phiên bản PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `adidas`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `postid` int(11) NOT NULL,
  `author` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `body` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giohang`
--

CREATE TABLE `giohang` (
  `ID` int(10) NOT NULL,
  `idtrongbangsp` int(10) NOT NULL,
  `EMAIL` varchar(20) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `giohang`
--

INSERT INTO `giohang` (`ID`, `idtrongbangsp`, `EMAIL`) VALUES
(21, 55, ''),
(58, 18, ''),
(135, 7, ''),
(136, 7, ''),
(138, 12, 'manh11117@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `members`
--

CREATE TABLE `members` (
  `member_id` int(8) NOT NULL,
  `member_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `member_password` varchar(64) NOT NULL,
  `member_email` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `members`
--

INSERT INTO `members` (`member_id`, `member_name`, `member_password`, `member_email`) VALUES
(1, 'vincy', 'e2f3088a505f1ed02e40f5b62550f291', 'user@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `IDSP` int(10) NOT NULL,
  `TENSP` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `NGAYPHATHANH` date NOT NULL,
  `ANH` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ANHHOVER` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ANHCHITIET` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `GENDER` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `AGE` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `GIABAN` int(10) NOT NULL,
  `GIAGOC` int(10) DEFAULT NULL,
  `SALE` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `COLOR` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `COLORDT` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `FRANCHISE` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `PRODUCTTYPE` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `BRAND` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `CATEGORY` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `SPORTS` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `MIADIDAS` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `TEAMNAME` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `PARNER` text COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`IDSP`, `TENSP`, `NGAYPHATHANH`, `ANH`, `ANHHOVER`, `ANHCHITIET`, `GENDER`, `AGE`, `GIABAN`, `GIAGOC`, `SALE`, `COLOR`, `COLORDT`, `FRANCHISE`, `PRODUCTTYPE`, `BRAND`, `CATEGORY`, `SPORTS`, `MIADIDAS`, `TEAMNAME`, `PARNER`) VALUES
(1, 'NMD_R1 PRIMEKNIT SHOES', '2018-05-13', '1.jpg', '1.jpg', '', 'men', '', 170, NULL, '', '', '', 'nmd', '', 'originals', 'shoes', '', '', '', ''),
(2, 'SST TRACK JACKET', '2018-05-13', '2.jpg', '2hover.jpg', '2.jpg', 'men', '', 75, 0, '', '', '', 'adicolor', '', 'originals', '', '', '', '', ''),
(3, 'ULTRABOOST SHOES', '2018-05-13', '3.jpg', '3hover.jpg', '3.jpg', 'men', '', 180, 0, '', '', '', 'ultraboost', '', '', 'shoes', 'running', '', '', ''),
(4, 'POD-S3.1 SHOES', '2018-05-13', '4.jpg', '4hover.jpg', '4.jpg', 'men', '', 30, 0, '', '', '', 'podsystem', '', 'originals', 'shoes', '', '', '', ''),
(5, 'NEMEZIZ 18+ FIRM GROUND CLEATS', '2018-05-13', '5.jpg', '5hover.jpg', '5.jpg', 'men', '', 290, 0, '', '', '', '', '', '', 'shoes', 'soccer', '', '', ''),
(6, 'Harden Vol. 2 MVP Shoes', '2018-05-13', '6.jpg', '6.jpg', '6.jpg', 'men', '', 160, 0, '', '', '', '', '', '', 'shoes', 'basketball', '', '', ''),
(7, '24/7 Shoes', '2018-05-13', '7.jpg', '7hover.jpg', '7.jpg', 'men', '', 100, 0, '', '', '', '', '', '', 'shoes', 'training', '', '', ''),
(8, 'Freak Ultra Primeknit Cleats', '2018-05-13', '8.jpg', '8hover.jpg', '8.jpg', 'men', '', 180, 0, '', '', '', '', '', '', 'shoes', 'football', '', '', ''),
(9, 'adilette Slides', '2018-05-13', '9.jpg', '9hover.jpg', '9.jpg', 'men', '', 45, 0, '', '', '', '', 'slides', 'originals', '', '', '', '', ''),
(10, 'Terrex Swift R2 GTX Shoes', '2018-05-13', '10.jpg', '10hover.jpg', '10.jpg', 'men', '', 135, 0, '', '', '', '', '', '', 'shoes', 'outdoor', '', '', ''),
(11, 'Barricade 2018 Boost Shoes', '2018-05-13', '11.jpg', '11hover.jpg', '11.jpg', 'men', '', 160, 0, '', '', '', '', '', '', 'shoes', 'tennis', '', '', ''),
(12, '3ST.002 Primeknit Shoes', '2018-05-13', '12.jpg', '12hover.jpg', '12.jpg', 'men', '', 150, 0, '', '', '', '', '', '', 'shoes', 'skateboarding', '', '', ''),
(13, 'Icon 4 Trainer Nations Shoes', '2018-05-13', '13.jpg', '13hover.jpg', '13.jpg', 'men', '', 100, 0, '', '', '', '', '', '', 'shoes', 'baseball', '', '', ''),
(14, 'Tour360 Knit Shoes', '2018-05-13', '14.jpg', '14hover.jpg', '14.jpg', 'men', '', 180, 0, '', '', '', '', '', '', 'shoes', 'golf', '', '', ''),
(15, 'Mi Z.N.E Hoddie', '2018-05-13', '15.jpg', '15.jpg', '15.jpg', 'men', '', 120, 0, '', '', '', '', 'hoddie', '', 'hoddie', '', 'customizable', '', ''),
(16, 'Deerupt Runner Shoes', '2018-05-13', '16.jpg', '16hover.jpg', '16.jpg', 'men', '', 70, 100, 'sale', '', '', '', '', 'originals', 'shoes', '', '', '', ''),
(17, 'Tiro 17 Training Pants', '2018-05-13', '17.jpg', '17hover.jpg', '17.jpg', 'men', '', 45, 0, '', '', '', '', 'pants', '', '', 'soccer', '', '', ''),
(18, 'adidas Z.N.E. Hoodie 2', '2018-05-13', '18.jpg', '18hover.jpg', '18.jpg', 'men', '', 100, 0, '', '', '', '', 'hoodies_sweatshirts', 'athletics', '0', '', '', '', ''),
(19, 'ID Jacket', '2018-05-13', '19.jpg', '19hover.jpg', '19.jpg', 'men', '', 85, 0, '', '', '', '', 'jackets', 'athletics', '0', '', '', '', ''),
(20, 'FreeLift Prime Tee', '2018-05-13', '20.jpg', '20hover.jpg', '20.jpg', 'men', '', 25, 0, '', '', '', '', 'short_sleeve_shirts', '', '0', 'training', '', '', ''),
(21, '3-Stripes Tee', '2018-05-13', '21.jpg', '21hover.jpg', '21.jpg', 'men', '', 35, 0, '', '', '', '', 't_shirts', 'originals', '0', '', '', '', ''),
(22, 'Hélas Polo', '2018-05-13', '22.jpg', '22hover.jpg', '22.jpg', 'men', '', 60, 0, '', '', '', '', 'long_sleeve_shirts', 'originals', '0', '', '', '', ''),
(23, 'Climachill Polo Shirt', '2018-05-13', '23.jpg', '23hover.jpg', '23.jpg', 'men', '', 60, 0, '', '', '', '', '', '', 'polo', 'tennis', '', '', ''),
(24, 'Ultimate365 Heather Polo Shirt', '2018-05-13', '24.jpg', '24hover.jpg', '24.jpg', 'men', '', 75, 0, '', '', '', '', '', '', 'polo', 'golf', '', '', ''),
(25, 'Manchester United Home Authentic Jersey', '2018-05-13', '25.jpg', '25hover.jpg', '25.jpg', 'men', '', 130, 0, '', '', '', '', 'jerseys', '', '', 'soccer', '', '', ''),
(26, 'Alphaskin 3/4 Tech Tights', '2018-05-13', '26.jpg', '26hover.jpg', '26.jpg', 'men', '', 60, 0, '', '', '', '', 'tights', '', 'compression', 'training', '', '', ''),
(27, 'Alphaskin Sport Tee', '2018-05-13', '27.jpg', '27hover.jpg', '27.jpg', 'men', '', 30, 0, '', '', '', '', '', '', 'compression', 'training', '', '', ''),
(28, 'Ultimate365 Shorts', '2018-05-13', '28.jpg', '28hover.jpg', '28.jpg', 'men', '', 65, 0, '', '', '', '', 'shorts', '', '', 'golf', '', '', ''),
(29, 'Supernova Singlet', '2018-05-13', '29.jpg', '29hover.jpg', '29.jpg', 'men', '', 45, 0, '', '', '', '', 'tank_tops', '', '0', 'running', '', '', ''),
(30, 'Climacool Boxer Briefs 2 Pairs', '2018-05-13', '30.jpg', '30hover.jpg', '30.jpg', 'men', '', 14, 28, 'sale', '', '', '', 'underwear', '', 'apparel', 'training', '', '', ''),
(31, 'Prime 4 Backpack', '2018-05-13', '31.jpg', '31hover.jpg', '31.jpg', '', '', 65, 0, '', '', '', '', 'bags', '', 'accessories', 'training', '', '', ''),
(32, 'Climacool Tour Cap', '2018-05-13', '32.jpg', '32.jpg', '32.jpg', '', '', 30, 0, '', '', '', '', 'hats', '', 'accessories', 'golf', '', '', ''),
(33, 'Trefoil No-Show Socks 6 Pairs', '2018-05-13', '33.jpg', '33.jpg', '33.jpg', 'men', '', 20, 0, '', '', '', '', 'socks', 'originals', 'accessories', '', '', '', ''),
(34, 'Booklet Case iPhone X Suede', '2018-05-13', '34.jpg', '34.jpg', '34.jpg', '', '', 30, 0, '', '', '', '', 'phone_cases', 'originals', 'accessories', '', '', '', ''),
(35, 'Tempest Sunglasses', '2018-05-13', '35.jpg', '35.jpg', '35.jpg', '', '', 133, 0, '', '', '', '', 'sunglasses', '', 'accessories', 'running', '', '', ''),
(36, 'UCL Finale Kiev Official Game Ball', '2018-05-13', '36.jpg', '36.jpg', '36.jpg', '', '', 165, 0, '', '', '', '', 'balls', '', 'accessories', 'soccer', '', '', ''),
(37, 'DISTRICT_L1 Watch', '2018-05-13', '37.jpg', '37.jpg', '37.jpg', '', '', 130, 0, '', '', '', '', 'watches', 'originals', 'accessories', '', '', '', ''),
(38, 'Predator Pro Gloves', '2018-05-13', '38.jpg', '38.jpg', '38.jpg', 'men', '', 120, 0, '', '', '', '', 'gloves', '', 'accessories', 'soccer', '', '', ''),
(39, 'Argentina Home Scarf', '2018-05-13', '39.jpg', '39.jpg', '39.jpg', 'men', '', 14, 20, 'sale', '', '', '', 'scarves', '', 'accessories', 'soccer', '', '', ''),
(40, 'Powerlift.3.1 Shoes', '2018-05-13', '40.jpg', '40hover.jpg', '40.jpg', 'men', '', 90, 0, '', '', '', '', '', '', '0', 'weightlifting', '', '', ''),
(41, 'Golden Knights Home Authentic Pro Jersey', '2018-05-13', '41.jpg', '41hover.jpg', '41.jpg', 'men', '', 180, 0, '', '', '', '', '', '', '0', 'hockey', '', '', ''),
(42, 'USA Volleyball Replica Tee', '2018-05-13', '42.jpg', '42hover.jpg', '42.jpg', 'men', '', 40, 0, '', '', '', '', '', '', '0', 'volleyball', '', '', ''),
(43, 'Freak Head', '2018-05-13', '43.jpg', '43.jpg', '43.jpg', '', '', 90, 0, '', '', '', '', '', '', '0', 'lacrosse', '', '', ''),
(44, 'ASU Coach Polo', '2018-05-13', '44.jpg', '44.jpg', '44.jpg', 'men', '', 75, 0, '', '', '', '', '', 'athletics', '0', '', '', 'arizona_state_university', ''),
(45, 'TRI VNECK TEE', '2018-05-13', '45.jpg', '45.jpg', '45.jpg', 'women', '', 30, 0, '', '', '', '', '', '', '0', 'football', '', 'arizona_state_university', ''),
(46, 'Kaval Cuffed Pants', '2018-05-13', '46.jpg', '46hover.jpg', '46.jpg', 'women', '', 65, 0, '', '', '', 'podsystem', 'pants', 'originals', '0', '', '', '', ''),
(47, 'Kaval Tee', '2018-05-13', '47.jpg', '47hover.jpg', '47.jpg', 'women', '', 40, 0, '', '', '', 'podsystem', 'tee', 'originals', '0', '', '', '', ''),
(48, 'Kaval Hoodie', '2018-05-13', '48.jpg', '48hover.jpg', '48.jpg', 'women', '', 80, 0, '', '', '', 'podsystem', 'hoddie', 'originals', '0', '', '', '', ''),
(49, '3-Stripes Tee', '2018-05-13', '49.jpg', '49hover.jpg', '49.jpg', 'women', '', 35, 0, '', '', '', 'adicolor', 'tee', 'originals', '0', '', '', '', ''),
(50, 'Ultraboost Shoes', '0000-00-00', '50.jpg', '50hover.jpg', '50.jpg', 'women', '', 180, NULL, '', '', '', 'ultraboost', '', '', 'shoes', 'running', '', '', ''),
(51, 'Arkyn Shoes', '0000-00-00', '51.jpg', '51hover.jpg', '51.jpg', 'women', '', 98, 140, 'sale', '', '', 'arkyn', '', 'originals', 'shoes', '', '', '', ''),
(52, 'CrazyTrain Elite Shoes', '0000-00-00', '52.jpg', '52hover.jpg', '52.jpg', 'women', '', 140, NULL, '', '', '', '', '', '', 'shoes', 'training', '', '', ''),
(53, 'Ultimafusion Shoes', '0000-00-00', '53.jpg', '53hover.jpg', '53.jpg', 'women', '', 75, NULL, '', '', '', '', '', 'essentials', 'shoes', '', '', '', ''),
(54, 'Adilette Slides', '0000-00-00', '54.jpg', '54hover.jpg', '54.jpg', 'women', '', 50, NULL, '', '', '', '', 'slides', 'originals', '', '', '', '', ''),
(55, 'Terrex Choleah Padded Climaproof Boots', '0000-00-00', '55.jpg', '55.jpg', '55.jpg', 'women', '', 130, NULL, '', '', '', '', '', '', 'shoes', 'outdoor', '', '', ''),
(56, 'adidas by Stella McCartney Barricade Boost Shoes', '0000-00-00', '56.jpg', '56hover.jpg', '56.jpg', 'women', '', 130, NULL, '', '', '', '', '', '', 'shoes', 'tennis', '', '', 'adidas-by-stella-mccartney'),
(57, 'Climacool Knit Shoes', '0000-00-00', '57.jpg', '57hover.jpg', '57.jpg', 'women', '', 110, NULL, '', '', '', '', '', '', 'shoes', 'golf', '', '', ''),
(58, 'Predator 18.1 Firm Ground Cleats', '0000-00-00', '58.jpg', '58hover.jpg', '58.jpg', 'women', '', 225, NULL, '', '', '', '', '', '', 'shoes', 'soccer', '', '', ''),
(59, 'Crazyflight X 2.0 Mid Shoes', '0000-00-00', '59.jpg', '59hover.jpg', '59.jpg', 'women', '', 140, NULL, '', '', '', '', '', '', 'shoes', 'volleyball', '', '', ''),
(60, 'Mi Zx Flux Shoes', '0000-00-00', '60.jpg', '60.jpg', '60.jpg', 'women', '', 100, NULL, '', '', '', '', '', 'originals', 'shoes', '', 'customizable', '', ''),
(61, 'Trefoil Hoodie', '0000-00-00', '61.jpg', '61hover.jpg', '61.jpg', 'women', '', 100, NULL, '', '', '', '', 'hoodies_sweatshirts', 'originals', '', '', '', '', ''),
(62, '3-Stripes Leggings', '0000-00-00', '62.jpg', '62hover.jpg', '62.jpg', 'women', '', 40, NULL, '', '', '', '', 'tights', 'originals', 'compression', '', '', '', ''),
(63, 'All Me Strappy Bra', '0000-00-00', '63.jpg', '63hover.jpg', '63.jpg', 'women', '', 25, NULL, '', '', '', '', 'bras', 'originals', '', '', '', '', ''),
(64, 'SST Track Jacket', '0000-00-00', '64.jpg', '64hover.jpg', '64.jpg', 'women', '', 70, NULL, '', '', '', '', 'jackets', 'originals', '', '', '', '', ''),
(65, '3-Stripes Tee', '0000-00-00', '65.jpg', '65hover.jpg', '65.jpg', 'women', '', 35, NULL, '', '', '', '', 'short_sleeve_shirts', 'originals', '', '', '', '', ''),
(66, '3-Stripes Tee', '0000-00-00', '66.jpg', '66hover.jpg', '66.jpg', 'women', '', 40, NULL, '', '', '', '', 'long_sleeve_shirts', 'originals', '', '', '', '', ''),
(67, 'Ultimate365 Polo Shirt', '0000-00-00', '67.jpg', '67hover.jpg', '67.jpg', 'women', '', 60, NULL, '', '', '', '', '', 'originals', 'polo', '', '', '', ''),
(68, 'Skirt', '0000-00-00', '68.jpg', '68hover.jpg', '68.jpg', 'women', '', 25, 50, 'sale', '', '', '', 'dresses_and_skirts', 'originals', 'apparel', '', '', '', ''),
(69, 'M10 Icon Shorts', '0000-00-00', '69.jpg', '69hover.jpg', '69.jpg', 'women', '', 28, NULL, '', '', '', '', 'shorts', 'originals', '', '', '', '', ''),
(70, 'Bra Top', '0000-00-00', '70.jpg', '70hover.jpg', '70.jpg', 'women', '', 35, NULL, '', '', '', '', 'tank_tops', 'originals', '', '', '', '', ''),
(71, '5PK CREATOR PLUS HAIRBAND', '0000-00-00', '71.jpg', '71.jpg', '71.jpg', 'women', '', 14, NULL, '', '', '', '', 'headbands', 'originals', 'accessories', '', '', '', ''),
(72, 'Interval Reversible Headband', '0000-00-00', '72.jpg', '72.jpg', '72.jpg', '', '', 7, NULL, '', '', '', '', 'headbands', 'originals', 'accessories', '', '', '', ''),
(73, 'EQT Socks 1 Pair', '0000-00-00', '73.jpg', '73hover.jpg', '73.jpg', 'women', '', 11, 15, 'sale', '', '', '', 'socks', 'originals', 'accessories', '', '', '', ''),
(74, 'Performance Beanie', '0000-00-00', '74.jpg', '74.jpg', '74.jpg', 'women', '', 9, 18, 'sale', '', '', '', 'beanie', 'originals', 'accessories', '', '', '', ''),
(75, 'Powerlift.3.1 Shoes\r\n', '0000-00-00', '75.jpg', '75hover.jpg', '75.jpg', 'women', '', 90, NULL, '', '', '', '', 'shoes', '', '', 'weightlifting', '', '', ''),
(76, 'Powerlift.3.1 Shoes\r\n', '0000-00-00', '76.jpg', '76hover.jpg', '76.jpg', 'women', '', 90, NULL, '', '', '', '', 'shoes', '', '', 'weightlifting', '', '', ''),
(77, 'Golden Knights Vertical Heather Pullover', '0000-00-00', '77.jpg', '77hover.jpg', '77.jpg', 'women', '', 38, 75, '', '', '', '', '', '', '', 'hockey', '', '', ''),
(78, 'Trefoil Hoodie', '0000-00-00', '78.jpg', '78.jpg', '78.jpg', 'kids', 'youth', 50, NULL, '', '', '', '', 'hodie', 'originals', 'apparel', '', '', '', ''),
(79, 'Trefoil Hoodie Set', '0000-00-00', '79.jpg', '79.jpg', '79.jpg', 'kids', 'youth', 70, NULL, '', '', '', '', '', 'originals', 'apparel', '', '', '', ''),
(80, 'SST Track Jacket', '0000-00-00', '80.jpg', '80.jpg', '80.jpg', 'kids', 'youth', 50, NULL, '', '', '', '', 'jackets', 'originals', 'apparel', '', '', '', ''),
(81, 'Fleece Crew Sweatshirt', '0000-00-00', '81.jpg', '81.jpg', '81.jpg', 'kids', 'youth', 40, NULL, '', '', '', '', 'hoodies_sweatshirts', 'originals', 'apparel', '', '', '', ''),
(82, 'SST Track Pants', '0000-00-00', '82.jpg', '82.jpg', '82.jpg', 'kids', 'youth', 40, NULL, '', '', '', '', 'pants', 'originals', 'apparel', '', '', '', ''),
(83, 'Trefoil Tee', '0000-00-00', '83.jpg', '83.jpg', '83.jpg', 'kids', 'youth', 28, NULL, '', '', '', 'adicolor', 'short_sleeve_shirts', 'originals', 'apparel', '', '', '', ''),
(84, 'Leggings', '0000-00-00', '84.jpg', '84.jpg', '78.jpg', 'kids', 'youth', 26, NULL, '', '', '', '', '', 'originals', 'compression', '', '', '', ''),
(85, 'Mexico Away Jersey', '0000-00-00', '85.jpg', '85.jpg', '78.jpg', 'boys', 'youth', 70, NULL, '', '', '', '', 'jerseys', 'originals', 'apparel', '', '', '', ''),
(86, 'Germany Away Jersey', '0000-00-00', '86.jpg', '86.jpg', '78.jpg', 'boys', 'youth', 70, NULL, '', '', '', '', 'jerseys', 'originals', 'apparel', '', '', '', ''),
(87, 'Ultraboost Shoes', '0000-00-00', '87.jpg', '87.jpg', '78.jpg', 'kids', 'youth', 140, 160, 'sale', '', '', 'ultraboost', '', '', 'shoes', 'running', '', '', ''),
(88, 'POD-S3.1 Shoes', '0000-00-00', '88.jpg', '88.jpg', '78.jpg', 'kids', 'infant_toddler', 50, NULL, '', '', '', 'podsystem', '', 'originals', 'shoes', '', '', '', ''),
(89, 'Three Stripe Life Tee', '0000-00-00', '89.jpg', '89.jpg', '78.jpg', 'girls', 'youth', 25, NULL, '', '', '', '', '', '', 'apparel', 'training', '', '', ''),
(90, '2-in-1 Space Dye Shorts', '0000-00-00', '90.jpg', '90.jpg', '78.jpg', 'girls', 'youth', 28, NULL, '', '', '', '', '', '', 'apparel', 'training', '', '', ''),
(91, 'adidas Z.N.E. Hoodie', '0000-00-00', '91.jpg', '91hover.jpg', '91.jpg', 'women', '', 75, 150, 'sale', '', '', 'zne', 'hodie', '', 'apparel', 'tennis', '', '', ''),
(92, 'adidas Z.N.E. Tee', '0000-00-00', '92.jpg', '92hover.jpg', '92.jpg', 'men', '', 25, 50, 'sale', '', '', 'zne', 'tee', 'athletics', 'apparel', '', '', '', ''),
(93, 'Tubular Shadow Shoes', '0000-00-00', '93.jpg', '93hover.jpg', '93.jpg', 'women', '', 100, 0, '', 'Đen', 'LÕI ĐEN / PHẤN TRẮNG / RỐI HỒNG', 'tubular', '', 'originals', 'shoes', '', '', '', ''),
(94, 'Tubular Shadow Shoes', '0000-00-00', '94.jpg', '94hover.jpg', '94.jpg', 'women', '', 100, 0, '', 'Đỏ', 'CHÚT SẪM / PHẤN TRẮNG / CHẠY TRẮNG', 'tubular', '', 'originals', 'shoes', '', '', '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `ID` int(11) NOT NULL,
  `EMAIL` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `PASSWORD` varchar(20) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `lastname` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `token` char(64) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `expires` bigint(20) NOT NULL,
  `addressname` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `street` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `type` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `citytown` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `state` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `zipcode` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `country` text COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phonenumber` text COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`ID`, `EMAIL`, `PASSWORD`, `name`, `lastname`, `token`, `expires`, `addressname`, `street`, `type`, `citytown`, `state`, `zipcode`, `country`, `phonenumber`) VALUES
(37, 'manh11117@gmail.com', 'Ndm0915827298', 'Mạnh', 'Nguyễn', '4d75f718c11c79c4abcbdafa0e2cd1177dedab659009c5bd43ca91354b7b582b', 0, 'Nhà Riêng', 'TL317', 'Nhà Nghỉ', 'Hòa Bình', 'Hòa Bình', '350000', 'Việt Nam', '0904272299'),
(38, 'dungqr@gmail.com', 'Ntd0915919303', 'Dũng', 'Nguyễn', '', 0, '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `yeuthich`
--

CREATE TABLE `yeuthich` (
  `ID` int(10) UNSIGNED NOT NULL,
  `idtrongbangsp` int(10) NOT NULL,
  `EMAIL` varchar(20) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `yeuthich`
--

INSERT INTO `yeuthich` (`ID`, `idtrongbangsp`, `EMAIL`) VALUES
(1, 2, 'dungqr@gmail.com'),
(204, 93, ''),
(208, 12, 'manh11117@gmail.com');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`IDSP`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `yeuthich`
--
ALTER TABLE `yeuthich`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `giohang`
--
ALTER TABLE `giohang`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `IDSP` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `yeuthich`
--
ALTER TABLE `yeuthich`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
