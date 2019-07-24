import Vue from 'vue';
import Router from 'vue-router';
import ArticleList from '../components/articles/ArticleList';
import ArticleDetails from '../components/articles/ArticleDetails';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import Logout from '../components/users/Logout';
import ArticleListByTag from "@/components/articles/ArticleListByTag";
import ArticleListByCategory from "@/components/articles/ArticleListByCategory";
import ArticleCreateOrEdit from "@/components/articles/ArticleCreateOrEdit";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    hash: false,

    routes: [
        {
            path: '',
            redirect: '/articles'
        },
        {
            path: '/articles/new',
            exact: true,
            name: 'article-new',
            props: true,
            component: ArticleCreateOrEdit,
        },
        {
            path: '/articles/:slug',
            exact: true,
            name: 'article-details',
            props: true,
            component: ArticleDetails,
        },
        {
            path: '/articles',
            name: 'article-list',
            exact: true,
            component: ArticleList
        },
        {
            path: '/articles/by_tag/:slug',
            exact: true,
            name: 'article-list-by-tag',
            component: ArticleListByTag,
        },
        {
            path: '/articles/by_category/:slug',
            exact: true,
            name: 'article-list-by-category',
            component: ArticleListByCategory,
        },
        {
            // TODO: Not implemented yet
            path: '/articles/by_author/:username',
            exact: true,
            name: 'article-list-by-author',
            component: ArticleList,
        },

        {
            path: '/articles/new',
            exact: true,
            name: 'article-create',
            component: ArticleCreateOrEdit,
        },

        {path: '/login', component: Login, name: 'login', onlyGuest: true},
        {path: '/register', component: Register, name: 'register', onlyGuest: true},
        {path: '/logout', component: Logout, name: 'logout'},
    ],
});
