const API_STATUS_CODES = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    AUTHORIZATION_FAILED: 401,
    ERROR_CODE: 400,
    INTERNAL_SERVER_ERROR: 500,
    DUPLICATE_ENTRY: 11000,
};
const RESPONSE_MESSAGES = {
    SUCCESS: 'Success',
    AUTHORIZATION_FAILED: 'Authorization failed',
    DUPLICATE_ENTRY: 'email already exist.',
};
const JWT_TOKEN = 'eyJhbGciOiJ$IUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzIzNTYyYjlkNTZkNjY1Yjk0NDkzYyIsInVzZXJOYW1lIjoibWFzaG9vZCBSYWZpIiwiaWF0IjoxNjIzMzQxNzU2fQ.vfJCCeMRdEhzkJEwgJybJ95zFm0eYuiYvUDpi2q3Of8';


module.exports = { API_STATUS_CODES, RESPONSE_MESSAGES, JWT_TOKEN }
