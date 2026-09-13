package com.example.demo.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.PostDTO;
import com.example.demo.model.Post;
import com.example.demo.service.PostService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService service;


    // GET POSTS WITH PAGINATION, SORTING AND FILTERING
    @GetMapping
    public ResponseEntity<?> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String title) {

        Sort sort;

        if (direction.equalsIgnoreCase("desc")) {
            sort = Sort.by(sortBy).descending();
        } else {
            sort = Sort.by(sortBy).ascending();
        }

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Post> posts;

        // Filter by author
        if (author != null && !author.trim().isEmpty()) {

            posts = service.getPostsByAuthor(author, pageable);

        // Filter by title
        } else if (title != null && !title.trim().isEmpty()) {

            posts = service.getPostsByTitle(title, pageable);

        // No filter
        } else {

            posts = service.getAllPosts(pageable);
        }

        return ResponseEntity.ok(posts);
    }


    // GET POST BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> getPostById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "success",
                        "Fetched post",
                        service.getPostById(id)
                )
        );
    }


    // CREATE POST
    @PostMapping
    public ResponseEntity<ApiResponse<Post>> createPost(
            @Valid @RequestBody PostDTO dto) {

        Post created = service.createPost(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        new ApiResponse<>(
                                "success",
                                "Post created successfully",
                                created
                        )
                );
    }


    // UPDATE POST
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> updatePost(
            @PathVariable String id,
            @Valid @RequestBody PostDTO dto) {

        Post updated = service.updatePost(id, dto);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "success",
                        "Post updated successfully",
                        updated
                )
        );
    }


    // DELETE POST
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @PathVariable String id) {

        service.deletePost(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "success",
                        "Post deleted successfully",
                        null
                )
        );
    }
}