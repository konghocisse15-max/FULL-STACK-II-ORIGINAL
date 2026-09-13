package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping
    public ResponseEntity<ApiResponse<List<Post>>> getAllPosts() {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "success",
                        "Fetched all posts",
                        service.getAllPosts()
                )
        );
    }

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
