<template>
    <nav role="navigation" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <!--  Side nav -->
        <div id="sideNav" class="container" ref="sideNav">
            <router-link class="navbar-brand" to="/">Vue Blog</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li v-if="isAdmin || isAuthor">
                        <router-link class="nav-link" to="/articles/new">Create</router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <router-link class="nav-link" to="/profile">Profile</router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <router-link class="nav-link" to="/logout">Logout</router-link>
                    </li>
                    <li v-else class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li v-if="!isLoggedIn" class="nav-item">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {UsersService} from "@/services/local/users.service";

    export default {
        name: "Header",
        data() {
            return {
                isLoggedIn: false,
                isAuthor: false,
                isAdmin: false,
            }
        },
        mounted() {
            UsersService.subscribe(this.onUserStateChanged);
        },
        methods: {
            onUserStateChanged(user) {
                if (user && user.username) {
                    this.isLoggedIn = true;
                    this.isAuthor = user.isAuthor;
                    this.isAdmin = user.isAdmin;
                } else {
                    this.isLoggedIn = false;
                    this.isAdmin = false;
                    this.isAuthor = false;
                }
            },
            logout() {

            }
        },
    }
</script>

<style scoped lang="scss">
    // @import "../styles/home";
</style>
