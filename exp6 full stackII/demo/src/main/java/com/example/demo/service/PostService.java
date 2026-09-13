package com.example.demo.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PostDTO;
import com.example.demo.exception.PostNotFoundException;
import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

    private static final Logger logger =
            LoggerFactory.getLogger(PostService.class);

    private final PostRepository repository;


    // GET ALL POSTS
    public List<Post> getAllPosts() {

        logger.info("Fetching all posts");

        List<Post> posts = repository.findAll();

        logger.info("Successfully fetched {} posts", posts.size());

        return posts;
    }


    // GET PAGINATED AND SORTED POSTS
    public Page<Post> getAllPosts(Pageable pageable) {

        logger.info(
                "Fetching posts - page: {}, size: {}, sort: {}",
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSort()
        );

        Page<Post> posts = repository.findAll(pageable);

        logger.info(
                "Successfully fetched {} posts",
                posts.getNumberOfElements()
        );

        return posts;
    }


    // FILTER BY AUTHOR
    public Page<Post> getPostsByAuthor(
            String author,
            Pageable pageable) {

        logger.info(
                "Filtering posts by author: {}",
                author
        );

        return repository.findByAuthorContainingIgnoreCase(
                author,
                pageable
        );
    }


    // FILTER BY TITLE
    public Page<Post> getPostsByTitle(
            String title,
            Pageable pageable) {

        logger.info(
                "Filtering posts by title: {}",
                title
        );

        return repository.findByTitleContainingIgnoreCase(
                title,
                pageable
        );
    }


    // GET POST BY ID
    public Post getPostById(String id) {

        logger.info("Fetching post with id: {}", id);

        return repository.findById(id)
                .orElseThrow(() -> {

                    logger.error(
                            "Post not found with id: {}",
                            id
                    );

                    return new PostNotFoundException(
                            "Post not found with id: " + id
                    );
                });
    }


    // CREATE POST
    public Post createPost(PostDTO dto) {

        logger.info(
                "Creating a new post with title: {}",
                dto.getTitle()
        );

        Post post = new Post();

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAuthor(dto.getAuthor());

        Post savedPost = repository.save(post);

        logger.info(
                "Post created successfully with id: {}",
                savedPost.getId()
        );

        return savedPost;
    }


    // UPDATE POST
    public Post updatePost(String id, PostDTO dto) {

        logger.info(
                "Updating post with id: {}",
                id
        );

        Post post = getPostById(id);

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAuthor(dto.getAuthor());

        Post updatedPost = repository.save(post);

        logger.info(
                "Post updated successfully with id: {}",
                id
        );

        return updatedPost;
    }


    // DELETE POST
    public void deletePost(String id) {

        logger.info(
                "Deleting post with id: {}",
                id
        );

        Post post = getPostById(id);

        repository.delete(post);

        logger.info(
                "Post deleted successfully with id: {}",
                id
        );
    }
}