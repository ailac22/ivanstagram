package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Post;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Post entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "select distinct post from Post post", countQuery = "select count(distinct post) from Post post")
    Page<Post> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct post from Post post")
    List<Post> findAllWithEagerRelationships();

    @Query("select post from Post post where post.id =:id")
    Optional<Post> findOneWithEagerRelationships(@Param("id") Long id);

    @Query(
        "select post from Post post,User u2 where post.owner in (select u3 from u2.following u3 where u2.login = :login) order by post.createdAt desc"
    )
    List<Post> getFeed(@Param("login") String login);

    @Query("select post from Post post where post.owner.login = :user")
    List<Post> findByOwnerIsUser(@Param("user") String user);
}
