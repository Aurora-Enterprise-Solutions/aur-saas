import Vue from 'vue'
import validator from 'validator'

const $t = (sign) => Vue.prototype.$nuxt.$options.i18n.t(sign)

export function validateCode(_rule, code) {

    if (!validator.isLength(code, { min: 6, max: 6 } ) )
        return $t('global.rule.code_length')

    return null

}

export function validateEmail(_rule, email) {

    if (!validator.isEmail(email) )
        return $t('global.rule.no_email')

    return null

}

export function validatePassword(_rule, password) {

    const passwordCriterias = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }

    if (!validator.isStrongPassword(password, passwordCriterias) )
        return $t('global.rule.password.error')

    return null

}

export function validateConfirmPassword(newPassword, confirmPassword) {

    return (newPassword !== confirmPassword) ? $t('global.rule.equal_password') : null

}
