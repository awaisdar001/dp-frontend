# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.27)
# Database: djreact
# Generation Time: 2019-04-17 08:56:38 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table auth_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_group`;

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table auth_group_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_group_permissions`;

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table auth_permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_permission`;

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`)
VALUES
	(1,'Can add log entry',1,'add_logentry'),
	(2,'Can change log entry',1,'change_logentry'),
	(3,'Can delete log entry',1,'delete_logentry'),
	(4,'Can add group',2,'add_group'),
	(5,'Can change group',2,'change_group'),
	(6,'Can delete group',2,'delete_group'),
	(7,'Can add permission',3,'add_permission'),
	(8,'Can change permission',3,'change_permission'),
	(9,'Can delete permission',3,'delete_permission'),
	(10,'Can add user',4,'add_user'),
	(11,'Can change user',4,'change_user'),
	(12,'Can delete user',4,'delete_user'),
	(13,'Can add content type',5,'add_contenttype'),
	(14,'Can change content type',5,'change_contenttype'),
	(15,'Can delete content type',5,'delete_contenttype'),
	(16,'Can add session',6,'add_session'),
	(17,'Can change session',6,'change_session'),
	(18,'Can delete session',6,'delete_session'),
	(19,'Can add facility',7,'add_facility'),
	(20,'Can change facility',7,'change_facility'),
	(21,'Can delete facility',7,'delete_facility'),
	(22,'Can add host',8,'add_host'),
	(23,'Can change host',8,'change_host'),
	(24,'Can delete host',8,'delete_host'),
	(25,'Can add trip',9,'add_trip'),
	(26,'Can change trip',9,'change_trip'),
	(27,'Can delete trip',9,'delete_trip'),
	(28,'Can add trip schedule',10,'add_tripschedule'),
	(29,'Can change trip schedule',10,'change_tripschedule'),
	(30,'Can delete trip schedule',10,'delete_tripschedule'),
	(31,'Can add location',11,'add_location'),
	(32,'Can change location',11,'change_location'),
	(33,'Can delete location',11,'delete_location'),
	(34,'Can add trip itinerary',12,'add_tripitinerary'),
	(35,'Can change trip itinerary',12,'change_tripitinerary'),
	(36,'Can delete trip itinerary',12,'delete_tripitinerary'),
	(37,'Can add activity',13,'add_activity'),
	(38,'Can change activity',13,'change_activity'),
	(39,'Can delete activity',13,'delete_activity');

/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table auth_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_user`;

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`)
VALUES
	(1,'pbkdf2_sha256$36000$lUPQwCdbzVnl$8kNM6uDSC8YNyKdmvpzJLcpdpkSY29xRyI4Zs5FN87I=','2019-04-17 08:42:53.514465',1,'admin','','','a@a.com',1,1,'2019-04-12 07:47:57.889609');

/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table auth_user_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_user_groups`;

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table auth_user_user_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_user_user_permissions`;

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table django_admin_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `django_admin_log`;

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`)
VALUES
	(1,'2019-04-12 07:50:17.745732','1','Location object',1,'[{\"added\": {}}]',11,1),
	(2,'2019-04-12 07:50:57.352655','1','Activity object',1,'[{\"added\": {}}]',13,1),
	(3,'2019-04-12 07:51:04.579363','1','Facility object',1,'[{\"added\": {}}]',7,1),
	(4,'2019-04-12 07:51:35.091186','1','Host object',1,'[{\"added\": {}}]',8,1),
	(5,'2019-04-12 07:51:37.866335','1','Title',1,'[{\"added\": {}}]',9,1),
	(6,'2019-04-12 07:52:20.042871','1','TripSchedule object',1,'[{\"added\": {}}]',10,1),
	(7,'2019-04-12 07:52:29.481545','2','TripSchedule object',1,'[{\"added\": {}}]',10,1),
	(8,'2019-04-12 07:55:08.355410','1','1-Title',1,'[{\"added\": {}}]',12,1),
	(9,'2019-04-12 07:55:09.905951','1','1-Title',2,'[]',12,1),
	(10,'2019-04-12 07:55:38.957224','2','1-Title',1,'[{\"added\": {}}]',12,1),
	(11,'2019-04-12 07:56:04.607353','3','2-Title',1,'[{\"added\": {}}]',12,1),
	(12,'2019-04-12 10:20:35.177143','2','Location object',1,'[{\"added\": {}}]',11,1),
	(13,'2019-04-12 10:21:19.953012','3','Location object',1,'[{\"added\": {}}]',11,1),
	(14,'2019-04-12 10:21:42.784868','2','Activity object',1,'[{\"added\": {}}]',13,1),
	(15,'2019-04-12 10:22:00.196336','2','Facility object',1,'[{\"added\": {}}]',7,1),
	(16,'2019-04-12 10:22:35.235009','3','Facility object',1,'[{\"added\": {}}]',7,1),
	(17,'2019-04-12 10:24:06.545752','4','Facility object',1,'[{\"added\": {}}]',7,1),
	(18,'2019-04-12 10:24:13.926959','5','Facility object',1,'[{\"added\": {}}]',7,1),
	(19,'2019-04-12 10:24:34.414566','6','Facility object',1,'[{\"added\": {}}]',7,1),
	(20,'2019-04-12 10:24:40.945229','7','Facility object',1,'[{\"added\": {}}]',7,1),
	(21,'2019-04-12 10:25:17.853009','1','Trip to Arang Kel',2,'[{\"changed\": {\"fields\": [\"name\", \"slug\", \"description\", \"duration\", \"price\", \"starting_location\", \"locations_included\", \"activities\", \"facilities\", \"cancelation_policy\"]}}]',9,1),
	(22,'2019-04-12 10:25:53.440705','2','TripSchedule object',3,'',10,1),
	(23,'2019-04-12 10:25:53.442622','1','TripSchedule object',3,'',10,1),
	(24,'2019-04-12 10:26:08.583116','3','TripSchedule object',1,'[{\"added\": {}}]',10,1),
	(25,'2019-04-12 10:26:39.469498','2','1-Trip to Arang Kel',2,'[{\"changed\": {\"fields\": [\"title\"]}}]',12,1),
	(26,'2019-04-12 10:28:28.845976','1','2-Trip to Arang Kel',2,'[{\"changed\": {\"fields\": [\"day\", \"title\", \"description\"]}}]',12,1),
	(27,'2019-04-12 10:28:34.549047','2','1-Trip to Arang Kel',2,'[]',12,1),
	(28,'2019-04-12 10:29:11.872182','3','3-Trip to Arang Kel',2,'[{\"changed\": {\"fields\": [\"day\", \"title\", \"description\"]}}]',12,1),
	(29,'2019-04-12 10:29:37.386403','4','4-Trip to Arang Kel',1,'[{\"added\": {}}]',12,1),
	(30,'2019-04-15 08:56:40.653999','1','Activity object',2,'[{\"changed\": {\"fields\": [\"slug\"]}}]',13,1),
	(31,'2019-04-15 09:11:57.703011','2','Trip to Hunza Valley',1,'[{\"added\": {}}]',9,1),
	(32,'2019-04-15 09:14:46.379791','5','1-Trip to Hunza Valley',1,'[{\"added\": {}}]',12,1),
	(33,'2019-04-15 09:14:48.509351','5','1-Trip to Hunza Valley',2,'[]',12,1),
	(34,'2019-04-15 09:16:31.364481','6','2-Trip to Hunza Valley',1,'[{\"added\": {}}]',12,1),
	(35,'2019-04-15 09:21:30.409398','7','3-Trip to Hunza Valley',1,'[{\"added\": {}}]',12,1),
	(36,'2019-04-15 09:21:54.252603','8','4-Trip to Hunza Valley',1,'[{\"added\": {}}]',12,1),
	(37,'2019-04-15 09:22:53.758561','9','5-Trip to Hunza Valley',1,'[{\"added\": {}}]',12,1),
	(38,'2019-04-15 09:23:09.934313','10','6-Trip to Hunza Valley',1,'[{\"added\": {}}]',12,1),
	(39,'2019-04-15 09:23:50.681241','4','TripSchedule object',1,'[{\"added\": {}}]',10,1),
	(40,'2019-04-15 09:24:02.368455','5','TripSchedule object',1,'[{\"added\": {}}]',10,1),
	(41,'2019-04-16 08:52:22.618203','3','Accommodation (Sharing 3-4)',2,'[{\"changed\": {\"fields\": [\"slug\"]}}]',7,1),
	(42,'2019-04-16 08:52:31.370370','7','First Aid Kit',2,'[{\"changed\": {\"fields\": [\"slug\"]}}]',7,1),
	(43,'2019-04-16 08:52:33.508654','7','First Aid Kit',2,'[]',7,1),
	(44,'2019-04-16 08:52:43.887923','1','Host - Arbisoft Travels',2,'[]',8,1),
	(45,'2019-04-16 08:57:05.609436','2','Trip to Hunza Valley - Arbisoft Travels',2,'[{\"changed\": {\"fields\": [\"locations_included\"]}}]',9,1),
	(46,'2019-04-16 09:07:11.144680','1','Walking',2,'[{\"changed\": {\"fields\": [\"name\"]}}]',13,1),
	(47,'2019-04-17 08:46:59.228242','2','Cash On Delivery',2,'[{\"changed\": {\"fields\": [\"slug\"]}}]',7,1),
	(48,'2019-04-17 08:47:03.077975','7','First Aid Kit',2,'[]',7,1),
	(49,'2019-04-17 08:47:08.933522','1','Food',2,'[{\"changed\": {\"fields\": [\"name\", \"slug\"]}}]',7,1),
	(50,'2019-04-17 08:47:13.780483','6','Guide',2,'[{\"changed\": {\"fields\": [\"slug\"]}}]',7,1),
	(51,'2019-04-17 08:47:17.580313','5','Standard Meals',2,'[{\"changed\": {\"fields\": [\"slug\"]}}]',7,1),
	(52,'2019-04-17 08:47:21.737971','4','Transport',2,'[{\"changed\": {\"fields\": [\"slug\"]}}]',7,1),
	(53,'2019-04-17 08:47:30.163021','1','Arbisoft Travels',2,'[]',8,1),
	(54,'2019-04-17 08:48:24.647974','2','Trip to Hunza Valley - Arbisoft Travels',2,'[{\"changed\": {\"fields\": [\"locations_included\"]}}, {\"changed\": {\"fields\": [\"description\"], \"object\": \"1-Trip to Hunza Valley\", \"name\": \"trip itinerary\"}}]',9,1),
	(55,'2019-04-17 08:49:35.496177','2','Trip to Hunza Valley - Arbisoft Travels',2,'[{\"changed\": {\"fields\": [\"starting_location\"]}}]',9,1),
	(56,'2019-04-17 08:50:09.018769','1','Lahore',3,'',11,1),
	(57,'2019-04-17 08:52:26.916075','2','Trip to Hunza Valley - Arbisoft Travels',2,'[{\"changed\": {\"fields\": [\"starting_location\"]}}]',9,1);

