<template>
    <div class="container">
        <form v-on:submit.prevent>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" required name="title"
                       v-model="article.title"/>
            </div>

            <div class="row">
                <div class="mb-3">
                    <label>Description</label>
                    <ckeditor :editor="editor" v-model="article.description"
                              :config="descriptionEditorConfig"></ckeditor>
                </div>
            </div>

            <div class="row">
                <div class="mb-3">
                    <label>Body</label>
                    <ckeditor :editor="editor" v-model="article.body" :config="bodyEditorConfig"></ckeditor>
                </div>
            </div>

            <hr class="mb-4"/>
            <button class="btn btn-primary btn-lg btn-block" type="submit"
                    v-on:click="submitForm()">Create
            </button>
        </form>
        <br/>
        <button class=" col-4 btn btn-secondary col-md-2" v-on:click="showCode = !showCode">Show/Hide Code</button>
        <br/>
        <code v-if="showCode">
            {{article.body}}
        </code>

        <br/>
        <br/>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import {FileUploadCKEditorAdapter} from "@/utils/file_upload_ckeditor.adapter";
    import {ArticleAxiosService} from "@/services/remote/articles.axios.service";

    export default {
        name: "ArticleCreateOrEdit",
        components: {
            // Use the <ckeditor> component in this view.
            ckeditor: CKEditor.component
        },
        data() {
            return {
                isSubmitting: false,
                submitted: false,
                showCode: false,
                editor: ClassicEditor,
                descriptionEditorConfig: {
                    // The configuration of the editor.
                    removePlugins: ['ImageToolbar', 'ImageUpload', 'MediaEmbed']
                },
                bodyEditorConfig: {
                    extraPlugins: [FileUploadCKEditorAdapter]
                },
                article: {
                    title: '', description: '', body: ''
                }
            };
        },
        methods: {
            submitForm() {
                ArticleAxiosService.create(this.article).then(response => {
                    if (response.success) {
                        this.$router.push('/');
                    }
                }).catch(err => {
                    console.error(err);
                    debugger;
                });
            }
        }
    }
</script>

<style scoped>

</style>
