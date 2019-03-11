<template>
    <div class="container row">
        <div class="col-md-8">

            <h1 class="my-4">
                {{this.title}}
            </h1>

            <template v-if="articles.length > 0">
                <app-article-summary v-for="(article, index) in this.articles" :article=article :key="index.id"
                                     :index="index">
                </app-article-summary>
            </template>
            <template v-else-if="articles.length === 0 && true">
                <span>Loading ...</span>
            </template>
            <app-pagination
                    :page-meta="this.pageMeta"
                    @fetch-more="fetchMore"
            />
        </div>
        <div class="col-md-4">
            <div class="card my-4">
                <h5 class="card-header">Search</h5>
                <div class="card-body">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for..."/>
                        <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
                    </div>
                </div>
            </div>

            <app-tag-or-category-card item_type="tag"></app-tag-or-category-card>
            <app-tag-or-category-card item_type="category"></app-tag-or-category-card>

            <div class="card my-4">
                <h5 class="card-header">Side Widget</h5>
                <div class="card-body">
                    You can put anything you want inside of these side widgets. They are easy to use, and
                    feature the new Bootstrap 4 card containers!
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import ArticleSummary from "./ArticleSummary";
    import TagOrCategoryCard from "./../tags_categories/TagOrCategoryCard";
    import Pagination from "@/components/shared/Pagination";
    import {ArticleAxiosService} from "@/services/remote/articles.axios.service";

    export default {

        data() {
            return {
                title: 'Newest articles',
                articles: [],
                pageMeta: {},
            }
        },
        name: 'ArticleListByTag',
        props: ['slug', 'username'],
        components: {
            appTagOrCategoryCard: TagOrCategoryCard,
            appArticleSummary: ArticleSummary,
            appPagination: Pagination
        },

        mounted() {
            this.title = `${this.$router.currentRoute.params.slug} articles`;
            this.fetchArticles();
        },

        watch: {
            $route() {
                // This is triggered when the user clicks on another tag, the component will not be destroyed and
                // mounted, that means the component will not update according to the new tag selected, this is why we
                // hook into $route(url) change and we update the articles accordingly
                this.title = `${this.$route.params.slug} Articles`;
                this.fetchArticles();
            }
        },
        methods: {

            fetchArticles(query = {page: 1, page_size: 5}) {
                const slug = this.$router.currentRoute.params.slug;
                return ArticleAxiosService.fetchAll({category: slug, ...query}).then(result => {
                    if (result.success) {
                        this.pageMeta = result.page_meta;
                        this.articles = result.articles;
                    }
                }).catch(err => {
                    debugger;
                });
            },

            fetchMore(pageRequest) {
                const slug = this.$router.currentRoute.params.slug;
                this.fetchArticles({category: slug, ...pageRequest});
            },
        },
    };
</script>

<style scoped lang="scss">
    // @import "../../styles/home.scss";
</style>

