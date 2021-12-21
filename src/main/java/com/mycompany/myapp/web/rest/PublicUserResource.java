package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.config.Constants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.service.dto.UserDTO;
import java.util.*;
import java.util.Collections;
import javax.validation.constraints.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.PaginationUtil;

@RestController
@RequestMapping("/api")
public class PublicUserResource {

    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList("id", "login", "firstName", "lastName", "email", "activated", "langKey")
    );

    private final Logger log = LoggerFactory.getLogger(PublicUserResource.class);

    private final UserService userService;

    // It is a type in case we want to create private profiles in the future

    public PublicUserResource(UserService userService) {
        this.userService = userService;
    }

    /**
     * {@code GET /users} : get all users with only the public informations - calling this are allowed for anyone.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all users.
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllPublicUsers(Pageable pageable) {
        log.debug("REST request to get all public User names");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<UserDTO> page = userService.getAllPublicUsers(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    @GetMapping("/user/{login}")
    public UserDTO getUser(@PathVariable @Pattern(regexp = Constants.LOGIN_REGEX) String login) {
        return userService.getPublicUser(login).get(); //!!!!!
    }

    /**
     * Gets a list of all roles.
     * @return a string list of all roles.
     */
    @GetMapping("/authorities")
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    @PostMapping("/follow/{user}")
    public UserService.FollowState followUser(@PathVariable(value = "user") String login) {
        String currentUser = SecurityUtils.getCurrentUserLogin().get();

        userService.followUser(currentUser, login);

        return UserService.FollowState.FOLLOWING;
    }

    @PostMapping("/unfollow/{user}")
    public UserService.FollowState unfollowUser(@PathVariable(value = "user") String login) {
        String currentUser = SecurityUtils.getCurrentUserLogin().get();

        userService.unfollowUser(currentUser, login);

        return UserService.FollowState.TO_FOLLOW;
    }

    @GetMapping("/follow/{user}")
    public ResponseEntity<UserService.FollowState> isFollowingUser(@PathVariable(value = "user") String login) {
        String currentUser = SecurityUtils.getCurrentUserLogin().get();

        UserService.FollowState f = userService.getFollowState(currentUser, login);

        return new ResponseEntity<>(f, HttpStatus.OK);
    }
    // @GetMapping("/topRecommended")
    // public ResponseEntity<List<UserDTO>> topRecommended(){

    //    return ResponseEntity.ok(userService.getTopRecommended());
    // }
}
