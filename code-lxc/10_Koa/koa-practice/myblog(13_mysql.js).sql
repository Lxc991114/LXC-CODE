/*
 Navicat Premium Data Transfer

 Source Server         : myblogPractice
 Source Server Type    : MySQL
 Source Server Version : 100417
 Source Host           : localhost:3306
 Source Schema         : myblog

 Target Server Type    : MySQL
 Target Server Version : 100417
 File Encoding         : 65001

 Date: 11/11/2021 16:06:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_blog
-- ----------------------------
DROP TABLE IF EXISTS `t_blog`;
CREATE TABLE `t_blog`  (
  `blog_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '博客id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '文章标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '内容',
  `post_time` timestamp(0) NULL DEFAULT current_timestamp() COMMENT '发布时间',
  `read_count` int(11) NULL DEFAULT NULL COMMENT '阅读数',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户表外键',
  `is_delete` int(11) NULL DEFAULT 0 COMMENT '标识位',
  PRIMARY KEY (`blog_id`) USING BTREE,
  INDEX `user_blog_user_id_fk`(`user_id`) USING BTREE,
  CONSTRAINT `user_blog_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_blog
-- ----------------------------
INSERT INTO `t_blog` VALUES (1, '第一篇文章', NULL, '2021-11-11 15:34:23', 3, 1, 0);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `pass` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `tel` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '手机号',
  `create_time` timestamp(0) NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `is_delete` int(11) NULL DEFAULT 0 COMMENT '标识位',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, 'zhangsan', '', NULL, '2021-11-11 14:42:58', 0);
INSERT INTO `t_user` VALUES (2, 'lisi', '123456', NULL, '2021-11-11 14:43:08', 0);

SET FOREIGN_KEY_CHECKS = 1;
