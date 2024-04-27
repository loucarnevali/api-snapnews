import postRepositories from '../repositories/post.repositories.js';

async function createPostService({ title, banner, text }, userId) {}

async function findAllPostsService(limit, offset, currentUrl) {}

async function topNewsService() {}

async function searchPostService(title) {}

async function findPostByIdService(id) {}

async function findPostsByUserIdService(id) {}

async function updatePostService(id, title, banner, text, userId) {}

async function deletePostService(id, userId) {}

async function likePostService(id, userId) {}

async function commentPostService(postId, message, userId) {}

async function commentDeletePostService(postId, userId, idComment) {}

export default {
  createPostService,
  findAllPostsService,
  topNewsService,
  searchPostService,
  findPostByIdService,
  findPostsByUserIdService,
  updatePostService,
  deletePostService,
  likePostService,
  commentPostService,
  commentDeletePostService,
};
