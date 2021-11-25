<template>
    <div class="page page-login">
        <au-card :title="$t('pages.login.title')" :border="false">
            <au-form ref="form" :model="modelForm" :rules="rules" :colon="false">
                <au-row>
                    <au-col :span="24">
                        <au-form-item prop="email" :label="$t('pages.login.field.email.label')">
                            <au-input v-model="modelForm.email" :placeholder="$t('pages.login.field.email.placeholder')" />
                        </au-form-item>
                    </au-col>
                </au-row>

                <au-row>
                    <au-col :span="24">
                        <au-form-item prop="password" :label="$t('pages.login.field.password.label')">
                            <au-input ref="password" v-model="modelForm.password" :placeholder="$t('pages.login.field.password.placeholder')" type="password" />
                        </au-form-item>
                    </au-col>
                </au-row>

                <au-row>
                    <au-col :span="24">
                        <au-form-item prop="cdn" :label="$t('pages.login.field.cdn.label')">
                            <au-input v-model="modelForm.cdn" :placeholder="$t('pages.login.field.cdn.placeholder')" @keydown="keydown" />
                        </au-form-item>
                    </au-col>
                </au-row>

                <au-row class="btn-login">
                    <au-col :span="24">
                        <au-button circle block :loading="isLogin" @click="submit">
                            {{ $t('pages.login.button.login') }}
                        </au-button>
                    </au-col>
                </au-row>

                <au-row class="btn-recover">
                    <au-col :span="24">
                        <au-button circle block transparent :disabled="isLogin" @click="recover">
                            {{ $t('pages.login.button.recover') }}
                        </au-button>
                    </au-col>
                </au-row>
            </au-form>
        </au-card>
    </div>
</template>

<script>
export default {
    name   : 'Login',
    auth   : 'guest',
    layout : 'login',
    data() {

        return {
            isLogin   : false,
            modelForm : {},
            rules     : {
                email: [
                    { type: 'required', message: this.$t('global.rule.required') },
                ],

                password: [
                    { type: 'required', message: this.$t('global.rule.required') },
                ],

                cdn: [
                    { type: 'required', message: this.$t('global.rule.required') },
                ],
            },
        }
    
    },

    beforeMount() {

        if (localStorage.getItem('aur.lastCDN') != null)
            this.modelForm['cdn'] = localStorage.getItem('aur.lastCDN')
    
    },

    methods: {
        async submit() {

            await this.$refs.form.validate(async(error, values) => {

                if (!error) {

                    this.isLogin = true

                    try {

                        await this.$auth.login( { data: values } )
                        localStorage.setItem('aur.lastCDN', values.cdn.toLowerCase() )
                    
                    }
                    catch (error) {

                        if (error.response) {

                            switch (error.response.status) {

                                case this.$httpStatus.FORBIDDEN: {

                                    this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.INACTIVE_USER'),
                                    } )

                                    break
                                
                                }

                                case this.$httpStatus.UNAUTHORIZED: {

                                    this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.UNKNOWN_USER'),
                                    } )

                                    break
                                
                                }

                                default: {

                                    this.$notification( {
                                        type    : 'error',
                                        message : this.$t('global.error.DEFAULT_ERROR_MESSAGE'),
                                    } )
                                
                                }
                            
                            }
                        
                        }
                        else {

                            this.$notification( {
                                type    : 'error',
                                message : this.$t('global.error.DEFAULT_ERROR_MESSAGE'),
                            } )
                        
                        }

                        this.isLogin = false
                    
                    }

                    this.isLogin = false
                
                }
            
            } )
        
        },

        async keydown(event) {

            if (event.key === 'Enter')
                await this.submit()
        
        },

        recover() {

            this.$router.push( { path: '/recover_password' } )
        
        },
    },
}
</script>
