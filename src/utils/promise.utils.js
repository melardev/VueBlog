import {NotificationService} from "@/services/local/notification.service";

export function createPromiseWrapper(promise, successMessage = 'Success', errorMessage = 'Error') {
    NotificationService.setIsLoading(true);
    return new Promise((resolve, reject) => {
        promise.then(res => {
            NotificationService.setIsLoading(false);
            NotificationService.showSuccessAlert(successMessage);
            resolve(res.data);
        }).catch(err => {
            debugger;
            NotificationService.setIsLoading(false);
            NotificationService.showToastError(errorMessage + ' ' + err.message);
            reject(err);
        });
    });
}


export function createPromiseWrapperWithCallback(promise, callback) {
    NotificationService.setIsLoading(true);
    return new Promise((resolve, reject) => {
        promise.then(res => {
            NotificationService.setIsLoading(false);
            callback(true, resolve, reject, res.data);
        }).catch(err => {
            debugger;
            NotificationService.setIsLoading(false);
            callback(false, resolve, reject, err);
        });
    });
}
