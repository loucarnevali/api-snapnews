import {
  createService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  deleteNewsService,
  likeNewsService,
  deleteLikeNewsService,
  addCommentService,
  deleteCommentService,
} from '../services/news.service.js';

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    // Check if required fields are provided
    if (!title || !text || !banner) {
      res.status(400).send({ message: 'Submit All Fields For Registration' });
    }

    // Create news using service function
    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findAllNews = async (req, res) => {
  try {
    //Pagination parameters
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    // Find all news using service function
    const news = await findAllService(offset, limit);
    const total = await countNews();
    const currentUrl = req.baseUrl;

    //Pagination URLs
    const next = offset + limit;
    const nextURL =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({ message: 'There Are No Registered News' });
    }

    // Send response with pagination data and news
    res.send({
      nextURL,
      previousUrl,
      limit,
      offset,
      total,

      results: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const topNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news) {
      return res.status(400).send({ message: 'There Is No Registered News' });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await findByIdService(id);

    // Send response with found news
    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleService(title);

    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: 'There Are No News With This Title' });
    }

    return res.send({
      results: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);

    return res.send({
      results: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      return res
        .status(400)
        .send({ message: 'Submit At Least One Field To Update The News' });
    }

    // Check if the user is authorized to update the news
    const news = await findByIdService(id);
    if (String(news.user._id) !== req.userId) {
      return res.status(400).send({ message: "You Can't Update This News" });
    }

    // Update news using service function
    await updateService(id, title, text, banner);

    return res.send({ message: 'News Successfully Updated!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user is authorized to delete the news
    const news = await findByIdService(id);
    if (String(news.user._id) !== req.userId) {
      return res.status(400).send({ message: "You Can't Delete This News" });
    }

    // Delete news using service function
    await deleteNewsService(id);

    return res.send({ message: 'News Successfully Deleted! ' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Like or unlike news using service functions
    const newsLiked = await likeNewsService(id, userId);

    if (!newsLiked) {
      await deleteLikeNewsService(id, userId);
      return res.status(200).send({ message: 'Unliked Successfully' });
    }

    res.send({ message: 'Liked Done Successfully!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: 'Write A Message To Comment' });
    }

    await addCommentService(id, comment, userId);

    return res.send({ message: 'Comment Successfully Completed!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await deleteCommentService(
      idNews,
      idComment,
      userId,
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment,
    );

    if (!commentFinder) {
      return res.status(404).send({ message: 'Comment Not Found' });
    }

    if (commentFinder.userId !== userId) {
      return res.status(400).send({ message: "You Can't Delete This Comment" });
    }

    res.send({ message: 'Comment Successfully Deleted !' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
