<template>
    <div class="post" v-if="article.id">
        <div class="post-header">
            <div class="post-header-profile">
                <img src="../../assets/images/user_generic.png" alt="avatar image"/>
            </div>
            <div class="post-header-author">
                <div class="post-header-author-name"><span id="author-name">{{article.user.username}}</span></div>
                <div class="post-header-post-summary"><span id="post-description">{{article.created_at}}</span>
                </div>
            </div>
        </div>
        <div class="post-description">
            <div class="post-description-title">
                <h1>{{article.title}}</h1>
            </div>
            <div class="post-description-subtitle">
                <h2>{{article.description}}</h2>
            </div>
            <div class="post-description-cover" v-if="image.url">
                <img :src="image.url" id="cover-photo" alt="article's featured image"/>
            </div>
        </div>
        <div class="post-content">
            {{article.body}}
            <div class="post-content-tags">
                <ul>
                    <li v-for="(tag, index) in article.tags" :key="index">
                        <router-link :to="`/articles/by_tag/${tag.slug}`">{{tag.name}}</router-link>
                    </li>
                    <!-- the index should be different from the tags, so add tags.length as base to make them different -->
                    <li v-for="(category, index) in article.categories" :key="index + article.tags.length">
                        <router-link :to="`/articles/by_category/${category.slug}`">{{category.name}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="post-content-divider"></div>
        </div>

        <div class="post-divider"></div>
        <div class="post-comment">
            <div class="post-comment-header"><span>Comments</span></div>
            <div v-if="isAuthenticated" class="post-comment-input">
                <div class="post-comment-input-profile">
                    <img src="../../assets/images/user_generic.png"
                         id="comment-profile" alt="user's profile image"/></div>
                <div class="post-comment-input-field">
                    <textarea placeholder="Write a comment" v-model="commentData"></textarea>
                </div>
            </div>
            <div v-if="isAuthenticated" class="post-comment-button">
                <button @click="postComment">Publish</button>
            </div>
            <div v-if="!isAuthenticated" class="post-comment-button">
                <router-link class="btn btn-success" to="/login">Login</router-link>
                &nbsp;
                <router-link class="btn btn-info" to="/login">Register</router-link>
            </div>
            <div class="post-comment-container">
                <div v-for="(comment,index) in article.comments" :key="index"
                     class="post-comment-container-individual">
                    <div class="post-comment-container-individual-profile">
                        <img src="../../assets/images/user_generic.png" alt="user's profile image"/></div>
                    <div class="post-comment-container-individual-content">
                        <div class="post-comment-container-individual-content-message">
                            <p>
                                <span id="comment-name">{{comment.user.username}}</span>
                                {{comment.content}}
                            </p>
                        </div>
                        <div class="post-comment-container-individual-content-information"><span
                                id="like">Date</span><span id="date">• {{comment.created_at}}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ArticleAxiosService} from "@/services/remote/articles.axios.service";
    import {UsersService} from "@/services/local/users.service";
    import {CommentsAxiosService} from "@/services/remote/comments-axios.service";

    export default {
        name: 'ArticleDetails',
        props: ['slug'],
        data() {
            return {article: {}, commentData: '', image: {}, isAuthenticated: false}
        },
        mounted() {
            this.fetchBySlug(this.$router.currentRoute.params.slug);
            UsersService.subscribe(this.onUserStateChanged);
        },

        methods: {
            onUserStateChanged(user) {
                if (user && user.username) {
                    this.isAuthenticated = true;
                }
            },
            fetchBySlug(slug) {
                ArticleAxiosService.fetchBySlug(slug)
                    .then(result => {
                        if (result.success) {
                            this.article = {...result};
                            // TODO: parse the article and look if we have at least one image, in that case save it
                            // in $data.image
                        }
                    }).catch(err => {

                });
            },

            postComment() {
                const slug = this.$router.currentRoute.params.slug;
                CommentsAxiosService.create(slug, this.commentData).then(res => {
                    if (res.success) {
                        if (this.article.comments == null)
                            this.article.comments = [];
                        this.article.comments.push(res.comment);
                        this.commentData = '';
                    }
                })
            }
        },

    };
</script>

<style scoped lang="scss">
    @import "../../styles/post";
</style>
