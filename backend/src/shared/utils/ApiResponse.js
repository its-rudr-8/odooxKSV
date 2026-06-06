class ApiResponse {
  constructor(message, data = {}, statusCode = 200) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}

module.exports = { ApiResponse };
