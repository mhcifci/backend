-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 02, 2024 at 07:21 PM
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
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `is_active` tinyint NOT NULL,
  `show_fee` int NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `user_id`, `category_id`, `description`, `country`, `latitude`, `longitude`, `is_active`, `show_fee`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 16, 1, 'Test iş ilanı', 'RM 177', 0, 0, 1, 0, 0, '2023-11-18 00:14:03', NULL),
(3, 16, 1, 'Lorem ipsum set amet dolor', 'RM 177', 0, 0, 0, 0, 0, '2023-11-18 01:07:35', '2023-11-18 01:07:35'),
(4, 18, 1, 'Lorem ipsum set amet dolor', 'RM 177', 0, 0, 1, 0, 0, '2023-11-18 17:32:08', '2023-11-18 17:32:08'),
(5, 15, 1, 'Lorem ipsum set amet dolor', 'SK1 1EJ', 53.409643, -2.157448, 0, 0, 0, '2023-12-09 15:17:22', '2023-12-09 15:17:22'),
(6, 15, 1, 'Lorem ipsum set amet dolor amet sit', 'SK1 1EJ', 53.409643, -2.157448, 0, 0, 0, '2023-12-09 15:17:30', '2023-12-09 15:17:30'),
(7, 15, 1, 'Lorem ipsum set amet dolor', 'SK1 1EJ', 53.409643, -2.157448, 0, 0, 0, '2023-12-09 15:18:19', '2023-12-09 15:18:19'),
(8, 15, 1, 'Lorem ipsum set amet dolor', 'SK1 1EJ', 53.409643, -2.157448, 0, 0, 0, '2023-12-09 15:18:30', '2023-12-09 15:18:30'),
(9, 15, 1, 'Lorem ipsum set amet dolor', 'SK1 1EJ', 53.409643, -2.157448, 0, 0, 0, '2023-12-09 15:19:13', '2023-12-09 15:19:13');

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
-- Table structure for table `jobs_have_qualifications`
--

