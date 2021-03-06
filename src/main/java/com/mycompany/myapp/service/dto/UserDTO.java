package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.User;

/**
 * A DTO representing a user, with only the public attributes.
 */
public class UserDTO {

    private Long id;

    private String login;

    private String firstName;

    private String lastName;

    private int numFollowers;

    private int numFollowing;

    private int numPosts;

    private String comment;

    private String link;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserDTO(User user) {
        this.id = user.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.login = user.getLogin();

        this.firstName = user.getFirstName();

        this.lastName = user.getLastName();

        this.numFollowers = user.getNumFollowers();

        this.numFollowing = user.getNumFollowing();

        this.numPosts = user.getNumPosts();

        this.comment = user.getComment();

        this.link = user.getLink();
        // this.comment = user.getComment();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getNumFollowers() {
        return numFollowers;
    }

    public int getNumFollowing() {
        return numFollowing;
    }

    public int getNumPosts() {
        return numPosts;
    }

    public String getComment() {
        return comment;
    }

    public String getLink() {
        return link;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserDTO{" +
            "id='" + id + '\'' +
            ", login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            "}";
    }
}
