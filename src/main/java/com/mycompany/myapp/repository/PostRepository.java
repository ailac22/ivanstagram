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

    // final String query =
    //     "select * from entry e join ivs_user i on e.owner_id = i.user_id join rel_ivs_user__ivs_user r on ivs_user_id_followed = i.id where ivs_user_id_following = (Select i.id from ivs_user i join jhi_user j on i.user_id = j.id where j.login = :login)";
    // @Query("select post from Post post join follow f on f.following = (select i.id from jhi_user i where i.login = :login) where post.id = f.followed")

    // @Query("select post from Post post")
    //@Query(value = "select * from post join follows f on f.followed = post.owner_id where f.following = 1", nativeQuery = true)
    // @Query("select post from Post post join fetch post.owner po")
    // @Query(value = "select p.*, (select post_id from rel_post__like) as likecount from post p join follows f on f.following = 2 where p.id = f.followed", nativeQuery = true)

    //@Query("select post from Post post,User user join post.owner pow join user.following user = (select user from User user2 where user2.login = :login)")
    //on post.owner = (select user from User user where user.id = 1)
    // AND (post.owner IN u.following)
    // post.owner IN u.following and
    // ")

    // @Query()
    // List<User> prueba();

    // @Query("select u2.following from User u2 where u2.id = 2")

    // @Query("select distinct post from Post post where post.owner IN (select u2.following from User u2 where u2.id = 1)")
    @Query("select post from Post post,User u2 where post.owner in (select u3 from u2.following u3 where u2.login = :login)")
    List<Post> getFeed(@Param("login") String login);
}
