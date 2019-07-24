import {AxiosService} from "./base/axios.service";
import {createPromiseWrapper} from "@/utils/promise.utils";


export const ArticleAxiosService = {
    fetchAll(query = {}) {
        const page = query.page || 1;
        const page_size = query.page_size || 5;
        const msg = 'Articles fetched!';
        if (query && query.tag)
            return createPromiseWrapper(AxiosService.fetchPage(`articles/by_tag/${query.tag}`, {page, page_size}), msg);
        else if (query && query.category)
            return createPromiseWrapper(AxiosService.fetchPage(`articles/by_category/${query.category}`, {
                page,
                page_size
            }), msg);
        else if (query && query.author)
            return createPromiseWrapper(AxiosService.fetchPage(`articles/by_author/${query.author}`, {
                page,
                page_size
            }), msg);
        else
            return createPromiseWrapper(AxiosService.fetchPage('articles', {page, page_size}), msg);
    },
    fetchBySlug(slug) {
        return createPromiseWrapper(AxiosService.get(`/articles/${slug}`), 'Article fetched!');
    },

    create(article) {
        return createPromiseWrapper(AxiosService.post(`/articles`, article), 'Article created successfully');
    }
};
