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

<style scoped>
    .bordered-box {
        border: 1px solid #E6E6E6;
        background-color: white;
        border-radius: 1px;
        margin: 0; }

    .input-box {
        width: 100%;
        height: 45px;
        background-color: #F9F9F9;
        border: 1px solid #E6E6E6;
        text-indent: 14px;
        font-size: 14px;
        margin-bottom: 10px; }

    .button {
        border: 1px solid #E6E6E6;
        background-color: #3B5998;
        font-size: 14px;
        border-radius: 1px;
        margin: 0;
        color: white;
        height: 40px;
        width: 100%; }

    .clear-button {
        border: 1px solid #E6E6E6;
        background-color: white;
        font-size: 14px;
        width: 100%;
        border-radius: 1px;
        margin: 0;
        height: 40px;
        color: black;
        width: 100%; }

    .bordered-box {
        border: 1px solid #E6E6E6;
        background-color: white;
        border-radius: 1px;
        margin: 0; }

    .input-box {
        width: 100%;
        height: 45px;
        background-color: #F9F9F9;
        border: 1px solid #E6E6E6;
        text-indent: 14px;
        font-size: 14px;
        margin-bottom: 10px; }

    .button {
        border: 1px solid #E6E6E6;
        background-color: #3B5998;
        font-size: 14px;
        border-radius: 1px;
        margin: 0;
        color: white;
        height: 40px;
        width: 100%; }

    .clear-button {
        border: 1px solid #E6E6E6;
        background-color: white;
        font-size: 14px;
        width: 100%;
        border-radius: 1px;
        margin: 0;
        height: 40px;
        color: black;
        width: 100%; }

    .post-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 0;
        margin: 40px 20px 25px 20px; }
    .post-header-profile img {
        width: 60px;
        border-radius: 50%;
        margin-right: 10px; }
    .post-header-author #author-name {
        font-weight: 600;
        font-size: 13px; }
    .post-header-author #author-bio {
        font-weight: 400;
        font-size: 12px; }
    .post-header-author #post-description {
        font-size: 12px;
        color: #717171; }
    .post-description h1, .post-description h2 {
        margin: 0 20px; }
    .post-description h1 {
        font-size: 28px;
        color: #333333; }
    .post-description h2 {
        font-size: 20px;
        margin-top: 10px;
        font-weight: 400;
        line-height: 26px;
        color: #7B7B7B;
        margin-bottom: 20px; }
    .post-description #cover-photo {
        width: 100%;
        padding-bottom: 30px; }
    .post-content {
        margin: 40px 40px 0 40px; }
    .post-content h3 {
        font-size: 24px;
        margin: 40px 0 10px 0; }
    .post-content h4 {
        font-size: 20px; }
    .post-content p {
        font-size: 16px;
        line-height: 32px;
        margin: 15px 0 20px 0; }
    .post-content-tags ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 0;
        list-style-type: none;
        margin-right: 10px; }
    .post-content-tags li {
        background-color: #F8F8F8;
        margin-right: 10px;
        padding: 4px 12px;
        color: #737373;
        font-size: 12px;
        border-radius: 1px; }
    .post-content-divider {
        width: 100%;
        height: 1px;
        background-color: #EAEAEA;
        margin-top: 20px; }
    .post-share {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        margin: 0 40px;
        text-align: center;
        padding: 50px 0; }
    .post-share #share {
        font-size: 22px;
        font-weight: 600;
        line-height: 50px; }
    .post-share #share-message {
        line-height: 25px; }
    .post-share-divider {
        width: 20px;
        height: 1px;
        background-color: #7D7D7D;
        margin-top: 10px; }
    .post-share-icons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        margin-top: 10px; }
    .post-share-icons img {
        margin: 8px; }
    .post-share-icons #twitter {
        height: 27px; }
    .post-share-icons #facebook, .post-share-icons #linkedin {
        height: 30px; }
    .post-divider {
        height: 20px;
        width: 100%;
        background-color: #F9F9F9;
        margin-bottom: 50px; }
    .post-comment {
        margin: 20px; }
    .post-comment-header {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px; }
    .post-comment-input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        margin-bottom: 2px; }
    .post-comment-input-profile #comment-profile {
        width: 50px; }
    .post-comment-input-field {
        margin: 0;
        width: 100%;
        margin-left: 10px; }
    .post-comment-input-field textarea {
        width: 100%;
        resize: none;
        margin: 0;
        background-color: #F9F9F9;
        display: inline-block;
        border: solid 1px #E6E6E6;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 20px;
        max-height: 100px;
        border-radius: 5px; }
    .post-comment-input-field textarea:focus, .post-comment-input-field input:focus {
        outline: none; }
    .post-comment-button {
        cursor: pointer;
        text-align: right;
        margin-bottom: 40px; }
    .post-comment-button button {
        cursor: pointer;
        font-size: 12px;
        background-color: white;
        color: #313131;
        border: 1px solid #9D9D9D;
        padding: 6px 17px;
        border-radius: 5px;

        transition: background-color 200ms linear;
    }

    .post-comment-button button:focus {
        outline: none; }

    .post-comment-button button:hover {
        background-color: green;
        color: white;}

    .post-comment-container-individual {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 0;
        margin-bottom: 30px; }
    .post-comment-container-individual-profile {
        margin-top: 4px; }
    .post-comment-container-individual-profile img {
        width: 50px; }
    .post-comment-container-individual-content {
        margin-left: 10px; }
    .post-comment-container-individual-content-message p {
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 3px;
        margin-right: 10px; }
    .post-comment-container-individual-content-message p #comment-name {
        font-weight: 600; }
    .post-comment-container-individual-content-information #like {
        font-weight: 600;
        font-size: 14px;
        margin-right: 5px; }
    .post-comment-container-individual-content-information #date {
        font-size: 14px;
        color: #BCBCBC; }

    @media screen and (min-width: 720px) {
        .post {
            background-color: #F9F9F9; }
        .post-header {
            max-width: 600px;
            margin: 0 auto;
            margin-top: 80px;
            margin-bottom: 25px; }
        .post-header-author #author-name {
            font-size: 14px; }
        .post-header-author #author-bio, .post-header-author #post-description {
            font-size: 13px; }
        .post-description-title, .post-description-subtitle {
            max-width: 600px;
            margin: 0 auto; }
        .post-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            padding: 25px 50px; }
        .post-share {
            background-color: white;
            max-width: 600px;
            margin: 0 auto;
            padding: 50px 50px 70px 50px; }
        .post-divider {
            height: 0;
            margin-bottom: 20px; }
        .post-comment {
            background-color: white;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px 50px; } }

    /*# sourceMappingURL=post.css.map */

</style>
