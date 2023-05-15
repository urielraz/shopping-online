-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2023 at 09:46 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_online`
--
CREATE DATABASE IF NOT EXISTS `shop_online` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `shop_online`;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `id`, `date`) VALUES
(6, 7777, '2023-04-28'),
(9, 1111, '2023-04-04'),
(15, 7777, '2023-05-12'),
(16, 7777, '2023-05-12'),
(20, 2222, '2023-05-13'),
(21, 2222, '2023-05-13'),
(22, 1234, '2023-05-13'),
(23, 1111, '2023-05-13'),
(24, 1111, '2023-05-13'),
(25, 1111, '2023-05-13'),
(26, 1111, '2023-05-13'),
(27, 1111, '2023-05-13'),
(28, 9999, '2023-05-13');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'snacks'),
(2, 'Drinks'),
(3, 'alcohol'),
(4, 'pastries'),
(5, 'Toiletries');

-- --------------------------------------------------------

--
-- Table structure for table `items_of_cart`
--

CREATE TABLE `items_of_cart` (
  `item_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `general_price` decimal(10,2) NOT NULL,
  `cart_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `items_of_cart`
--

INSERT INTO `items_of_cart` (`item_id`, `product_id`, `quantity`, `general_price`, `cart_id`) VALUES
(153, 14, 1, '4.50', 6),
(154, 15, 1, '5.00', 6),
(155, 5, 1, '305.00', 6),
(163, 6, 1, '5.50', 9),
(164, 4, 4, '18.00', 16),
(165, 5, 10, '3050.00', 16),
(167, 5, 2, '610.00', 20),
(171, 6, 3, '16.50', 21),
(172, 4, 1, '4.50', 23),
(173, 6, 1, '5.50', 24),
(174, 17, 1, '14.00', 25),
(175, 4, 1, '4.50', 26),
(176, 14, 1, '4.50', 26),
(177, 15, 1, '5.00', 26),
(178, 18, 1, '100.00', 27),
(179, 5, 5, '1525.00', 27),
(180, 4, 1, '4.50', 28);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `final_price` decimal(10,2) NOT NULL,
  `city` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL,
  `date_delivery` date NOT NULL,
  `date_order` date NOT NULL,
  `credit_card` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `cart_id`, `final_price`, `city`, `street`, `date_delivery`, `date_order`, `credit_card`) VALUES
(5, 7777, 6, '208.00', 'elad', '7777', '2023-05-06', '2023-04-30', 42442),
(7, 7777, 15, '4.50', 'kiryat ata', 'sad', '2023-05-17', '2023-05-12', 9999),
(8, 1111, 9, '5.50', 'Danya beach', 'בן יהודה', '2023-05-23', '2023-05-12', 5555),
(9, 7777, 16, '3068.00', 'asdad', 'asdasd', '2023-06-01', '2023-05-12', 2222),
(10, 2222, 20, '610.00', '2222', '2222', '2023-06-01', '2023-05-13', 3333),
(11, 1111, 23, '4.50', '1111', '1111', '2023-05-13', '2023-05-13', 8888),
(12, 1111, 24, '5.50', '1111', '1111', '2023-05-13', '2023-05-13', 9999),
(13, 1111, 25, '14.00', '1111', '1111', '2023-05-13', '2023-05-13', 5555),
(14, 1111, 26, '14.00', '1111', '1111', '2023-05-13', '2023-05-13', 6666),
(15, 9999, 28, '4.50', '1111', '9999', '2023-05-11', '2023-05-13', 5555);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `product_category` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_category`, `price`, `imageName`) VALUES
(4, 'bisely-smoke!', 1, '4.50', '1d1c3092-e204-4289-8b8d-84d81027f180.jpg'),
(5, 'viski macallan', 3, '305.00', 'c79bcafb-48b2-4151-9adc-9fc749f7dbb2.jfif'),
(6, 'coka-cola', 2, '5.50', 'f26444ec-1289-4da4-8a2b-bca36af6d47a.jfif'),
(8, 'pepsi', 2, '6.00', '56f49585-9191-4020-bf3f-ba4fe175ed3a.png'),
(9, 'fuze-tea', 2, '6.00', '8d806d8f-53f9-460f-ad8e-3a3b4ad8bf4f.jpg'),
(10, 'מים בטעמים - אבטיח', 2, '6.00', '2a40ca84-0aa7-429d-aa3a-38980c902806.jpg'),
(11, 'פריגת - תפוזים', 2, '6.00', 'a8800262-98c4-47f0-9466-35cc6cd59978.jfif'),
(14, 'במבה', 1, '4.50', '85c71c34-ba5e-45c5-ad87-8cee2b449522.webp'),
(15, 'במבה נוגט', 1, '5.00', '5ee91ea4-3ed4-4178-aba2-763e17515066.jfif'),
(16, 'תחליב רחצה פלמוליב', 5, '13.50', 'f1e0518c-9b39-4e8b-8a9c-12a2a34aa40b.webp'),
(17, 'לחם שיבולת שועל', 4, '14.00', '5d9856fa-846f-45c1-8079-fd6fdfba5690.webp'),
(18, 'טקילה', 3, '100.00', '8737b9d3-ee42-44d7-9bed-c74dd5813e40.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(225) NOT NULL,
  `city` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `city`, `street`, `role`) VALUES
