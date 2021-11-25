<template>
    <div class="page page-recover-password-confirm">
        <au-card :title="$t('pages.recover_password_confirm.title')" :border="false">
            <au-form ref="form" :model="modelForm" :rules="rules" :colon="false">
                <au-row>
                    <p class="info">
                        {{ $t('pages.recover_password_confirm.info', { email }) }}
                    </p>
                </au-row>

                <au-row>
                    <au-col :span="24">
                        <au-form-item prop="code" :label="$t('pages.recover_password_confirm.field.code.label')">
                            <au-input v-model="modelForm.code" :placeholder="$t('pages.recover_password_confirm.field.code.placeholder')" />
                        </au-form-item>
                    </au-col>
                </au-row>

                <au-row>
                    <au-col :span="24">
                        <au-form-item prop="newPassword" :label="$t('pages.recover_password_confirm.field.password.label')">
                            <au-input v-model="modelForm.newPassword" type="password" :placeholder="$t('pages.recover_password_confirm.field.password.placeholder')" />
                            <div slot="help" class="password-help">
                                <p ref="passwordHelp" v-html="$t('global.rule.password.help')" />
                            </div>
                        </au-form-item>
                    </au-col>
                </au-row>
                <au-row>
                    <au-col :span="24">
                        <au-form-item prop="confirmPassword" :label="$t('pages.recover_password_confirm.field.confirmPassword.label')">
                            <au-input v-model="modelForm.confirmPassword" type="password" :placeholder="$t('pages.recover_password_confirm.field.confirmPassword.placeholder')" />
                        </au-form-item>
                    </au-col>
                </au-row>
                <au-row class="btn-send">
                    <au-col :span="24">
                        <au-button circle block :loading="isChangingPassword" @click="submit">
                            {{ $t('pages.recover_password_confirm.button.send') }}
                        </au-button>
                    </au-col>
                </au-row>
            </au-form>
        </au-card>
    </div>
</template>

<script>
import { GQL_TYPE } from '@/static/graphql/types'
import { validateCode, validatePassword, validateConfirmPassword } from '@/utils/validator'

export default {
    name   : 'RecoverPasswordConfirm',
    auth   : 'guest',
    layout : 'login',
    data() {

        return {
            isChangingPassword : false,
            modelForm          : {},
            email              : undefined,
            rules              : {
                code: [
                    { type: 'required', message: this.$t('global.rule.required') },
                    { type: 'validator', implement: validateCode },
                ],

                newPassword: [
                    { type: 'required', message: this.$t('global.rule.required') },
                    { type: 'validator', implement: validatePassword },
                ],

                confirmPassword: [
                    { type: 'required', message: this.$t('global.rule.required') },
                    { type: 'validator', implement: this.validateConfirmPassword },
                ],
            },
        }
    
    },

    methods: {
        async submit() {

            await this.$refs.form.validate(async(error, values) => {

                if (!error) {

                    this.isChangingPassword = true

                    await this.$store.dispatch('authentication/changePassword', { ...values, ...this.$route.params } )
                        .then(async() => {

                            await this.$notification( {
                                type    : 'success',
                                message : this.$t('global.message.PASSWORD_CHANGED'),
                            } )
                            this.$router.push( { path: '/' } )
                            this.isChangingPassword = false
                        
                        } ).catch(async(error) => {

                            switch (error.__typename) {

                                case GQL_TYPE.USER.NOT_FOUND: {

                                    await this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.USER_NOT_FOUND'),
                                    } )

                                    break
                                
                                }

                                case GQL_TYPE.USER.INACTIVE: {

                                    await this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.INACTIVE_USER'),
                                    } )

                                    break
                                
                                }

                                case GQL_TYPE.TOKEN.NOT_FOUND: {

                                    await this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.UNKNOWN_CODE'),
                                    } )

                                    break
                                
                                }

                                case GQL_TYPE.AUTH.INVALID_CHANGE_PASS_CODE: {

                                    await this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.UNKNOWN_CODE'),
                                    } )

                                    break
                                
                                }

                                default: {

                                    await this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.CANNOT_CHANGE_PASSWORD'),
                                    } )
                                
                                }
                            
                            }

                            this.isChangingPassword = false
                        
                        } )
                
                }
            
            } )
        
        },

        validateConfirmPassword(_rule, value) {

            return validateConfirmPassword(this.modelForm.newPassword, value)
        
        },
    },
}
</script>
