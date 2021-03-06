package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.PostRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Post}.
 */
@Service
@Transactional
public class PostService {

    private final Logger log = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;

    private final UserService userService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;

        this.userService = userService;
    }

    /**
     * Save a post.
     *
     * @param post the entity to save.
     * @return the persisted entity.
     */
    public Post save(Post post) {
        log.debug("Request to save Post : {}", post);

        User user = userService.getCurrentUser();
        post.setOwner(user);

        return postRepository.save(post);
    }

    /**
     * Partially update a post.
     *
     * @param post the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Post> partialUpdate(Post post) {
        log.debug("Request to partially update Post : {}", post);

        return postRepository
            .findById(post.getId())
            .map(existingPost -> {
                if (post.getImage() != null) {
                    existingPost.setImage(post.getImage());
                }
                if (post.getImageContentType() != null) {
                    existingPost.setImageContentType(post.getImageContentType());
                }
                if (post.getCreatedAt() != null) {
                    // existingPost.setCreatedAt(post.getCreatedAt());
                }

                return existingPost;
            })
            .map(postRepository::save);
    }

    /**
     * Get all the posts.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Post> findAll() {
        log.debug("Request to get all Posts");
        return postRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the posts with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Post> findAllWithEagerRelationships(Pageable pageable) {
        return postRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one post by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Post> findOne(Long id) {
        log.debug("Request to get Post : {}", id);
        return postRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the post by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Post : {}", id);
        postRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Post> getFeed() {
        String login = SecurityUtils.getCurrentUserLogin().get();

        List<Post> result = postRepository.getFeed(login);
        return result;
    }

    @Transactional(readOnly = true)
    public List<Post> findByUser(String user) {
        return postRepository.findByOwnerIsUser(user);
    }

    public void likePost(Long postId) {
        this.findOne(postId)
            .ifPresentOrElse(
                post -> {
                    User user = userService.getCurrentUser();
                    post.addLike(user);
                    postRepository.save(post);
                },
                () -> {
                    throw new BadRequestAlertException("Not found", "Post", "");
                }
            );
    }

    public void unlikePost(Long postId) {
        this.findOne(postId)
            .ifPresentOrElse(
                post -> {
                    User user = userService.getCurrentUser();
                    post.removeLike(user);
                    postRepository.save(post);
                },
                () -> {
                    throw new BadRequestAlertException("Not found", "Post", "");
                }
            );
    }

    public boolean isPostLiked(Long postId) {
        var post = this.findOne(postId);
        if (post.isPresent()) {
            User user = userService.getCurrentUser();
            return post.get().getLikes().contains(user);
        } else throw new BadRequestAlertException("Not found", "Post", "");
    }
}
