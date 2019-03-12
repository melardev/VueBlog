import {AxiosService} from "@/services/remote/base/axios.service";
import {createPromiseWrapperWithCallback} from "@/utils/promise.utils";

export const CommentsAxiosService = {
    get(slug) {
        return AxiosService.get("articles", `${slug}/comments`);
    },

    create(slug, content) {
        return createPromiseWrapperWithCallback(AxiosService.post(`articles/${slug}/comments`, {
            content
        }), (success, resolve, reject, payload) => {
            if (success) {
                resolve({success: true, comment: payload});
            } else {
                reject({success: false, error: payload})
            }
        });
    },

    delete(slug, commentId) {
        return AxiosService.delete(`articles/${slug}/comments/${commentId}`);
    }
};
