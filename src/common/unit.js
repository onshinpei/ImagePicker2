export default Unit = {
    //验证手机号
    isPhone(phoneNumber) {
        //验证130-139,150-159,180-189号码段的手机号码
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var flag = myreg.test(phoneNumber);
        return flag
    },

    isVerifyCode(code) {
        var myreg = /^\d{6}$/;
        var flag = myreg.test(code);
        return flag
    }
}



