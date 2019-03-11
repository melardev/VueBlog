<template>
    <div class="card mb-4">
        <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap"/>
        <div class="card-body">
            <h2 class="card-title">{{this.article.title}}</h2>
            <p class="card-text">{{this.article.description}}</p>
            <router-link v-bind:to="`/articles/${this.article.slug}`" class="btn btn-primary">
                <div :click="articleSelected">Read More &rarr;</div>
            </router-link>
        </div>
        <div class="card-footer text-muted">
            By&nbsp;
            <router-link :to="{ name: 'article-details', params: {
                user_id: article.user.id,
                username: article.user.username,
                }
                 }">{{article.user.username}}
            </router-link>

            <br/>

            <router-link v-for="(tag,index) in article.tags" :to="'/articles/by_tag/' + tag.slug"
                         :key="index.id" :index="index"
                         :class="classes[index % 4]">
                {{tag.name}}
            </router-link>

            <router-link v-for="(category,index) in article.categories"
                         :key="index.id" :index="index"
                         :to="'/articles/by_category/' + category.slug"
                         :class="classes[index + 1 % 4]">
                {{category.name}}
            </router-link>

            <div style="float: right">
                {{article.comments_count}}
                <i class="fas fa-comments"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleSummary",
        props: ['article'],
        data() {
            return {
                classes: ['badge badge-dark', 'badge badge-secondary', 'badge badge-light', 'badge badge-info'],
            };
        },
        mounted() {
            console.log('ArticleSummary::mounted');
        },
        methods: {
            articleSelected(event) {
            }
        }
    }
</script>

<style scoped>

</style>