(1111, '1111', '1111', '1111', '11c0a09bfc33d6e12f3cf234f5a75cc1c565d8a453ba1143dd2e3377acd9c62e5ea0ba59a9a90291fc5cc2d87a9b477cfaf34aaae7d156aa6b116d2251b9f771', '1111', '1111', 'User'),
(1234, '1234', '1234', '1234', '1679c29af0161bf215a24d11d0f1035c96bf3940ab56b9af7c10333804b8e804a61af2cf39792298636ab43700422727ecbdc30244a6d60e68a1a76f760bd0fc', '1234', '1234', 'Admin'),
(2222, '2222', '2222', '2222', 'f30203b270ceb7c0726cd6b04fb1bc2a6f28c0f4bf305b46049917f03b6006a71f389d70de8b7be70726dc0a1484c6d547386e943575c9501ac17cf743800956', '2222', '2222', 'User'),
(4321, 'uriel', 'raz', '4321', '36747792017386622ee1a09b13a171b1e9e3d217463282faaa26b7a9df428194c04cb611dba2e9f9a17bc1161bd0a3ff36c1107574380db843d4a46ed7e1be8c', 'bat-yam', 'yehuda', 'User'),
(6666, '6666', '6666', '6666', '2b578cd54fba4405311088e18ee61c81a0ee23247531cc87ed630eac32febc0e5624afb53b605be2c96b205d0e9c77a2e250a9456f251ca6d23271a0e6fb5678', 'TLV', 'בן יהודה', 'User'),
(7777, '7777', '7777', '7777', '2427790d9ae398d26f2eebaa7916886820ef78511e6e7c80f2b01b9f15d9c64faf8c6dffd005f50b00cc852a61deb3a5f0ed7adf12bff430eeaeee4909e97f7d', '7777', '7777', 'User'),
(8888, '8888', '8888', '8888', 'd1d716a564bb6e28fe485ccd40974c7c87adaeef07e8874a7cef135ef5250750ebd7f76b2f47f49bb9bf84baa06ca4ae85f1e35549b1d4c043e5261a0a4eb51b', '8888', '8888', 'User'),
(9999, '9999', '9999', '9999', 'be0cc4778fdde217c08f33f9005c50ebe66e117473c1f723998cba12c45db3a743c9c81d6d88592e71470f2406a9be84160a7a4b2442ca584c3883ff817d8944', 'Bat-Yam', '9999', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `id` (`id`),
  ADD KEY `user_id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `id_3` (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `items_of_cart`
--
ALTER TABLE `items_of_cart`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `item_category` (`product_category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `items_of_cart`
--
ALTER TABLE `items_of_cart`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Constraints for table `items_of_cart`
--
ALTER TABLE `items_of_cart`
  ADD CONSTRAINT `items_of_cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `items_of_cart_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`product_category`) REFERENCES `categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
