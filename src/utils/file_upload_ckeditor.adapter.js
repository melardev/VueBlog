// Reference example:
// https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html#implementing-a-custom-upload-adapter

import {AxiosService} from "@/services/remote/base/axios.service";

class MyUploadAdapter {
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this.url = 'uploads';
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const data = new FormData();
                data.append('file', file);
                AxiosService.post(this.url, data, {
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(response => {
                    debugger;
                    resolve({
                        default: response.data.url
                    });
                }).catch(err => {
                    console.error(err);
                    reject(err.message);
                });
            }));
    }

    // Aborts the upload process.
    abort() {
    }

}

export const FileUploadCKEditorAdapter = function (editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
        return new MyUploadAdapter(loader);
    };
};