/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table django_content_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `django_content_type`;

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;

INSERT INTO `django_content_type` (`id`, `app_label`, `model`)
VALUES
	(1,'admin','logentry'),
	(2,'auth','group'),
	(3,'auth','permission'),
	(4,'auth','user'),
	(5,'contenttypes','contenttype'),
	(6,'sessions','session'),
	(13,'trips','activity'),
	(7,'trips','facility'),
	(8,'trips','host'),
	(11,'trips','location'),
	(9,'trips','trip'),
	(12,'trips','tripitinerary'),
	(10,'trips','tripschedule');

/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table django_migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `django_migrations`;

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`)
VALUES
	(1,'contenttypes','0001_initial','2019-04-12 06:27:06.324370'),
	(2,'auth','0001_initial','2019-04-12 06:27:06.815451'),
	(3,'admin','0001_initial','2019-04-12 06:27:06.924331'),
	(4,'admin','0002_logentry_remove_auto_add','2019-04-12 06:27:06.970448'),
	(5,'contenttypes','0002_remove_content_type_name','2019-04-12 06:27:07.068301'),
	(6,'auth','0002_alter_permission_name_max_length','2019-04-12 06:27:07.100544'),
	(7,'auth','0003_alter_user_email_max_length','2019-04-12 06:27:07.146453'),
	(8,'auth','0004_alter_user_username_opts','2019-04-12 06:27:07.158569'),
	(9,'auth','0005_alter_user_last_login_null','2019-04-12 06:27:07.198089'),
	(10,'auth','0006_require_contenttypes_0002','2019-04-12 06:27:07.200848'),
	(11,'auth','0007_alter_validators_add_error_messages','2019-04-12 06:27:07.212433'),
	(12,'auth','0008_alter_user_username_max_length','2019-04-12 06:27:07.255376'),
	(13,'sessions','0001_initial','2019-04-12 06:27:07.303255'),
	(14,'trips','0001_initial','2019-04-12 06:27:08.061439'),
	(15,'trips','0002_auto_20190412_1317','2019-04-15 12:25:46.478382'),
	(16,'trips','0003_trip_gear','2019-04-15 16:54:26.539053'),
	(17,'trips','0004_auto_20190416_0851','2019-04-16 08:51:55.215040'),
	(18,'trips','0005_auto_20190417_0851','2019-04-17 08:51:57.055002');

/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table django_session
# ------------------------------------------------------------

DROP TABLE IF EXISTS `django_session`;

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`)
VALUES
	('93b6jx0pz526xgcm362kww5yzdxfd2e1','YTBlNjUyYjY0MDZiZmJkMjJmMDJhYTc5YzRhOGYyM2ViMzU2YTMzMjp7Il9hdXRoX3VzZXJfaGFzaCI6IjExYjQ2YmU4MTU1NDAwNjAxYzg5OGI5YTEwMTIxNmJiYTllYjg0NjMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-04-26 07:48:16.920346'),
	('i3mkdz5y5jqr5o3qwd696enbdiz588bw','YTBlNjUyYjY0MDZiZmJkMjJmMDJhYTc5YzRhOGYyM2ViMzU2YTMzMjp7Il9hdXRoX3VzZXJfaGFzaCI6IjExYjQ2YmU4MTU1NDAwNjAxYzg5OGI5YTEwMTIxNmJiYTllYjg0NjMiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-05-01 08:42:53.518886');

