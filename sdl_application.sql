-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 24, 2023 at 09:57 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sdl_application`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `company_phone` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `description` text NOT NULL,
  `country` varchar(55) NOT NULL COMMENT 'Bakılacak',
  `is_active` tinyint NOT NULL,
  `show_fee` int NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `user_id`, `category_id`, `description`, `country`, `is_active`, `show_fee`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 15, 1, 'Test iş ilanı', 'RM 177', 1, 0, 0, '2023-11-18 00:14:03', NULL),
(3, 15, 1, 'Lorem ipsum set amet dolor', 'RM 177', 0, 0, 0, '2023-11-18 01:07:35', '2023-11-18 01:07:35'),
(4, 18, 1, 'Lorem ipsum set amet dolor', 'RM 177', 0, 0, 0, '2023-11-18 17:32:08', '2023-11-18 17:32:08');

-- --------------------------------------------------------

--
-- Table structure for table `jobs_categories`
--

CREATE TABLE `jobs_categories` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jobs_categories`
--

INSERT INTO `jobs_categories` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Truck Driver', 'Truck drivers are listed here', '2023-11-18 00:13:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `description` text NOT NULL,
  `country` varchar(55) NOT NULL COMMENT 'Bakılacak',
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `is_active` tinyint NOT NULL,
  `max_apply` int NOT NULL,
  `show_fee` int NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `user_id`, `category_id`, `description`, `country`, `latitude`, `longitude`, `is_active`, `max_apply`, `show_fee`, `is_deleted`, `created_at`, `updated_at`) VALUES
(9, 15, 1, 'Lorem ipsum set amet dolor', 'RM 177', 51.7923246977375, 0.629834723775309, 1, 3, 8, 0, '2023-11-08 18:03:03', '2023-11-08 18:03:03');

-- --------------------------------------------------------

--
-- Table structure for table `listings_categories`
--

CREATE TABLE `listings_categories` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `listings_categories`
--

INSERT INTO `listings_categories` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Test', 'Test açıklama', '2023-11-13 23:29:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `listings_include_files`
--

CREATE TABLE `listings_include_files` (
  `id` int NOT NULL,
  `listing_id` int NOT NULL,
  `file_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `listings_include_files`
--

INSERT INTO `listings_include_files` (`id`, `listing_id`, `file_id`, `created_at`, `updated_at`) VALUES
(1, 8, 2, '2023-11-13 21:43:29', '2023-11-13 21:43:29'),
(2, 5, 3, '2023-11-13 21:43:29', '2023-11-13 21:43:29'),
(3, 5, 5, '2023-11-13 21:43:29', '2023-11-13 21:43:29');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` enum('PENDING','COMPLETED','CANCELLED') NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `title`, `description`, `price`, `img`, `created_at`, `updated_at`) VALUES
(1, 'Test Credit Package', 'Credit package description', '10.00', NULL, '2023-11-24 21:27:35', '2023-11-24 21:27:35');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('PROCESSED','FAILED','REFUNDED') NOT NULL,
  `provider_response` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `transaction_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `country_code` varchar(5) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` tinyint NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `phone`, `country_code`, `password`, `email`, `is_active`, `created_at`, `updated_at`) VALUES
(15, 'Emre', 'Kara', '5338350024', '90', '$2b$10$xceFVgSl3W.jLCbaRJ.ZIurO5wrPq6N5Gsx521Ms5y03OtoJ6vgkG', 'mhcifci@gmail2.com', 1, '2023-11-03 16:56:43', '2023-11-18 19:37:39'),
(16, 'Emre', 'Kara', '5338350025', '90', '$2b$10$Pp2Qp11wu6Uj4zSDyXWIruOd.KaoVTmfAaICHyg8P4nBWzBGHt7L6', 'mhcifci@gmail3.com', 1, '2023-11-13 23:04:19', '2023-11-13 23:04:19'),
(17, 'Yeni', 'Kullanıcı', '5338350026', '90', '$2b$10$R9JQ1KJWgcZCHmuSXMD8aeIFKNOHtGlsG8LyjZVf97KgFT1X49R3S', 'apply.cifci@gmail.com', 1, '2023-11-13 23:14:17', '2023-11-18 16:14:02'),
(18, 'Yeni', 'Kullanıcı', '5338350028', '90', '$2b$10$AlD7OQ4ZMmgKGzSKqMFPxeQqPcTtQyPqqYPgH4uDmpZhFQ.I3B4s6', 'apply.cifci44@gmail.com', 1, '2023-11-17 22:16:04', '2023-11-17 22:16:04');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `img_id` int NOT NULL,
  `preffered_post_code` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `preffered_max_mile` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `img_id`, `preffered_post_code`, `preffered_max_mile`) VALUES
