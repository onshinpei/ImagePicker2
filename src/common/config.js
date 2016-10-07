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
        baseLocal: 'http://192.168.1.107:1234',
        base: 'http://rap.taobao.org/mockjs/7661',
        creations: '/api/creations',
        comment: '/api/comments',
        signup: '/api/u/signup',
        verify: '/api/u/verify',
        update: '/api/u/update',
        signature: '/api/signature'
    },
    qiniu: {
        myhost: 'http://oejb8m2hg.bkt.clouddn.com',
        uploadUrl: 'http://upload.qiniu.com'
    }
}