/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_activity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_activity`;

CREATE TABLE `trips_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `slug` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trips_activity_slug_3fd7aec9` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_activity` WRITE;
/*!40000 ALTER TABLE `trips_activity` DISABLE KEYS */;

INSERT INTO `trips_activity` (`id`, `name`, `slug`)
VALUES
	(1,'Walking','walking'),
	(2,'Sightseeing','activity-sightseeing');

/*!40000 ALTER TABLE `trips_activity` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_facility
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_facility`;

CREATE TABLE `trips_facility` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `slug` varchar(85) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trips_facility_slug_5a24f3bc` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_facility` WRITE;
/*!40000 ALTER TABLE `trips_facility` DISABLE KEYS */;

INSERT INTO `trips_facility` (`id`, `name`, `slug`)
VALUES
	(1,'Food','food'),
	(2,'Cash On Delivery','cash-delivery'),
	(3,'Accommodation (Sharing 3-4)','accommodation-sharing-3-4'),
	(4,'Transport','transport'),
	(5,'Standard Meals','standard-meals'),
	(6,'Guide','guide'),
	(7,'First Aid Kit','first-aid-kit');

/*!40000 ALTER TABLE `trips_facility` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_host
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_host`;

CREATE TABLE `trips_host` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `slug` varchar(70) DEFAULT NULL,
  `description` longtext,
  `verified` tinyint(1) NOT NULL,
  `cancelation_policy` longtext,
  PRIMARY KEY (`id`),
  KEY `trips_host_slug_5626e749` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_host` WRITE;
/*!40000 ALTER TABLE `trips_host` DISABLE KEYS */;

