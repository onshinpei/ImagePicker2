'use strict'
module.exports = {
    header: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    },
    api: {
        base: 'http://rap.taobao.org/mockjs/7661/',
        creations: 'api/creations/',
        comment: 'api/comments',
        signup: 'api/u/signup',
        verify: 'api/u/verify'
    }
}




