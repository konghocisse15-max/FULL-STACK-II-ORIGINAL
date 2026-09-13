package com.example.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Post;

public interface PostRepository extends MongoRepository<Post, String> {

    Page<Post> findByAuthorContainingIgnoreCase(
            String author,
            Pageable pageable
    );

    Page<Post> findByTitleContainingIgnoreCase(
            String title,
            Pageable pageable
    );
}
