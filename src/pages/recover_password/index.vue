<template>
    <div class="page page-recover-password">
        <au-card :title="$t('pages.recover_password.title')" :border="false">
            <au-form ref="form" :model="modelForm" :rules="rules" :colon="false">
                <au-row>
                    <p class="info">
                        {{ $t('pages.recover_password.info') }}
                    </p>
                </au-row>
                <au-row>
                    <au-col :span="24">
                        <au-form-item prop="email" :label="$t('pages.recover_password.field.email.label')">
                            <au-input v-model="modelForm.email" :placeholder="$t('pages.recover_password.field.email.placeholder')" />
                        </au-form-item>
                    </au-col>
                </au-row>
                <au-row>
                    <au-col :span="24">
                        <au-form-item prop="cdn" :label="$t('pages.recover_password.field.cdn.label')">
                            <au-input v-model="modelForm.cdn" :placeholder="$t('pages.recover_password.field.cdn.placeholder')" />
                        </au-form-item>
                    </au-col>
                </au-row>
                <au-row class="btn-send">
                    <au-col :span="24">
                        <au-button circle block :disabled="isGettingCode" @click="submit">
                            {{ buttonCount || $t('pages.recover_password.button.send') }}
                        </au-button>
                    </au-col>
                </au-row>
            </au-form>
        </au-card>
    </div>
</template>

<script>
import { GQL_TYPE } from '@/static/graphql/types'
import { validateEmail } from '@/utils/validator'

export default {
    layout : 'login',
    auth   : 'guest',
    data() {

        return {
            isGettingCode : false,
            buttonCount   : 0,
            modelForm     : {},
            rules         : {
                email: [
                    { type: 'required', message: this.$t('global.rule.required') },
                    { type: 'validator', implement: validateEmail },
                ],

                cdn: [
                    { type: 'required', message: this.$t('global.rule.required') },
                ],
            },
        }
    
    },

    methods: {
        submit() {

            this.$refs.form.validate( (error, values) => {

                if (!error) {

                    this.setRegresiveCount()

                    this.$store.dispatch('authentication/sendCode', values)
                        .then(async() => {

                            await this.$router.push( { path: `/recover_password/${values.email.toLowerCase()}/${values.cdn.toLowerCase()}` } )
                        
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

                                default: {

                                    await this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.CANNOT_GENERATE_CODE'),
                                    } )
                                
                                }
                            
                            }

                            this.clearRegresiveCount()
                        
                        } )
                
                }
            
            } )
        
        },

        toConfirm() {

            this.$refs.form.validate(async(error, values) => {

                if (!error) {

                    this.isGettingCode = true
                    await this.$router.push( { path: `/recover_password/confirm/${values.username.toLowerCase()}/${values.cdn.toLowerCase()}` } )
                
                }
            
            } )
        
        },

        setRegresiveCount() {

            this.isGettingCode = true
            this.buttonCount = 30
            this.buttonCountInterval = setInterval( () => {

                this.buttonCount--
                if (this.buttonCount === 0)
                    this.clearRegresiveCount()
            
            }, 1000)
        
        },

        clearRegresiveCount() {

            clearInterval(this.buttonCountInterval)
            this.buttonCount = 0
            this.isGettingCode = false
        
        },
    },
}
</script>