INSERT INTO `trips_host` (`id`, `name`, `slug`, `description`, `verified`, `cancelation_policy`)
VALUES
	(1,'Arbisoft Travels','arbisoft-travels','',1,'');

/*!40000 ALTER TABLE `trips_host` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_location
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_location`;

CREATE TABLE `trips_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `slug` varchar(50) DEFAULT NULL,
  `coordinates` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trips_location_slug_22669a0c` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_location` WRITE;
/*!40000 ALTER TABLE `trips_location` DISABLE KEYS */;

INSERT INTO `trips_location` (`id`, `name`, `slug`, `coordinates`)
VALUES
	(2,'Lahore','lahore',NULL),
	(3,'Azad Kashmir','azad-kashmir',NULL);

/*!40000 ALTER TABLE `trips_location` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_trip
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_trip`;

CREATE TABLE `trips_trip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `description` longtext,
  `_metadata` longtext,
  `duration` smallint(6) DEFAULT NULL,
  `price` smallint(6) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `host_id` int(11) NOT NULL,
  `starting_location_id` int(11) NOT NULL,
  `gear` longtext,
  `_cancelation_policy` longtext,
  PRIMARY KEY (`id`),
  KEY `trips_trip_created_by_id_f8d8c76e_fk_auth_user_id` (`created_by_id`),
  KEY `trips_trip_host_id_c164a7ba_fk_trips_host_id` (`host_id`),
  KEY `trips_trip_slug_61ab4bbd` (`slug`),
  KEY `trips_trip_starting_location_id_92a766cb` (`starting_location_id`),
  CONSTRAINT `trips_trip_created_by_id_f8d8c76e_fk_auth_user_id` FOREIGN KEY (`created_by_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `trips_trip_host_id_c164a7ba_fk_trips_host_id` FOREIGN KEY (`host_id`) REFERENCES `trips_host` (`id`),
  CONSTRAINT `trips_trip_starting_location_id_92a766cb_fk_trips_location_id` FOREIGN KEY (`starting_location_id`) REFERENCES `trips_location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_trip` WRITE;
/*!40000 ALTER TABLE `trips_trip` DISABLE KEYS */;

