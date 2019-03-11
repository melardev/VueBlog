import {AxiosService} from "./base/axios.service";
import {createPromiseWrapper} from "@/utils/promise.utils";

export const CategoryAxiosService = {
    fetchAll() {
        return createPromiseWrapper(AxiosService.get('categories'), 'Categories fetched!');
    },
};
