<template>
    <div class="card my-4">
        <h5 class="card-header">{{this.item_type === 'tag' ? 'Tags' : 'Categories'}}</h5>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="list-unstyled mb-0">
                        <li v-for="(item,index) in (this.item_type === 'tag' ? tags : categories)" :key="index.id"
                            :index="index">
                            <router-link :to="`/articles/${prefixUrl()}/${item.slug}`">{{item.name}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    import {TagAxiosService} from "@/services/remote/tag.axios.service";
    import {CategoryAxiosService} from "@/services/remote/category.axios.service";

    export default {
        name: "TagOrCategoryCard",
        props: {item_type: {type: String, required: true}},
        data() {
            return {
                tags: [],
                categories: []
            }
        },
        mounted() {
            if (this.item_type === 'tag' && this.tags.length === 0)
                this.fetchAllTags();
            else if (this.item_type === 'category' && this.categories.length === 0)
                this.fetchAllCategories();
        },

        methods: {
            fetchAllTags() {
                TagAxiosService.fetchAll().then(data => {
                    this.tags = data.tags;
                }).catch(err => {
                    debugger;
                });
            },
            fetchAllCategories() {
                CategoryAxiosService.fetchAll().then(data => {
                    this.categories = data.categories;
                }).catch(err => {
                    debugger;
                });
            },
            prefixUrl() {
                if (this.item_type === 'tag')
                    return 'by_tag';
                else if (this.item_type === 'category')
                    return 'by_category';
                else throw Error('Invalid item type')
            }
        }
    }
</script>

<style scoped>

</style>