INSERT INTO `trips_trip` (`id`, `name`, `slug`, `description`, `_metadata`, `duration`, `price`, `deleted`, `created_at`, `updated_at`, `created_by_id`, `host_id`, `starting_location_id`, `gear`, `_cancelation_policy`)
VALUES
	(1,'Trip to Arang Kel','trip-to-arang-kel','Neelum Valley is located in Neelum District, the northernmost district of Azad Kashmir. Stretching for 144 km, the valley is thickly forested and has the beautiful Neelum River flowing through its length. The valley is situated in the northeast of Muzaffarabad, running parallel to Kaghan Valley. It is replete with gorgeous scenery, stunning valleys, and magical waterfalls. Major tourist attractions include Arang Kel, Athmuqam, Chitta Katha Lake, Dhani Waterfall, Kel, Keran, Kutton, and Sharda.\r\n\r\nArang Kel, a lush green village known as the “Pearl of Neelum Valley”, is located on a hilltop at an altitude of 8,379 feet in Neelum Valley, Azad Kashmir. It is a slice of paradise here on earth. In summers its fields are dewy, with horses and goats frolicking about, and colorful birds singing it its dense forests. In winter, its plains are carpeted with fresh snow and wooden huts and rest houses glow invitingly among the coniferous trees. Arang Kel can be reached either by a 2-kilometer trek or a kilometer-long chairlift from the town of Kel.\r\n\r\nKel is a scenic village in Neelum Valley, Azad Kashmir. It is 155 km away from Muzaffarabad at an altitude of 6,879 ft. Kel serves as a base camp for Arang Kel and Chitta Katha Lake. Situated extremely close to the Line of Control dividing Pakistan and India, Kel has a strong presence of army personnel all year round. The drive to the village is a difficult one but the destination makes it worth it. Kel is covered with verdant forests and snow-capped Himalayan peaks; the Neelum River, too, flows through the village. Kel Bazaar is renowned for Kashmiri handicrafts, dresses and honey.\r\n\r\nRecommended Gear:\r\nFleece/Sweaters\r\nGloves (highly recommended)\r\nMuffler (highly recommended)\r\nBeanie (highly recommended)\r\nHand wash/soap/sanitizer, wipes, tooth paste and all other necessities\r\nSun Block and Sun glasses','{}',4,8499,0,'2019-04-12 07:51:37.832482','2019-04-12 10:25:17.815005',1,1,2,NULL,NULL),
	(2,'Trip to Hunza Valley','trip-to-hunza-valley','Hunza, the valley of dreams where the cherry blossom trees put on a spectacular show in summer, and the frost-covered mountains and icy Attabad Lake create a scene straight out of a snow globe in winter, is located in the Gilgit-Pakistan region of Pakistan. A week in the majestic Karakoram mountain ranges is enough to transform you. It offers something for everyone, be it mountaineers, explorers, couples or tourists. Higher up is also the iconic Khunjerab Pass connecting Pakistan to its great neighbor China. Baltit is a popular tourist destination because of the spectacular scenery of the surrounding mountains like Ultar Sar, Rakaposhi, Bojahagur Duanasir II, Ghenta Peak, Hunza Peak, Passu Cathedral, Diran Peak and Bubli Motion (Ladyfinger Peak).','{}',6,13499,0,'2019-04-15 09:11:57.667510','2019-04-17 08:52:26.905473',1,1,2,'','');

