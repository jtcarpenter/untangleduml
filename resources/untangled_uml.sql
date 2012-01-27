--
-- Table structure for table `diagram`
--

CREATE TABLE IF NOT EXISTS `diagram` (
  `diagram_id` int(11) COLLATE utf8_bin NOT NULL AUTO_INCREMENT,
  `user_id` int(11) COLLATE utf8_bin NOT NULL,
  `title` varchar(40) COLLATE utf8_bin NOT NULL,
  `shared` boolean NOT NULL,
  `version` int COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`diagram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Table structure for table `diagram_access`
-- WE DONT EVEN NEED THIS ANYMORE

CREATE TABLE IF NOT EXISTS `sharing` (
  `sharer_id` int(11) COLLATE utf8_bin NOT NULL,
  `shared_id` int(11) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`sharer_id`,`shared_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;