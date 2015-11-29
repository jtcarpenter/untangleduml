-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 28, 2015 at 03:00 PM
-- Server version: 5.5.45-cll
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `untan892_umldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) COLLATE utf8_bin NOT NULL DEFAULT '0',
  `ip_address` varchar(16) COLLATE utf8_bin NOT NULL DEFAULT '0',
  `user_agent` varchar(150) COLLATE utf8_bin NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`session_id`, `ip_address`, `user_agent`, `last_activity`, `user_data`) VALUES
('120a5e091c5423047c73f233449475cc', '81.144.138.34', 'Wotbox/2.01 (+http://www.wotbox.com/bot/)', 1448699438, ''),
('316015cbc42ae97d8c055130d7c15b60', '81.144.138.34', 'Wotbox/2.01 (+http://www.wotbox.com/bot/)', 1448699431, ''),
('481878c58af13706a6603ac18a643b37', '81.144.138.34', 'Wotbox/2.01 (+http://www.wotbox.com/bot/)', 1448699456, ''),
('9360db1248f1a958c385444c6f5420b1', '81.144.138.34', 'Wotbox/2.01 (+http://www.wotbox.com/bot/)', 1448699447, 'a:2:{s:22:"flash:new:captcha_word";s:8:"TPPPLDRT";s:22:"flash:new:captcha_time";d:1448699447.6026890277862548828125;}'),
('aef9ba76a36ae8d9a3f21134017443ed', '81.144.138.34', 'Wotbox/2.01 (+http://www.wotbox.com/bot/)', 1448699415, ''),
('cb10d6e2d151a615350c1b0828afe9fa', '81.144.138.34', 'Wotbox/2.01 (+http://www.wotbox.com/bot/)', 1448699423, ''),
('d5a6d51c3594eb2220acb45d8da09704', '81.144.138.34', 'Wotbox/2.01 (+http://www.wotbox.com/bot/)', 1448699408, '');

-- --------------------------------------------------------

--
-- Table structure for table `diagram`
--

CREATE TABLE IF NOT EXISTS `diagram` (
  `diagram_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(40) COLLATE utf8_bin NOT NULL,
  `shared` tinyint(1) NOT NULL,
  `version` int(11) NOT NULL,
  PRIMARY KEY (`diagram_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

--
-- Dumping data for table `diagram`
--

INSERT INTO `diagram` (`diagram_id`, `user_id`, `title`, `shared`, `version`) VALUES
(1, 15, 'untitled', 0, 0),
(2, 16, 'Test', 0, 0),
(3, 16, 'Test', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE IF NOT EXISTS `login_attempts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(40) COLLATE utf8_bin NOT NULL,
  `login` varchar(50) COLLATE utf8_bin NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `sharing`
--

CREATE TABLE IF NOT EXISTS `sharing` (
  `sharer_id` int(11) NOT NULL,
  `shared_id` int(11) NOT NULL,
  PRIMARY KEY (`sharer_id`,`shared_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT '1',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `ban_reason` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `new_password_key` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `new_password_requested` datetime DEFAULT NULL,
  `new_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `new_email_key` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `last_ip` varchar(40) COLLATE utf8_bin NOT NULL,
  `last_login` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=18 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `activated`, `banned`, `ban_reason`, `new_password_key`, `new_password_requested`, `new_email`, `new_email_key`, `last_ip`, `last_login`, `created`, `modified`) VALUES
(4, 'tester', '$P$B.JbiWUBoSIiZLEsaFzO/VdIILXHvy0', 'admin@untangleduml.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '90.213.170.164', '2012-03-09 18:41:24', '2011-09-15 14:52:32', '2012-03-09 18:41:24'),
(5, 'tomblakemore', '$P$BoBnVgJSQfmtIJfyjl80xLizrWc1Ra/', 'tom.blakemore@mac.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '188.39.53.250', '2011-09-29 09:16:25', '2011-09-29 09:15:40', '2011-09-29 08:16:25'),
(6, 'nguyenson', '$P$B04D.Vfm0NKvSxY2XpL3ijsfhtn1wY.', 'hoaisondev@gmail.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '118.69.70.105', '2012-01-03 03:48:45', '2012-01-03 03:47:48', '2012-01-03 03:48:45'),
(8, 'Lehnhard', '$P$BIGFY1dukFi1aXLd5yJs32tKwDAt1i/', 'Lehnhard@gmail.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '77.184.17.253', '2012-05-04 22:32:54', '2012-05-04 22:31:35', '2012-05-04 21:32:54'),
(9, 'carlos', '$P$BRAjhspsLbETh2WBkatGaHC/pqI.i91', 'carlos.bonilla@hp.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '15.219.153.76', '2012-06-04 22:43:36', '2012-06-04 22:42:58', '2012-06-04 21:43:36'),
(10, 'testname', '$P$BkwcvjT8ybyjzvEcFOsC5FsUN.So5.1', 'sks1607@rediffmail.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '202.59.231.33', '2012-08-29 10:00:25', '2012-08-29 09:59:01', '2012-08-29 09:00:25'),
(12, 'akumasai', '$P$BRS1yRts/CN/pZkNnKtPycC8v4.6qK.', 'akumasai@gmail.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '5.49.66.57', '2013-08-23 13:26:03', '2013-08-23 13:25:00', '2013-08-23 12:26:03'),
(13, 'SakaHeroji', '$P$B4vEPtLB7vDtsf.t5dxMWEEtWt.zTt0', 'aditya.bluejack@yahoo.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '202.58.180.61', '2013-11-20 02:21:10', '2013-11-20 02:20:03', '2013-11-20 02:21:10'),
(14, 'LiuLydibomiN', '$P$BUiA95TNiNxQslawe3TOBVqLVHZlni.', 'goodbye57@gmail.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '1.4.192.96', '2014-01-07 09:16:07', '2014-01-07 09:14:44', '2014-01-07 09:16:07'),
(15, 'toomuchguy', '$P$B4tAKwWTxvowNBUn39FGDmMRizJfhF0', 'toomuchguy@gmail.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '209.189.225.70', '2014-03-07 18:40:18', '2014-03-07 18:39:40', '2014-03-07 18:40:18'),
(16, 'RamblinLane', '$P$B96BdyheuGb6.PaN9pnfJZqfDifnuy/', 'ramblinlane@gmail.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '196.26.66.142', '2014-04-30 09:42:44', '2014-04-30 09:38:09', '2014-04-30 08:42:44'),
(17, 'ger99', '$P$BLIssBSqrqpbx6DP/pEm5ouPm0umT7/', 'ger99@live.com', 1, 0, NULL, NULL, NULL, NULL, NULL, '145.118.84.19', '2014-06-25 17:56:50', '2014-06-24 16:08:57', '2014-06-25 16:56:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_autologin`
--

CREATE TABLE IF NOT EXISTS `user_autologin` (
  `key_id` char(32) COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `user_agent` varchar(150) COLLATE utf8_bin NOT NULL,
  `last_ip` varchar(40) COLLATE utf8_bin NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_autologin`
--

INSERT INTO `user_autologin` (`key_id`, `user_id`, `user_agent`, `last_ip`, `last_login`) VALUES
('3d7e9b2e888e3e4aac06ebc9b80f820c', 14, 'Mozilla/5.0 (Windows NT 6.2; rv:26.0) Gecko/20100101 Firefox/26.0', '1.4.192.96', '2014-01-07 09:16:07'),
('568a1dba51aab04ec83780d2cf6f5c23', 8, 'Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3', '77.184.17.253', '2012-05-04 21:32:54'),
('6230bebc2e671267b4a94e3b534330e9', 9, 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0', '15.219.153.76', '2012-06-04 21:43:36'),
('cf321cde99406aae209cfaf44ddb863a', 16, 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.5; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.2)', '196.26.66.142', '2014-04-30 08:42:44');

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE IF NOT EXISTS `user_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `country` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `website` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=13 ;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `user_id`, `country`, `website`) VALUES
(1, 4, NULL, NULL),
(2, 5, NULL, NULL),
(3, 6, NULL, NULL),
(4, 8, NULL, NULL),
(5, 9, NULL, NULL),
(6, 10, NULL, NULL),
(7, 12, NULL, NULL),
(8, 13, NULL, NULL),
(9, 14, NULL, NULL),
(10, 15, NULL, NULL),
(11, 16, NULL, NULL),
(12, 17, NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