(1, 15, 22, 'SW1W 0NY', 50);

-- --------------------------------------------------------

--
-- Table structure for table `user_fcm_tokens`
--

CREATE TABLE `user_fcm_tokens` (
  `id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_fcm_tokens`
--

INSERT INTO `user_fcm_tokens` (`id`, `token`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 'yeni', 15, '2023-11-03 18:24:21', '2023-11-18 16:16:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_follow_listings`
--

CREATE TABLE `user_follow_listings` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `listing_id` int NOT NULL,
  `is_following` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_follow_listings`
--

INSERT INTO `user_follow_listings` (`id`, `user_id`, `listing_id`, `is_following`, `created_at`, `updated_at`) VALUES
(1, 16, 5, 1, '2023-11-18 02:00:32', NULL),
(3, 15, 5, 0, '2023-11-18 02:00:32', NULL),
(12, 18, 5, 1, '2023-11-18 19:27:53', '2023-11-18 19:27:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_lost_passwords`
--

CREATE TABLE `user_lost_passwords` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `code` varchar(15) NOT NULL,
  `is_used` tinyint NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_lost_passwords`
--

INSERT INTO `user_lost_passwords` (`id`, `user_id`, `code`, `is_used`, `created_at`, `updated_at`) VALUES
(7, 17, '601555', 1, '2023-11-17 23:08:47', '2023-11-17 23:09:20'),
(8, 17, '890597', 1, '2023-11-18 16:11:32', '2023-11-18 16:14:02'),
(9, 15, '800463', 1, '2023-11-18 19:37:22', '2023-11-18 19:37:39');

-- --------------------------------------------------------

--
-- Table structure for table `user_opened_jobs`
--

CREATE TABLE `user_opened_jobs` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `transaction_id` int NOT NULL,
  `job_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_opened_jobs`
--

INSERT INTO `user_opened_jobs` (`id`, `user_id`, `transaction_id`, `job_id`, `created_at`, `updated_at`) VALUES
(30, 17, 34, 1, '2023-11-18 00:38:33', '2023-11-18 00:38:33'),
(31, 16, 35, 1, '2023-11-18 00:43:00', '2023-11-18 00:43:00'),
(32, 18, 36, 1, '2023-11-18 16:30:12', '2023-11-18 16:30:12');

-- --------------------------------------------------------

--
-- Table structure for table `user_opened_listings`
--

CREATE TABLE `user_opened_listings` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `transaction_id` int NOT NULL,
  `listing_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_opened_listings`
--

INSERT INTO `user_opened_listings` (`id`, `user_id`, `transaction_id`, `listing_id`, `created_at`, `updated_at`) VALUES
(31, 18, 37, 5, '2023-11-18 16:34:33', '2023-11-18 16:34:33');

-- --------------------------------------------------------

--
-- Table structure for table `user_transactions`
--

CREATE TABLE `user_transactions` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `amount` int NOT NULL,
  `reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_transactions`
--

INSERT INTO `user_transactions` (`id`, `user_id`, `amount`, `reason`, `created_at`, `updated_at`) VALUES
(28, 18, 1000, 'test', '2023-11-13 23:07:42', '2023-11-13 23:07:42'),
(37, 18, -8, 'Listing View Fee #5', '2023-11-18 16:34:33', '2023-11-18 16:34:33');

-- --------------------------------------------------------

--
-- Table structure for table `user_uploaded_files`
--

CREATE TABLE `user_uploaded_files` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_uploaded_files`
--

INSERT INTO `user_uploaded_files` (`id`, `user_id`, `file_url`, `description`, `created_at`, `updated_at`) VALUES
(2, 15, '15_4bc6a410-cd92-4ad7-9617-1445bd72bbd4.png', NULL, '2023-11-09 18:07:18', '2023-11-09 18:07:18'),
(3, 15, '15_1a6af5f1-bc83-495a-b436-307a0bae6e43.png', NULL, '2023-11-09 18:07:21', '2023-11-09 18:07:21'),
(4, 15, '15_93a4eeeb-cb75-4a1d-973e-1f2a9250b45b.png', NULL, '2023-11-09 18:07:22', '2023-11-09 18:07:22'),
(5, 15, '15_1a6af5f1-bc83-495a-b436-307a0bae6e43.png', NULL, '2023-11-09 18:07:23', '2023-11-09 18:07:23'),
(10, 15, '15_7d1f48cb-f6e9-40bb-8819-8bb2ec5f15df.png', 'Profile picture.', '2023-11-14 17:56:17', '2023-11-14 17:56:17'),
(11, 15, '15_25e1875f-99ee-448b-a9ee-c3eb6845cdb3.png', 'Profile picture.', '2023-11-15 16:52:28', '2023-11-15 16:52:28'),
(12, 15, '15_e0dcb62a-bc45-4f72-90c2-2c689c9915da.png', 'Profile picture.', '2023-11-17 21:42:04', '2023-11-17 21:42:04'),
(13, 15, '15_59fd24f2-f135-4dfe-8b90-c810cba42ed6.png', 'Profile picture.', '2023-11-17 21:45:10', '2023-11-17 21:45:10'),
(14, 15, '15_d7144c48-6390-44a7-aa09-9b2a6b25cd9d.png', 'Profile picture.', '2023-11-17 21:49:50', '2023-11-17 21:49:50'),
(15, 15, '15_29eba462-d044-4ab4-b077-c7c9b65ea644.png', 'Profile picture.', '2023-11-17 21:50:26', '2023-11-17 21:50:26'),
(16, 15, '15_a821f64e-2d93-4891-9267-b0935a30a011.png', 'Profile picture.', '2023-11-17 21:52:02', '2023-11-17 21:52:02'),
(17, 15, '15_eb14902b-df50-45ff-85a9-a35abb790489.png', 'Profile picture.', '2023-11-17 21:57:19', '2023-11-17 21:57:19'),
(18, 15, '15_906337a8-54f1-4cf7-88c8-67530735457a.png', NULL, '2023-11-18 16:22:09', '2023-11-18 16:22:09'),
(19, 15, '15_ce1adf54-42ec-4346-af00-13028a33ab42.png', NULL, '2023-11-18 16:22:31', '2023-11-18 16:22:31'),
(20, 15, '15_ff0aa585-3fc1-446e-9231-86a9a1bbff19.png', NULL, '2023-11-18 16:22:34', '2023-11-18 16:22:34'),
(21, 15, '15_1a6af5f1-bc83-495a-b436-307a0bae6e43.png', 'Profile picture.', '2023-11-18 16:56:09', '2023-11-18 16:56:09'),
(22, 15, '15_02ac0d53-860d-45d4-9076-6096a2941079.png', 'Profile picture.', '2023-11-18 19:44:02', '2023-11-18 19:44:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs_categories`
--
ALTER TABLE `jobs_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings_categories`
--
ALTER TABLE `listings_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings_include_files`
--
ALTER TABLE `listings_include_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_fcm_tokens`
--
ALTER TABLE `user_fcm_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_follow_listings`
--
ALTER TABLE `user_follow_listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_lost_passwords`
--
ALTER TABLE `user_lost_passwords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_opened_jobs`
--
ALTER TABLE `user_opened_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_opened_listings`
--
ALTER TABLE `user_opened_listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_transactions`
--
ALTER TABLE `user_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_uploaded_files`
--
ALTER TABLE `user_uploaded_files`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jobs_categories`
--
ALTER TABLE `jobs_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `listings_categories`
--
ALTER TABLE `listings_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `listings_include_files`
--
ALTER TABLE `listings_include_files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_fcm_tokens`
--
ALTER TABLE `user_fcm_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_follow_listings`
--
ALTER TABLE `user_follow_listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_lost_passwords`
--
ALTER TABLE `user_lost_passwords`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_opened_jobs`
--
ALTER TABLE `user_opened_jobs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user_opened_listings`
--
ALTER TABLE `user_opened_listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `user_transactions`
--
ALTER TABLE `user_transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `user_uploaded_files`
--
ALTER TABLE `user_uploaded_files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
