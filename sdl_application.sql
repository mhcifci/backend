-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 13, 2023 at 11:33 PM
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
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `description` text NOT NULL,
  `country` varchar(55) NOT NULL COMMENT 'Bakılacak',
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

INSERT INTO `listings` (`id`, `user_id`, `category_id`, `description`, `country`, `is_active`, `max_apply`, `show_fee`, `is_deleted`, `created_at`, `updated_at`) VALUES
(3, 15, 1, 'Lorem ipsum set amet dolor', 'RM 177', 1, 3, 8, 0, '2023-11-08 17:14:00', '2023-11-08 17:14:00'),
(5, 15, 1, 'Lorem ipsum set amet dolor', 'RM 177', 1, 3, 8, 0, '2023-11-08 18:03:03', '2023-11-08 18:03:03');

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
(2, 8, 3, '2023-11-13 21:43:29', '2023-11-13 21:43:29'),
(3, 8, 5, '2023-11-13 21:43:29', '2023-11-13 21:43:29');

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
(15, 'Emre', 'Kara', '5338350024', '90', '$2b$10$XWNpHPsLHsurafzWVGcaBerKxEE.c8Xr/OyTzOO2cHdwhTGr//FoK', 'mhcifci@gmail2.com', 1, '2023-11-03 16:56:43', '2023-11-03 16:56:43'),
(16, 'Emre', 'Kara', '5338350025', '90', '$2b$10$Pp2Qp11wu6Uj4zSDyXWIruOd.KaoVTmfAaICHyg8P4nBWzBGHt7L6', 'mhcifci@gmail3.com', 1, '2023-11-13 23:04:19', '2023-11-13 23:04:19'),
(17, 'Yeni', 'Kullanıcı', '5338350026', '90', '$2b$10$guCejIXOxwcmJuTep4bnSurB.LazoATtCGvHSJ0SctNidKFQwdKpy', 'apply.cifci@gmail.com', 1, '2023-11-13 23:14:17', '2023-11-13 23:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `img_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(2, 'qwewqe55', 15, '2023-11-03 18:24:21', '2023-11-03 18:24:31');

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
(24, 16, 30, 4, '2023-11-13 23:08:37', '2023-11-13 23:08:37'),
(25, 16, 31, 5, '2023-11-13 23:08:52', '2023-11-13 23:08:52'),
(28, 18, 32, 3, '2023-11-13 23:12:44', '2023-11-13 23:12:44'),
(29, 20, 33, 3, '2023-11-13 23:12:50', '2023-11-13 23:12:50');

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
(28, 16, 1000, 'test', '2023-11-13 23:07:42', '2023-11-13 23:07:42'),
(30, 16, -8, 'Listing View Fee #4', '2023-11-13 23:08:37', '2023-11-13 23:08:37'),
(31, 16, -8, 'Listing View Fee #5', '2023-11-13 23:08:52', '2023-11-13 23:08:52'),
(32, 16, -8, 'Listing View Fee #3', '2023-11-13 23:08:53', '2023-11-13 23:08:53'),
(33, 16, -8, 'Listing View Fee #3', '2023-11-13 23:12:50', '2023-11-13 23:12:50');

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
(3, 15, '15_5ef9ec05-a73d-4155-b83e-ee702723e86b.png', NULL, '2023-11-09 18:07:21', '2023-11-09 18:07:21'),
(4, 15, '15_93a4eeeb-cb75-4a1d-973e-1f2a9250b45b.png', NULL, '2023-11-09 18:07:22', '2023-11-09 18:07:22'),
(5, 15, '15_b3feafc3-9389-4130-8d8f-f92010ab8bf3.png', NULL, '2023-11-09 18:07:23', '2023-11-09 18:07:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_fcm_tokens`
--
ALTER TABLE `user_fcm_tokens`
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
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_fcm_tokens`
--
ALTER TABLE `user_fcm_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_opened_listings`
--
ALTER TABLE `user_opened_listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user_transactions`
--
ALTER TABLE `user_transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `user_uploaded_files`
--
ALTER TABLE `user_uploaded_files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
