import {AxiosService} from "./base/axios.service";
import {createPromiseWrapper} from "@/utils/promise.utils";

export const TagAxiosService = {
    fetchAll() {
        return createPromiseWrapper(AxiosService.get('tags'), 'Tags fetched!');
    },
};
