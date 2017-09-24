class ResponseFilter {
    constructor(fields) {
        this.fields = fields;
    }

    filter(response) {
        if(!this.fields) {
            return response;
        }

        for (let field of this.fields) {
            if (response[field]) {
                delete response[field];
            }
        }

        return response;
    }
}

module.exports = ResponseFilter;