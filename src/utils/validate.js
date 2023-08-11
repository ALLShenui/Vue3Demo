export default {
    validSpecialChar(rule, value, callback) {
        if (value.trim() === '') {
            callback(new Error('请输入信息'))
        } else {
            let flag = false
            var specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
            for (var i = 0; i < value.length; i++) {
                if (specialKey.indexOf(value.substr(i, 1)) !== -1) {
                    flag = true
                }
            }
            if (flag) {
                callback(new Error('字段不允许特殊字符'))
            } else {
                callback()
            }
        }
    },

    // 正数验证
    validPositiveNum(rule, value, callback) {
        if (!Number(value)) {
            callback(new Error('请输入正数'))
        } else {
            const re = /^[+]{0,1}[1-9]\d*$|^[+]{0,1}(0\.\d*[1-9])$|^[+]{0,1}([1-9]\d*\.\d*[1-9])$/
            const rsCheck = re.test(value)
            if (!rsCheck) {
                if (value < 0) {
                    callback(new Error('请输入正数'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
    },

    // 正整数验证
    validPositiveInteger(rule, value, callback) {
        if (value === '' || value === null) {
            return callback(new Error('输入不可以为空'))
        } else {
            if (!Number(value)) {
                callback(new Error('请输入正整数'))
            } else {
                const re = /^[0-9]*[1-9][0-9]*$/
                const rsCheck = re.test(value)
                if (!rsCheck) {
                    callback(new Error('请输入正整数'))
                } else {
                    callback()
                }
            }
        }
    },

    // 整数验证
    validInteger(rule, value, callback) {
        if (value === '' || value === null) {
            return callback(new Error('不可以为空'))
        } else {
            setTimeout(() => {
                const re = /^\d*$/
                const rsCheck = re.test(value)
                if (!rsCheck) {
                    callback(new Error('请输入0或者正整数'))
                } else {
                    callback()
                }
            }, 500)
        }
    },

    // 邮箱验证
    validEmail(rule, value, callback) {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5].+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (value === '' || value === undefined || value === null) {
            callback()
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的邮箱地址'))
            } else {
                callback()
            }
        }
    },

    // 身份证号验证
    validIdNo(rule, code, callback) {
        if (code !== "" && code !== null) {
            if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
                callback(new Error('身份证长度或格式错误'))
            }
            // 身份证城市
            let aCity = {
                11: '北京',
                12: '天津',
                13: '河北',
                14: '山西',
                15: '内蒙古',
                21: '辽宁',
                22: '吉林',
                23: '黑龙江',
                31: '上海',
                32: '江苏',
                33: '浙江',
                34: '安徽',
                35: '福建',
                36: '江西',
                37: '山东',
                41: '河南',
                42: '湖北',
                43: '湖南',
                44: '广东',
                45: '广西',
                46: '海南',
                50: '重庆',
                51: '四川',
                52: '贵州',
                53: '云南',
                54: '西藏',
                61: '陕西',
                62: '甘肃',
                63: '青海',
                64: '宁夏',
                65: '新疆',
                71: '台湾',
                81: '香港',
                82: '澳门',
                91: '国外'
            }
            if (!aCity[parseInt(code.substr(0, 2))]) {
                callback(new Error('身份证地区非法'))
            }
            // 出生日期验证
            let sBirthday = (
                code.substr(6, 4) +
                '-' +
                Number(code.substr(10, 2)) +
                '-' +
                Number(code.substr(12, 2))
            ).replace(/-/g, '/')
            let d = new Date(sBirthday)
            if (
                sBirthday !== d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
            ) {
                callback(new Error('出生日期非法'))
            }

            // 身份证号码校验
            let sum = 0
            let weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
            let codes = '10X98765432'
            for (var i = 0; i < code.length - 1; i++) {
                sum += code[i] * weights[i]
            }
            var last = codes[sum % 11] // 计算出来的最后一位身份证号码
            if (code[code.length - 1] !== last) {
                callback(new Error('身份证号非法'))
            }
            callback()
        } else {
            callback()
        }
    },

    // 验证固话或者手机导电话
    validPhone(rule, value, callback) {
        const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
        if (value === '' || value === undefined || value === null) {
            callback()
        } else {
            if ((!reg.test(value))) {
                callback(new Error('请输入正确的电话号码或固话号码'))
            } else {
                callback()
            }
        }
    },
    // 验证纯字母输入
    validChar(rule, value, callback) {
        const reg = /^[A-Za-z]+$/
        if (value === '' || value === undefined || value === null) {
            callback(new Error('请输入信息'))
        } else {
            if ((!reg.test(value))) {
                callback(new Error('字段只支持字母'))
            } else {
                callback()
            }
        }
    },

    // 验证纯汉字输入
    validCHNChar(rule, value, callback) {
        const reg = /^([\u4e00-\u9fa5]|[.])*$/
        if (value === '' || value === undefined || value === null) {
            callback()
        } else {
            console.log(reg.test(value))
            if ((!reg.test(value))) {
                callback(new Error('字段只支持汉字'))
            } else {
                callback()
            }
        }
    },

    // 密码验证
    validPwd(rule, value, callback) {
        const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])')
        if (value.length < 8) {
            callback(new Error('密码长度不低于8位'))
        } else {
            if (!pwdRegex.test(value)) {
                callback(new Error('密码中必须包含字母、数字和字符'))
            } else {
                callback()
            }
        }
    }
}