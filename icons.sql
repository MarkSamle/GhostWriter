/*
 Navicat Premium Data Transfer

 Source Server         : cwriter-sql
 Source Server Type    : SQLite
 Source Server Version : 3017000
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3017000
 File Encoding         : 65001

 Date: 03/11/2022 20:43:34
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for icons
-- ----------------------------
DROP TABLE IF EXISTS "icons";
CREATE TABLE "icons" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" varchar(50),
  UNIQUE ("name" ASC)
);

-- ----------------------------
-- Records of "icons"
-- ----------------------------
INSERT INTO "icons" VALUES (1, 'el-icon-platform-eleme');
INSERT INTO "icons" VALUES (2, 'el-icon-eleme');
INSERT INTO "icons" VALUES (3, 'el-icon-delete-solid');
INSERT INTO "icons" VALUES (4, 'el-icon-delete');
INSERT INTO "icons" VALUES (5, 'el-icon-s-tools');
INSERT INTO "icons" VALUES (6, 'el-icon-setting');
INSERT INTO "icons" VALUES (7, 'el-icon-user-solid');
INSERT INTO "icons" VALUES (8, 'el-icon-user');
INSERT INTO "icons" VALUES (9, 'el-icon-phone');
INSERT INTO "icons" VALUES (10, 'el-icon-phone-outline');
INSERT INTO "icons" VALUES (11, 'el-icon-more');
INSERT INTO "icons" VALUES (12, 'el-icon-more-outline');
INSERT INTO "icons" VALUES (13, 'el-icon-star-on');
INSERT INTO "icons" VALUES (14, 'el-icon-star-off');
INSERT INTO "icons" VALUES (15, 'el-icon-s-goods');
INSERT INTO "icons" VALUES (16, 'el-icon-goods');
INSERT INTO "icons" VALUES (17, 'el-icon-warning');
INSERT INTO "icons" VALUES (18, 'el-icon-warning-outline');
INSERT INTO "icons" VALUES (19, 'el-icon-question');
INSERT INTO "icons" VALUES (20, 'el-icon-info');
INSERT INTO "icons" VALUES (21, 'el-icon-remove');
INSERT INTO "icons" VALUES (22, 'el-icon-circle-plus');
INSERT INTO "icons" VALUES (23, 'el-icon-success');
INSERT INTO "icons" VALUES (24, 'el-icon-error');
INSERT INTO "icons" VALUES (25, 'el-icon-zoom-in');
INSERT INTO "icons" VALUES (26, 'el-icon-zoom-out');
INSERT INTO "icons" VALUES (27, 'el-icon-remove-outline');
INSERT INTO "icons" VALUES (28, 'el-icon-circle-plus-outline');
INSERT INTO "icons" VALUES (29, 'el-icon-circle-check');
INSERT INTO "icons" VALUES (30, 'el-icon-circle-close');
INSERT INTO "icons" VALUES (31, 'el-icon-s-help');
INSERT INTO "icons" VALUES (32, 'el-icon-help');
INSERT INTO "icons" VALUES (33, 'el-icon-minus');
INSERT INTO "icons" VALUES (34, 'el-icon-plus');
INSERT INTO "icons" VALUES (35, 'el-icon-check');
INSERT INTO "icons" VALUES (36, 'el-icon-close');
INSERT INTO "icons" VALUES (37, 'el-icon-picture');
INSERT INTO "icons" VALUES (38, 'el-icon-picture-outline');
INSERT INTO "icons" VALUES (39, 'el-icon-picture-outline-round');
INSERT INTO "icons" VALUES (40, 'el-icon-upload');
INSERT INTO "icons" VALUES (41, 'el-icon-upload2');
INSERT INTO "icons" VALUES (42, 'el-icon-download');
INSERT INTO "icons" VALUES (43, 'el-icon-camera-solid');
INSERT INTO "icons" VALUES (44, 'el-icon-camera');
INSERT INTO "icons" VALUES (45, 'el-icon-video-camera-solid');
INSERT INTO "icons" VALUES (46, 'el-icon-video-camera');
INSERT INTO "icons" VALUES (47, 'el-icon-message-solid');
INSERT INTO "icons" VALUES (48, 'el-icon-bell');
INSERT INTO "icons" VALUES (49, 'el-icon-s-cooperation');
INSERT INTO "icons" VALUES (50, 'el-icon-s-order');
INSERT INTO "icons" VALUES (51, 'el-icon-s-platform');
INSERT INTO "icons" VALUES (52, 'el-icon-s-fold');
INSERT INTO "icons" VALUES (53, 'el-icon-s-unfold');
INSERT INTO "icons" VALUES (54, 'el-icon-s-operation');
INSERT INTO "icons" VALUES (55, 'el-icon-s-promotion');
INSERT INTO "icons" VALUES (56, 'el-icon-s-home');
INSERT INTO "icons" VALUES (57, 'el-icon-s-release');
INSERT INTO "icons" VALUES (58, 'el-icon-s-ticket');
INSERT INTO "icons" VALUES (59, 'el-icon-s-management');
INSERT INTO "icons" VALUES (60, 'el-icon-s-open');
INSERT INTO "icons" VALUES (61, 'el-icon-s-shop');
INSERT INTO "icons" VALUES (62, 'el-icon-s-marketing');
INSERT INTO "icons" VALUES (63, 'el-icon-s-flag');
INSERT INTO "icons" VALUES (64, 'el-icon-s-comment');
INSERT INTO "icons" VALUES (65, 'el-icon-s-finance');
INSERT INTO "icons" VALUES (66, 'el-icon-s-claim');
INSERT INTO "icons" VALUES (67, 'el-icon-s-custom');
INSERT INTO "icons" VALUES (68, 'el-icon-s-opportunity');
INSERT INTO "icons" VALUES (69, 'el-icon-s-data');
INSERT INTO "icons" VALUES (70, 'el-icon-s-check');
INSERT INTO "icons" VALUES (71, 'el-icon-s-grid');
INSERT INTO "icons" VALUES (72, 'el-icon-menu');
INSERT INTO "icons" VALUES (73, 'el-icon-share');
INSERT INTO "icons" VALUES (74, 'el-icon-d-caret');
INSERT INTO "icons" VALUES (75, 'el-icon-caret-left');
INSERT INTO "icons" VALUES (76, 'el-icon-caret-right');
INSERT INTO "icons" VALUES (77, 'el-icon-caret-bottom');
INSERT INTO "icons" VALUES (78, 'el-icon-caret-top');
INSERT INTO "icons" VALUES (79, 'el-icon-bottom-left');
INSERT INTO "icons" VALUES (80, 'el-icon-bottom-right');
INSERT INTO "icons" VALUES (81, 'el-icon-back');
INSERT INTO "icons" VALUES (82, 'el-icon-right');
INSERT INTO "icons" VALUES (83, 'el-icon-bottom');
INSERT INTO "icons" VALUES (84, 'el-icon-top');
INSERT INTO "icons" VALUES (85, 'el-icon-top-left');
INSERT INTO "icons" VALUES (86, 'el-icon-top-right');
INSERT INTO "icons" VALUES (87, 'el-icon-arrow-left');
INSERT INTO "icons" VALUES (88, 'el-icon-arrow-right');
INSERT INTO "icons" VALUES (89, 'el-icon-arrow-down');
INSERT INTO "icons" VALUES (90, 'el-icon-arrow-up');
INSERT INTO "icons" VALUES (91, 'el-icon-d-arrow-left');
INSERT INTO "icons" VALUES (92, 'el-icon-d-arrow-right');
INSERT INTO "icons" VALUES (93, 'el-icon-video-pause');
INSERT INTO "icons" VALUES (94, 'el-icon-video-play');
INSERT INTO "icons" VALUES (95, 'el-icon-refresh');
INSERT INTO "icons" VALUES (96, 'el-icon-refresh-right');
INSERT INTO "icons" VALUES (97, 'el-icon-refresh-left');
INSERT INTO "icons" VALUES (98, 'el-icon-finished');
INSERT INTO "icons" VALUES (99, 'el-icon-sort');
INSERT INTO "icons" VALUES (100, 'el-icon-sort-up');
INSERT INTO "icons" VALUES (101, 'el-icon-sort-down');
INSERT INTO "icons" VALUES (102, 'el-icon-rank');
INSERT INTO "icons" VALUES (103, 'el-icon-loading');
INSERT INTO "icons" VALUES (104, 'el-icon-view');
INSERT INTO "icons" VALUES (105, 'el-icon-c-scale-to-original');
INSERT INTO "icons" VALUES (106, 'el-icon-date');
INSERT INTO "icons" VALUES (107, 'el-icon-edit');
INSERT INTO "icons" VALUES (108, 'el-icon-edit-outline');
INSERT INTO "icons" VALUES (109, 'el-icon-folder');
INSERT INTO "icons" VALUES (110, 'el-icon-folder-opened');
INSERT INTO "icons" VALUES (111, 'el-icon-folder-add');
INSERT INTO "icons" VALUES (112, 'el-icon-folder-remove');
INSERT INTO "icons" VALUES (113, 'el-icon-folder-delete');
INSERT INTO "icons" VALUES (114, 'el-icon-folder-checked');
INSERT INTO "icons" VALUES (115, 'el-icon-tickets');
INSERT INTO "icons" VALUES (116, 'el-icon-document-remove');
INSERT INTO "icons" VALUES (117, 'el-icon-document-delete');
INSERT INTO "icons" VALUES (118, 'el-icon-document-copy');
INSERT INTO "icons" VALUES (119, 'el-icon-document-checked');
INSERT INTO "icons" VALUES (120, 'el-icon-document');
INSERT INTO "icons" VALUES (121, 'el-icon-document-add');
INSERT INTO "icons" VALUES (122, 'el-icon-printer');
INSERT INTO "icons" VALUES (123, 'el-icon-paperclip');
INSERT INTO "icons" VALUES (124, 'el-icon-takeaway-box');
INSERT INTO "icons" VALUES (125, 'el-icon-search');
INSERT INTO "icons" VALUES (126, 'el-icon-monitor');
INSERT INTO "icons" VALUES (127, 'el-icon-attract');
INSERT INTO "icons" VALUES (128, 'el-icon-mobile');
INSERT INTO "icons" VALUES (129, 'el-icon-scissors');
INSERT INTO "icons" VALUES (130, 'el-icon-umbrella');
INSERT INTO "icons" VALUES (131, 'el-icon-headset');
INSERT INTO "icons" VALUES (132, 'el-icon-brush');
INSERT INTO "icons" VALUES (133, 'el-icon-mouse');
INSERT INTO "icons" VALUES (134, 'el-icon-coordinate');
INSERT INTO "icons" VALUES (135, 'el-icon-magic-stick');
INSERT INTO "icons" VALUES (136, 'el-icon-reading');
INSERT INTO "icons" VALUES (137, 'el-icon-data-line');
INSERT INTO "icons" VALUES (138, 'el-icon-data-board');
INSERT INTO "icons" VALUES (139, 'el-icon-pie-chart');
INSERT INTO "icons" VALUES (140, 'el-icon-data-analysis');
INSERT INTO "icons" VALUES (141, 'el-icon-collection-tag');
INSERT INTO "icons" VALUES (142, 'el-icon-film');
INSERT INTO "icons" VALUES (143, 'el-icon-suitcase');
INSERT INTO "icons" VALUES (144, 'el-icon-suitcase-1');
INSERT INTO "icons" VALUES (145, 'el-icon-receiving');
INSERT INTO "icons" VALUES (146, 'el-icon-collection');
INSERT INTO "icons" VALUES (147, 'el-icon-files');
INSERT INTO "icons" VALUES (148, 'el-icon-notebook-1');
INSERT INTO "icons" VALUES (149, 'el-icon-notebook-2');
INSERT INTO "icons" VALUES (150, 'el-icon-toilet-paper');
INSERT INTO "icons" VALUES (151, 'el-icon-office-building');
INSERT INTO "icons" VALUES (152, 'el-icon-school');
INSERT INTO "icons" VALUES (153, 'el-icon-table-lamp');
INSERT INTO "icons" VALUES (154, 'el-icon-house');
INSERT INTO "icons" VALUES (155, 'el-icon-no-smoking');
INSERT INTO "icons" VALUES (156, 'el-icon-smoking');
INSERT INTO "icons" VALUES (157, 'el-icon-shopping-cart-full');
INSERT INTO "icons" VALUES (158, 'el-icon-shopping-cart-1');
INSERT INTO "icons" VALUES (159, 'el-icon-shopping-cart-2');
INSERT INTO "icons" VALUES (160, 'el-icon-shopping-bag-1');
INSERT INTO "icons" VALUES (161, 'el-icon-shopping-bag-2');
INSERT INTO "icons" VALUES (162, 'el-icon-sold-out');
INSERT INTO "icons" VALUES (163, 'el-icon-sell');
INSERT INTO "icons" VALUES (164, 'el-icon-present');
INSERT INTO "icons" VALUES (165, 'el-icon-box');
INSERT INTO "icons" VALUES (166, 'el-icon-bank-card');
INSERT INTO "icons" VALUES (167, 'el-icon-money');
INSERT INTO "icons" VALUES (168, 'el-icon-coin');
INSERT INTO "icons" VALUES (169, 'el-icon-wallet');
INSERT INTO "icons" VALUES (170, 'el-icon-discount');
INSERT INTO "icons" VALUES (171, 'el-icon-price-tag');
INSERT INTO "icons" VALUES (172, 'el-icon-news');
INSERT INTO "icons" VALUES (173, 'el-icon-guide');
INSERT INTO "icons" VALUES (174, 'el-icon-male');
INSERT INTO "icons" VALUES (175, 'el-icon-female');
INSERT INTO "icons" VALUES (176, 'el-icon-thumb');
INSERT INTO "icons" VALUES (177, 'el-icon-cpu');
INSERT INTO "icons" VALUES (178, 'el-icon-link');
INSERT INTO "icons" VALUES (179, 'el-icon-connection');
INSERT INTO "icons" VALUES (180, 'el-icon-open');
INSERT INTO "icons" VALUES (181, 'el-icon-turn-off');
INSERT INTO "icons" VALUES (182, 'el-icon-set-up');
INSERT INTO "icons" VALUES (183, 'el-icon-chat-round');
INSERT INTO "icons" VALUES (184, 'el-icon-chat-line-round');
INSERT INTO "icons" VALUES (185, 'el-icon-chat-square');
INSERT INTO "icons" VALUES (186, 'el-icon-chat-dot-round');
INSERT INTO "icons" VALUES (187, 'el-icon-chat-dot-square');
INSERT INTO "icons" VALUES (188, 'el-icon-chat-line-square');
INSERT INTO "icons" VALUES (189, 'el-icon-message');
INSERT INTO "icons" VALUES (190, 'el-icon-postcard');
INSERT INTO "icons" VALUES (191, 'el-icon-position');
INSERT INTO "icons" VALUES (192, 'el-icon-turn-off-microphone');
INSERT INTO "icons" VALUES (193, 'el-icon-microphone');
INSERT INTO "icons" VALUES (194, 'el-icon-close-notification');
INSERT INTO "icons" VALUES (195, 'el-icon-bangzhu');
INSERT INTO "icons" VALUES (196, 'el-icon-time');
INSERT INTO "icons" VALUES (197, 'el-icon-odometer');
INSERT INTO "icons" VALUES (198, 'el-icon-crop');
INSERT INTO "icons" VALUES (199, 'el-icon-aim');
INSERT INTO "icons" VALUES (200, 'el-icon-switch-button');
INSERT INTO "icons" VALUES (201, 'el-icon-full-screen');
INSERT INTO "icons" VALUES (202, 'el-icon-copy-document');
INSERT INTO "icons" VALUES (203, 'el-icon-mic');
INSERT INTO "icons" VALUES (204, 'el-icon-stopwatch');
INSERT INTO "icons" VALUES (205, 'el-icon-medal-1');
INSERT INTO "icons" VALUES (206, 'el-icon-medal');
INSERT INTO "icons" VALUES (207, 'el-icon-trophy');
INSERT INTO "icons" VALUES (208, 'el-icon-trophy-1');
INSERT INTO "icons" VALUES (209, 'el-icon-first-aid-kit');
INSERT INTO "icons" VALUES (210, 'el-icon-discover');
INSERT INTO "icons" VALUES (211, 'el-icon-place');
INSERT INTO "icons" VALUES (212, 'el-icon-location');
INSERT INTO "icons" VALUES (213, 'el-icon-location-outline');
INSERT INTO "icons" VALUES (214, 'el-icon-location-information');
INSERT INTO "icons" VALUES (215, 'el-icon-add-location');
INSERT INTO "icons" VALUES (216, 'el-icon-delete-location');
INSERT INTO "icons" VALUES (217, 'el-icon-map-location');
INSERT INTO "icons" VALUES (218, 'el-icon-alarm-clock');
INSERT INTO "icons" VALUES (219, 'el-icon-timer');
INSERT INTO "icons" VALUES (220, 'el-icon-watch-1');
INSERT INTO "icons" VALUES (221, 'el-icon-watch');
INSERT INTO "icons" VALUES (222, 'el-icon-lock');
INSERT INTO "icons" VALUES (223, 'el-icon-unlock');
INSERT INTO "icons" VALUES (224, 'el-icon-key');
INSERT INTO "icons" VALUES (225, 'el-icon-service');
INSERT INTO "icons" VALUES (226, 'el-icon-mobile-phone');
INSERT INTO "icons" VALUES (227, 'el-icon-bicycle');
INSERT INTO "icons" VALUES (228, 'el-icon-truck');
INSERT INTO "icons" VALUES (229, 'el-icon-ship');
INSERT INTO "icons" VALUES (230, 'el-icon-basketball');
INSERT INTO "icons" VALUES (231, 'el-icon-football');
INSERT INTO "icons" VALUES (232, 'el-icon-soccer');
INSERT INTO "icons" VALUES (233, 'el-icon-baseball');
INSERT INTO "icons" VALUES (234, 'el-icon-wind-power');
INSERT INTO "icons" VALUES (235, 'el-icon-light-rain');
INSERT INTO "icons" VALUES (236, 'el-icon-lightning');
INSERT INTO "icons" VALUES (237, 'el-icon-heavy-rain');
INSERT INTO "icons" VALUES (238, 'el-icon-sunrise');
INSERT INTO "icons" VALUES (239, 'el-icon-sunrise-1');
INSERT INTO "icons" VALUES (240, 'el-icon-sunset');
INSERT INTO "icons" VALUES (241, 'el-icon-sunny');
INSERT INTO "icons" VALUES (242, 'el-icon-cloudy');
INSERT INTO "icons" VALUES (243, 'el-icon-partly-cloudy');
INSERT INTO "icons" VALUES (244, 'el-icon-cloudy-and-sunny');
INSERT INTO "icons" VALUES (245, 'el-icon-moon');
INSERT INTO "icons" VALUES (246, 'el-icon-moon-night');
INSERT INTO "icons" VALUES (247, 'el-icon-dish');
INSERT INTO "icons" VALUES (248, 'el-icon-dish-1');
INSERT INTO "icons" VALUES (249, 'el-icon-food');
INSERT INTO "icons" VALUES (250, 'el-icon-chicken');
INSERT INTO "icons" VALUES (251, 'el-icon-fork-spoon');
INSERT INTO "icons" VALUES (252, 'el-icon-knife-fork');
INSERT INTO "icons" VALUES (253, 'el-icon-burger');
INSERT INTO "icons" VALUES (254, 'el-icon-tableware');
INSERT INTO "icons" VALUES (255, 'el-icon-sugar');
INSERT INTO "icons" VALUES (256, 'el-icon-dessert');
INSERT INTO "icons" VALUES (257, 'el-icon-ice-cream');
INSERT INTO "icons" VALUES (258, 'el-icon-hot-water');
INSERT INTO "icons" VALUES (259, 'el-icon-water-cup');
INSERT INTO "icons" VALUES (260, 'el-icon-coffee-cup');
INSERT INTO "icons" VALUES (261, 'el-icon-cold-drink');
INSERT INTO "icons" VALUES (262, 'el-icon-goblet');
INSERT INTO "icons" VALUES (263, 'el-icon-goblet-full');
INSERT INTO "icons" VALUES (264, 'el-icon-goblet-square');
INSERT INTO "icons" VALUES (265, 'el-icon-goblet-square-full');
INSERT INTO "icons" VALUES (266, 'el-icon-refrigerator');
INSERT INTO "icons" VALUES (267, 'el-icon-grape');
INSERT INTO "icons" VALUES (268, 'el-icon-watermelon');
INSERT INTO "icons" VALUES (269, 'el-icon-cherry');
INSERT INTO "icons" VALUES (270, 'el-icon-apple');
INSERT INTO "icons" VALUES (271, 'el-icon-pear');
INSERT INTO "icons" VALUES (272, 'el-icon-orange');
INSERT INTO "icons" VALUES (273, 'el-icon-coffee');
INSERT INTO "icons" VALUES (274, 'el-icon-ice-tea');
INSERT INTO "icons" VALUES (275, 'el-icon-ice-drink');
INSERT INTO "icons" VALUES (276, 'el-icon-milk-tea');
INSERT INTO "icons" VALUES (277, 'el-icon-potato-strips');
INSERT INTO "icons" VALUES (278, 'el-icon-lollipop');
INSERT INTO "icons" VALUES (279, 'el-icon-ice-cream-square');
INSERT INTO "icons" VALUES (280, 'el-icon-ice-cream-round');

-- ----------------------------
-- Auto increment value for icons
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 280 WHERE name = 'icons';

PRAGMA foreign_keys = true;