/*!40000 ALTER TABLE `trips_trip` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_trip_activities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_trip_activities`;

CREATE TABLE `trips_trip_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trip_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trips_trip_activities_trip_id_activity_id_2434b83a_uniq` (`trip_id`,`activity_id`),
  KEY `trips_trip_activities_activity_id_80e3263b_fk_trips_activity_id` (`activity_id`),
  CONSTRAINT `trips_trip_activities_activity_id_80e3263b_fk_trips_activity_id` FOREIGN KEY (`activity_id`) REFERENCES `trips_activity` (`id`),
  CONSTRAINT `trips_trip_activities_trip_id_9b6fdbce_fk_trips_trip_id` FOREIGN KEY (`trip_id`) REFERENCES `trips_trip` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_trip_activities` WRITE;
/*!40000 ALTER TABLE `trips_trip_activities` DISABLE KEYS */;

INSERT INTO `trips_trip_activities` (`id`, `trip_id`, `activity_id`)
VALUES
	(2,1,2),
	(3,2,1),
	(4,2,2);

/*!40000 ALTER TABLE `trips_trip_activities` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_trip_facilities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_trip_facilities`;

CREATE TABLE `trips_trip_facilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trip_id` int(11) NOT NULL,
  `facility_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trips_trip_facilities_trip_id_facility_id_6829d841_uniq` (`trip_id`,`facility_id`),
  KEY `trips_trip_facilities_facility_id_7fa40a77_fk_trips_facility_id` (`facility_id`),
  CONSTRAINT `trips_trip_facilities_facility_id_7fa40a77_fk_trips_facility_id` FOREIGN KEY (`facility_id`) REFERENCES `trips_facility` (`id`),
  CONSTRAINT `trips_trip_facilities_trip_id_658e3d08_fk_trips_trip_id` FOREIGN KEY (`trip_id`) REFERENCES `trips_trip` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_trip_facilities` WRITE;
/*!40000 ALTER TABLE `trips_trip_facilities` DISABLE KEYS */;

INSERT INTO `trips_trip_facilities` (`id`, `trip_id`, `facility_id`)
VALUES
	(1,1,1),
	(2,1,2),
	(3,1,3),
	(4,1,4),
	(5,1,5),
	(6,1,6),
	(7,1,7),
	(8,2,1),
	(9,2,2),
	(10,2,3),
	(11,2,4),
	(12,2,5);

/*!40000 ALTER TABLE `trips_trip_facilities` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_trip_locations_included
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_trip_locations_included`;

CREATE TABLE `trips_trip_locations_included` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trip_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trips_trip_locations_included_trip_id_location_id_b86b1dff_uniq` (`trip_id`,`location_id`),
  KEY `trips_trip_locations_location_id_e56c93db_fk_trips_loc` (`location_id`),
  CONSTRAINT `trips_trip_locations_included_trip_id_70117e9b_fk_trips_trip_id` FOREIGN KEY (`trip_id`) REFERENCES `trips_trip` (`id`),
  CONSTRAINT `trips_trip_locations_location_id_e56c93db_fk_trips_loc` FOREIGN KEY (`location_id`) REFERENCES `trips_location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_trip_locations_included` WRITE;
/*!40000 ALTER TABLE `trips_trip_locations_included` DISABLE KEYS */;

INSERT INTO `trips_trip_locations_included` (`id`, `trip_id`, `location_id`)
VALUES
	(2,1,3),
	(6,2,2),
	(5,2,3);

/*!40000 ALTER TABLE `trips_trip_locations_included` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_tripitinerary
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_tripitinerary`;

CREATE TABLE `trips_tripitinerary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` smallint(6) NOT NULL,
  `description` longtext NOT NULL,
  `trip_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `trips_tripitinerary_trip_id_58e6e2ae_fk_trips_trip_id` (`trip_id`),
  CONSTRAINT `trips_tripitinerary_trip_id_58e6e2ae_fk_trips_trip_id` FOREIGN KEY (`trip_id`) REFERENCES `trips_trip` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_tripitinerary` WRITE;
/*!40000 ALTER TABLE `trips_tripitinerary` DISABLE KEYS */;

