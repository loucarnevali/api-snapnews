import Post from '../models/Post.js';

//To create a new post
function createPostRepository(title, banner, text, userId) {
  return Post.create({ title, banner, text, user: userId });
}

//To find all posts with pagination
function findAllPostsRepository(offset, limit) {
  return Post.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate('user'); // Populate the 'user' field to include user details in the result
}

//To find the latest post
function topNewsRepository() {
  return Post.findOne().sort({ _id: -1 }).populate('user');
}

//To find a post by ID
function findPostByIdRepository(id) {
  return Post.findById(id).populate('user');
}

//To count total posts
function countPosts() {
  return Post.countDocuments();
}

//To search for posts by title (case-insensitive)
function searchPostRepository(title) {
  return Post.find({
    title: { $regex: `${title || ''}`, $options: 'i' },
  })
    .sort({ _id: -1 })
    .populate('user');
}

//To find posts by user ID
function findPostsByUserIdRepository(id) {
  return Post.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate('user');
}

//To update a post by ID
function updatePostRepository(id, title, banner, text) {
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      banner,
      text,
    },
    {
      rawResult: true,
    },
  );
}

//To delete a post by ID
function deletePostRepository(id) {
  return Post.findOneAndDelete({ _id: id });
}

//To add a like to a post
async function likesRepository(id, userId) {
  try {
    return await Post.findOneAndUpdate(
      {
        _id: id,
        'likes.userId': { $nin: [userId] },
      },
      {
        $push: {
          likes: { userId, created: new Date() },
        },
      },
      {
        new: true,
      },
    );
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
}

//To remove a like from a post
async function likesDeleteRepository(id, userId) {
  // console.log(`Removing like for post ${id} and user ${userId}`);
  try {
    const result = await Post.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          likes: { userId: userId },
        },
      },
    );
    // console.log('Like removal result:', result);
    return result;
  } catch (error) {
    // console.error('Error removing like:', error);
    throw error;
  }
}

//To add a comment to a post
function commentsRepository(id, message, userId) {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { idComment, userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    },
  );
}

//To remove a comment from a post
function commentsDeleteRepository(id, userId, idComment) {
  return Post.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    },
  );
}

export default {
  createPostRepository,
  findAllPostsRepository,
  topNewsRepository,
  findPostByIdRepository,
  searchPostRepository,
  findPostsByUserIdRepository,
  updatePostRepository,
  deletePostRepository,
  likesRepository,
  likesDeleteRepository,
  commentsRepository,
  commentsDeleteRepository,
  countPosts,
};
