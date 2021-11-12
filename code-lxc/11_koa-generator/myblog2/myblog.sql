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

 Date: 12/11/2021 20:19:41
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
  `cate_id` int(11) NULL DEFAULT NULL COMMENT '分类表外键',
  PRIMARY KEY (`blog_id`) USING BTREE,
  INDEX `user_blog_user_id_fk`(`user_id`) USING BTREE,
  INDEX `category_blog_cate_id_fk`(`cate_id`) USING BTREE,
  CONSTRAINT `category_blog_cate_id_fk` FOREIGN KEY (`cate_id`) REFERENCES `t_catgory` (`cate_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_blog_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_catgory
-- ----------------------------
DROP TABLE IF EXISTS `t_catgory`;
CREATE TABLE `t_catgory`  (
  `cate_id` int(11) NOT NULL,
  `cate_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '分类名称',
  PRIMARY KEY (`cate_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_comment
-- ----------------------------
DROP TABLE IF EXISTS `t_comment`;
CREATE TABLE `t_comment`  (
  `comm_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '评论内容',
  `create_time` timestamp(0) NULL DEFAULT NULL COMMENT '评论时间',
  `user_id` int(11) NULL DEFAULT NULL,
  `blog_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`comm_id`) USING BTREE,
  INDEX `user_comment_user_id_fk`(`user_id`) USING BTREE,
  INDEX `blog_comment_blog_id_fk`(`blog_id`) USING BTREE,
  CONSTRAINT `blog_comment_blog_id_fk` FOREIGN KEY (`blog_id`) REFERENCES `t_blog` (`blog_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_comment_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