CREATE TABLE `jobs_have_qualifications` (
  `id` int NOT NULL,
  `job_id` int NOT NULL,
  `qualification_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jobs_have_qualifications`
--

INSERT INTO `jobs_have_qualifications` (`id`, `job_id`, `qualification_id`, `created_at`, `updated_at`) VALUES
(1, 4, 1, '2023-12-08 22:30:13', NULL),
(2, 4, 2, '2023-12-08 22:30:29', NULL),
(3, 9, 1, '2023-12-09 15:19:13', '2023-12-09 15:19:13'),
(4, 9, 2, '2023-12-09 15:19:13', '2023-12-09 15:19:13');

-- --------------------------------------------------------

--
-- Table structure for table `job_qualifications`
--

CREATE TABLE `job_qualifications` (
  `id` int NOT NULL,
  `category_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `job_qualifications`
--

INSERT INTO `job_qualifications` (`id`, `category_id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Class One Driver CE', 'Class One Driver CE', '2023-12-08 20:38:46', NULL),
(2, 1, 'Class Two Driver C', 'Class Two Driver C', '2023-12-08 20:38:46', NULL),
(3, 1, 'Class 7.5 TON C1', 'Class 7.5 TON C1', '2023-12-08 20:38:46', NULL),
(4, 1, 'Normal Car Licence', 'Normal Car Licence', '2023-12-08 20:38:46', NULL),
(5, 1, 'No licence', 'No licence', '2023-12-08 20:38:46', NULL),
(6, 2, 'Advanced', 'Advanced', '2023-12-08 20:39:50', NULL),
(7, 2, 'Part 2', 'Part 2', '2023-12-08 20:39:50', NULL),
(8, 2, 'Part 1', 'Part 1', '2023-12-08 20:39:50', NULL),
(9, 2, 'Cohts', 'Cohts', '2023-12-08 20:39:50', NULL),
(10, 2, 'No qualifications(Years Expreince)', 'No qualifications(Years Expreince)', '2023-12-08 20:39:50', NULL),
(11, 2, '1-15', '1-15', '2023-12-08 20:39:50', NULL),
(12, 3, 'Street', 'Street', '2023-12-08 20:40:40', NULL),
(13, 3, 'Site', 'Site', '2023-12-08 20:40:40', NULL),
(14, 3, 'Commercial', 'Commercial', '2023-12-08 20:40:40', NULL),
(15, 3, 'All', 'All', '2023-12-08 20:40:40', NULL),
(16, 4, 'HSE Certfiicate', 'HSE Certfiicate', '2023-12-08 20:41:25', NULL),
(17, 4, 'First Aid Training', 'First Aid Training', '2023-12-08 20:41:25', NULL),
(18, 4, 'Full Arrest Training', 'Full Arrest Training', '2023-12-08 20:41:25', NULL),
(19, 4, 'Site Supervisor Training', 'Site Supervisor Training', '2023-12-08 20:41:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_qualification_categories`
--

CREATE TABLE `job_qualification_categories` (
  `id` int NOT NULL,
  `title` varchar(105) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `job_qualification_categories`
--

INSERT INTO `job_qualification_categories` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Driver', 'Driver description here.', '2023-12-08 20:36:33', NULL),
(2, 'Qualifications', 'Qualifications description here', '2023-12-08 20:37:25', NULL),
(3, 'Preferred Types Of Work', 'Preferred Types Of Work description here', '2023-12-08 20:37:37', NULL),
(4, 'Other Qualifications', 'Other Qualifications description here', '2023-12-08 20:37:51', NULL);

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
(9, 15, 1, 'Lorem ipsum set amet dolor', 'SW1W 0NY', 52.413783, -1.469217, 1, 3, 8, 0, '2023-11-08 18:03:03', '2023-11-08 18:03:03'),
(10, 15, 1, 'Lorem ipsum set amet dolor', 'G60 5JH', 55.925668, -4.458516, 1, 3, 8, 0, '2023-11-08 18:03:03', '2023-11-08 18:03:03');

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
-- Table structure for table `listings_draft`
--

CREATE TABLE `listings_draft` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `country_code` varchar(5) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `category_id` int NOT NULL,
  `description` text NOT NULL,
  `country` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `is_active` tinyint NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `listings_draft`
--

INSERT INTO `listings_draft` (`id`, `email`, `country_code`, `phone`, `category_id`, `description`, `country`, `latitude`, `longitude`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, '123@123.com', '90', '5338350099', 1, 'Lorem ipsum set amet dolor amet sit', 'SK1 1EJ', 53.409643, -2.157448, 0, 0, '2023-12-13 22:29:50', '2023-12-13 22:29:50'),
(2, 'test32@gmail.com', '90', '5338350099', 1, 'Lorem ipsum set amet dolor amet sit', 'SK1 1EJ', 53.409643, -2.157448, 0, 0, '2023-12-13 22:35:47', '2023-12-13 22:35:47'),
(3, 'test32@gmail.com', '90', '5338350099', 1, 'Lorem ipsum set amet dolor amet sit', 'SK1 1EJ', 53.409643, -2.157448, 0, 0, '2023-12-13 22:36:02', '2023-12-13 22:36:02');

-- --------------------------------------------------------

--
-- Table structure for table `listings_draft_include_files`
--

CREATE TABLE `listings_draft_include_files` (
  `id` int NOT NULL,
  `listing_id` int NOT NULL,
  `file_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(3, 5, 5, '2023-11-13 21:43:29', '2023-11-13 21:43:29'),
(4, 5, 18, '2023-12-09 15:17:22', '2023-12-09 15:17:22'),
(5, 5, 19, '2023-12-09 15:17:22', '2023-12-09 15:17:22'),
(6, 5, 20, '2023-12-09 15:17:22', '2023-12-09 15:17:22'),
(7, 6, 18, '2023-12-09 15:17:30', '2023-12-09 15:17:30'),
(8, 6, 19, '2023-12-09 15:17:30', '2023-12-09 15:17:30'),
(9, 6, 20, '2023-12-09 15:17:30', '2023-12-09 15:17:30'),
(10, 7, 18, '2023-12-09 15:18:19', '2023-12-09 15:18:19'),
(11, 7, 19, '2023-12-09 15:18:19', '2023-12-09 15:18:19'),
(12, 7, 20, '2023-12-09 15:18:19', '2023-12-09 15:18:19'),
(13, 8, 18, '2023-12-09 15:18:30', '2023-12-09 15:18:30'),
(14, 8, 19, '2023-12-09 15:18:30', '2023-12-09 15:18:30'),
(15, 8, 20, '2023-12-09 15:18:30', '2023-12-09 15:18:30'),
(16, 9, 18, '2023-12-09 15:19:13', '2023-12-09 15:19:13'),
(17, 9, 19, '2023-12-09 15:19:13', '2023-12-09 15:19:13'),
(18, 9, 20, '2023-12-09 15:19:13', '2023-12-09 15:19:13'),
(19, 1, 18, '2023-12-13 22:29:50', '2023-12-13 22:29:50'),
(20, 1, 19, '2023-12-13 22:29:50', '2023-12-13 22:29:50'),
(21, 1, 20, '2023-12-13 22:29:50', '2023-12-13 22:29:50'),
(22, 2, 18, '2023-12-13 22:35:47', '2023-12-13 22:35:47'),
(23, 2, 19, '2023-12-13 22:35:47', '2023-12-13 22:35:47'),
(24, 2, 20, '2023-12-13 22:35:47', '2023-12-13 22:35:47'),
(25, 3, 18, '2023-12-13 22:36:02', '2023-12-13 22:36:02'),
(26, 3, 19, '2023-12-13 22:36:02', '2023-12-13 22:36:02'),
(27, 3, 20, '2023-12-13 22:36:02', '2023-12-13 22:36:02');

-- --------------------------------------------------------

--
-- Table structure for table `managers`
--

CREATE TABLE `managers` (
  `id` int NOT NULL,
  `fullname` varchar(155) NOT NULL,
  `email` varchar(155) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `managers`
--

INSERT INTO `managers` (`id`, `fullname`, `email`, `password`, `created_at`, `updated_at`) VALUES
(3, 'Test', 'mhcifci@gmail.com', '$2y$10$yCwvpsJ4M3gcvJC1mJ04c.wEdj4eizlQUDmYLcKqm55Pj6PB0WUvy', '2023-12-29 22:14:44', '2023-12-29 22:14:44');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `order_key` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `package_id` int NOT NULL,
  `status` enum('PENDING','COMPLETED','CANCELLED') NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_key`, `user_id`, `package_id`, `status`, `created_at`, `updated_at`) VALUES
(5, 'order1700948194c1bfc3889c', 15, 1, 'CANCELLED', '2023-11-25 21:36:34', '2023-11-25 21:37:54');

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
  `amount` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `title`, `description`, `price`, `img`, `amount`, `created_at`, `updated_at`) VALUES
(1, 'Test Credit Package', 'Credit package description', '10.00', NULL, 150, '2023-11-24 21:27:35', '2023-11-24 21:27:35');

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
(18, 'Yeni', 'Kullanıcı', '5338350028', '90', '$2b$10$AlD7OQ4ZMmgKGzSKqMFPxeQqPcTtQyPqqYPgH4uDmpZhFQ.I3B4s6', 'apply.cifci44@gmail.com', 1, '2023-11-17 22:16:04', '2023-11-17 22:16:04'),
(19, 'Emre', 'Kara', '5338350030', '90', '$2b$10$oy6gD6to/1BB/Qx9tUgBTeMNF9v.UtCqUyBVTZt3jDKxihRxRRgZy', 'mhcifci@gmail122.com', 1, '2023-11-30 19:14:52', '2023-11-30 19:14:52'),
(27, 'Yeni', 'Kullanıcı', '5338352222', '90', '$2b$10$bDbubRwNLNNndNixWzEOWuBqpFktSOZP7X1i3.yuWn4Yzrxf2hld.', 'mhcifci@gmail.com', 1, '2023-11-30 19:52:03', '2023-11-30 19:52:03'),
(32, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-01 20:52:59', '2023-12-01 20:52:59'),
(33, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-29 22:29:50', '2023-12-29 22:29:50'),
(34, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-29 22:29:55', '2023-12-29 22:29:55'),
(35, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-29 22:29:55', '2023-12-29 22:29:55'),
(36, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-29 22:29:55', '2023-12-29 22:29:55'),
(37, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-29 22:29:55', '2023-12-29 22:29:55'),
(38, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-29 22:29:55', '2023-12-29 22:29:55'),
(39, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-29 22:29:55', '2023-12-29 22:29:55'),
(40, 'Yeni', 'Kullanıcı', '5338352224', '90', '$2b$10$q52DsLTT10evVjzhxujQzOZyoWM6kHGofBQtdPUa6eNrQ6awsn1Gy', 'mhcifci@gmail4.com', 1, '2023-12-29 22:29:55', '2023-12-29 22:29:55');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `after_user_insert_create_detail` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    INSERT INTO user_details (user_id) 
    VALUES (NEW.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `img_id` int DEFAULT NULL,
  `preffered_post_code` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `preffered_max_mile` int DEFAULT NULL,
  `type_of_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `img_id`, `preffered_post_code`, `preffered_max_mile`, `type_of_user`) VALUES
(1, 15, 22, 'G60 5JH', 10, 1),
(5, 33, NULL, NULL, NULL, NULL),
(6, 34, NULL, NULL, NULL, NULL),
(7, 35, NULL, NULL, NULL, NULL),
(8, 36, NULL, NULL, NULL, NULL),
(9, 37, NULL, NULL, NULL, NULL),
(10, 38, NULL, NULL, NULL, NULL),
(11, 39, NULL, NULL, NULL, NULL),
(12, 40, NULL, NULL, NULL, NULL);

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
-- Table structure for table `user_follow_jobs`
--

CREATE TABLE `user_follow_jobs` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `job_id` int NOT NULL,
  `is_following` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_follow_jobs`
--

INSERT INTO `user_follow_jobs` (`id`, `user_id`, `job_id`, `is_following`, `created_at`, `updated_at`) VALUES
(1, 15, 4, 1, '2023-12-06 20:23:20', NULL);

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
(3, 15, 10, 1, '2023-11-18 02:00:32', NULL),
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
(14, 27, '786044', 0, '2023-11-30 20:06:28', '2023-11-30 20:06:28'),
(15, 27, '981639', 0, '2023-12-01 20:54:05', '2023-12-01 20:54:05');

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
(31, 18, 37, 5, '2023-11-18 16:34:33', '2023-11-18 16:34:33'),
(32, 15, 38, 3, '2023-12-08 19:52:16', '2023-12-08 19:52:16'),
(33, 15, 39, 1, '2023-12-08 19:54:16', '2023-12-08 19:54:16'),
(34, 15, 40, 1, '2023-12-08 19:54:23', '2023-12-08 19:54:23'),
(35, 15, 41, 1, '2023-12-08 19:54:34', '2023-12-08 19:54:34'),
(36, 15, 42, 1, '2023-12-09 15:27:13', '2023-12-09 15:27:13');

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
(37, 18, -8, 'Listing View Fee #5', '2023-11-18 16:34:33', '2023-11-18 16:34:33'),
(38, 15, 0, 'Listing View Fee #3', '2023-12-08 19:52:16', '2023-12-08 19:52:16'),
(39, 15, 0, 'Listing View Fee #1', '2023-12-08 19:54:16', '2023-12-08 19:54:16'),
(40, 15, 0, 'Listing View Fee #1', '2023-12-08 19:54:23', '2023-12-08 19:54:23'),
(41, 15, 0, 'Listing View Fee #1', '2023-12-08 19:54:34', '2023-12-08 19:54:34'),
(42, 15, 0, 'Listing View Fee #1', '2023-12-09 15:27:13', '2023-12-09 15:27:13');

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Scaffolder', 'I’m scaffolder, searching leads.', '2023-12-01 20:11:17', NULL),
(2, 'Client', 'I’m looking for scaffolder or designer ', '2023-12-01 20:11:38', NULL),
(3, 'Employees', 'I need job', '2023-12-01 20:12:23', NULL);

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
-- Indexes for table `jobs_have_qualifications`
--
ALTER TABLE `jobs_have_qualifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_qualifications`
--
ALTER TABLE `job_qualifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_qualification_categories`
--
ALTER TABLE `job_qualification_categories`
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
-- Indexes for table `listings_draft`
--
ALTER TABLE `listings_draft`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings_draft_include_files`
--
ALTER TABLE `listings_draft_include_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings_include_files`
--
ALTER TABLE `listings_include_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `managers`
--
ALTER TABLE `managers`
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
-- Indexes for table `user_follow_jobs`
--
ALTER TABLE `user_follow_jobs`
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
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `jobs_categories`
--
ALTER TABLE `jobs_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobs_have_qualifications`
--
ALTER TABLE `jobs_have_qualifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `job_qualifications`
--
ALTER TABLE `job_qualifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `job_qualification_categories`
--
ALTER TABLE `job_qualification_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `listings_categories`
--
ALTER TABLE `listings_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `listings_draft`
--
ALTER TABLE `listings_draft`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `listings_draft_include_files`
--
ALTER TABLE `listings_draft_include_files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listings_include_files`
--
ALTER TABLE `listings_include_files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `managers`
--
ALTER TABLE `managers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_fcm_tokens`
--
ALTER TABLE `user_fcm_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_follow_jobs`
--
ALTER TABLE `user_follow_jobs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_follow_listings`
--
ALTER TABLE `user_follow_listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_lost_passwords`
--
ALTER TABLE `user_lost_passwords`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_opened_jobs`
--
ALTER TABLE `user_opened_jobs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `user_opened_listings`
--
ALTER TABLE `user_opened_listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user_transactions`
--
ALTER TABLE `user_transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_uploaded_files`
--
ALTER TABLE `user_uploaded_files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
