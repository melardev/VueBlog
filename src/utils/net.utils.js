export function stripMetaFromResponse(response) {
    delete response.success;
    delete response.full_messages;
    return response;
}
