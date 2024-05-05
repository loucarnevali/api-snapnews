import postService from '../services/post.service.js';

async function createPostController(req, res) {
  const { title, banner, text } = req.body;
  // Extract the authenticated user ID from the request
  const userId = req.userId;

  try {
    // Call the createPostService function from postService to create a new post
    const post = await postService.createPostService(
      { title, banner, text },
      userId,
    );
    return res.status(201).send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

// To find all posts with pagination
async function findAllPostsController(req, res) {
  // Extract the limit and offset parameters from the request query
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    // To retrieve all posts
    const posts = await postService.findAllPostsService(
      limit,
      offset,
      currentUrl,
    );
    return res.send(posts);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

//To retrieve top news/posts
async function topNewsController(req, res) {
  try {
    const post = await postService.topNewsService();
    return res.send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

//To search posts by title
async function searchPostController(req, res) {
  // Extract the title query parameter from the request
  const { title } = req.query;

  try {
    // Call the searchPostService function from postService to search posts by title
    const foundPosts = await postService.searchPostService(title);

    return res.send(foundPosts);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

//To find a post by ID
async function findPostByIdController(req, res) {
  const { id } = req.params;

  try {
    const post = await postService.findPostByIdService(id);
    return res.send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

// To find posts by user ID
async function findPostsByUserIdController(req, res) {
  const id = req.userId;
  try {
    const posts = await postService.findPostsByUserIdService(id);
    return res.send(posts);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

// To update a post
async function updatePostController(req, res) {
  const { title, banner, text } = req.body;
  // Extract the post ID from the request parameters
  const { id } = req.params;
  // Extract the authenticated user ID from the request
  const userId = req.userId;

  try {
    await postService.updatePostService(id, title, banner, text, userId);

    return res.send({ message: 'Post successfully updated!' });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

// To delete a post
async function deletePostController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await postService.deletePostService(id, userId);
    return res.send({ message: 'Post deleted successfully' });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

// To like a post
async function likePostController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    // console.log(`Request to remove like for post ${id} by user ${userId}`);
    const response = await postService.likePostService(id, userId);

    // console.log('Like removal response:', response);

    return res.send(response);
  } catch (e) {
    // console.error('Error in likePostController:', e);
    return res.status(500).send(e.message);
  }
}

//To add a comment to a post
async function commentPostController(req, res) {
  const { id: postId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await postService.commentPostService(postId, message, userId);

    return res.send({
      message: 'Comment successfully completed!',
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

//To delete a comment from a post
async function commentDeletePostController(req, res) {
  const { id: postId, idComment } = req.params;
  const userId = req.userId;

  try {
    await postService.commentDeletePostService(postId, userId, idComment);

    return res.send({ message: 'Comment successfully removed' });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createPostController,
  findAllPostsController,
  topNewsController,
  searchPostController,
  findPostByIdController,
  findPostsByUserIdController,
  updatePostController,
  deletePostController,
  likePostController,
  commentPostController,
  commentDeletePostController,
};