INSERT INTO `trips_tripitinerary` (`id`, `day`, `description`, `trip_id`)
VALUES
	(1,2,'03:00 am Gathering at meetup point Daewoo Terminal, \r\nDeparture for Muzaffarabad, \r\nBreakfast at Muzaffarabad \r\nDrive to Keran \r\nVisit Dhani & Kuttan waterfall. \r\nDinner & Overnight at Sharda.',1),
	(2,1,'',1),
	(3,3,'06:00 am Wakeup call & breakfast \r\nDrive towards Kel & Arang Kel full day \r\nBack to Sharda\r\nDinner & Overnight at Sharda.',1),
	(4,4,'Back to Islamabad/Lahore',1),
	(5,1,'Get started from Lahore at 10:00pm',2),
	(6,2,'03:30 am Pick Islamabad members \r\n10:00 am Breakfast at Besham \r\nContinue journey \r\nShort stay at Dasu and couple of other scenic points \r\n06:00 pm Arrival at Chilas and transfer to hotel \r\n08:00 pm Dinner \r\nOvernight stay in Chilas\r\n(Grace Continental)\r\n(Breakfast + Dinner)',2),
	(7,3,'07:00 am Breakfast\r\n08:00 am Departure from Chilas (Sharp)\r\nShort stay in Nanga Parbat View Point, \r\nMountain Junction Point\r\n03:00 pm Arrival in Hunza \r\nVisit Altit fort & Royal Garden\r\nVisit Baltit Fort \r\nDrive to hotel\r\nVisit Karimabad Bazar \r\n09:00 pm Dinner in hotel \r\nOvernight stay in Hunza, Karimabad\r\n(Rainbow Hotel / Baltit Hertiage / Baltit Home) \r\n(Breakfast + Dinner)',2),
	(8,4,'08:00 am Breakfast \r\n09:00 am Departure for Khunjerab \r\nEnroute:-\r\nAtaabad Lake, \r\nGulmit, \r\nPassu, \r\nHussaini Bridge, \r\nSost \r\nArrival at Khunjerab Pass\r\n08:00 pm Dinner\r\nOvernight stay in Hunza, Karimabad\r\n(Rainbow Hotel / Baltit Hertiage / Baltit Home) \r\n(Breakfast + Dinner)',2),
	(9,5,'08:00 am Breakfast \r\nVisit Baltit Fort & Karimabar Bazar for some shopping\r\n10:00 am Departure for Chilas \r\nShort stay at Rakaposhi View Point\r\nArrival at Chilas (evening) \r\n08:00 pm Dinner \r\nOvernight stay in Chilas\r\n(Grace Continental)\r\n(Breakfast + Dinner)',2),
	(10,6,'08:00 am Breakfast \r\n09:00 am Departure for Islamabad \r\n04:00 pm Lunch cm Dinner in Mansehra / Abottabad\r\n08:00 pm Arrival at Islamabad\r\n01:00 am Arrival at Lahore',2);

/*!40000 ALTER TABLE `trips_tripitinerary` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips_tripschedule
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips_tripschedule`;

CREATE TABLE `trips_tripschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_from` datetime(6) NOT NULL,
  `price_override` smallint(6) DEFAULT NULL,
  `trip_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `trips_tripschedule_trip_id_9231c73e_fk_trips_trip_id` (`trip_id`),
  CONSTRAINT `trips_tripschedule_trip_id_9231c73e_fk_trips_trip_id` FOREIGN KEY (`trip_id`) REFERENCES `trips_trip` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `trips_tripschedule` WRITE;
/*!40000 ALTER TABLE `trips_tripschedule` DISABLE KEYS */;

INSERT INTO `trips_tripschedule` (`id`, `date_from`, `price_override`, `trip_id`)
VALUES
	(3,'2019-04-18 10:26:07.000000',0,1),
	(4,'2019-04-17 09:23:47.000000',0,2),
	(5,'2019-04-24 09:23:54.000000',0,2);

/*!40000 ALTER TABLE `trips_tripschedule` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
