
import { Request, Response } from 'express';

import { File } from 'src/config/multer';
import Post from '../models/Post';

export default {

  async index (request: Request, response: Response) {
    const posts = await Post.find();

    return response.json(posts);
  },

  async show (request: Request, response: Response) {
    return response.json({ _text: 'listagem específica' });
  },

  async create (request: Request, response: Response) {
    const { originalname: name, size, key, location: url = "" } = <File>request.file;

    const post = await Post.create({
      name,
      size,
      key,
      url
    });

    return response.json(post);
  },

  async update (request: Request, response: Response) {
    return response.json({ _text: 'atualização' });
  },

  async delete (request: Request, response: Response) {
    const post = await Post.findById(request.params.id);

    if (post) {
      await post.remove();
    }

    return response.send('deleted!');
  },

}

