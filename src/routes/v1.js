'use strict';

const express = require('express');
const blogPostModels = require('../models');

const router = express.Router();

//middleware to set route params
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (blogPostModels[modelName]) {
    req.model = blogPostModels[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

//Route to blog post (all, sinlge post by id, create new, update, delete all by id)
router.get('/:blog-posts', handleGetAll);
router.get('/:blog-posts/:id', handleGetOne);
router.post('/:blog-posts', handleCreate);
router.put('/:blog-posts/:id', handleUpdate);
router.delete('/:blog-posts/:id', handleDelete);

async function handleGetAll(req, res) {
  let allBlogPosts = await req.model.get();
  res.status(200).json(allBlogPosts);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let blogPost = await req.model.get(id);
  res.status(200).json(blogPost);
}

async function handleCreate(req, res) {
  let blogPostData = req.body;
  let newBlogPost = await req.model.create(blogPostData);
  res.status(201).json(newBlogPost);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const updatedData = req.body;
  let updatedBlogPost = await req.model.update(id, updatedData);
  res.status(200).json(updatedBlogPost);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedBlogPost = await req.model.delete(id);
  res.status(200).json(deletedBlogPost);
}

module.exports = router;
