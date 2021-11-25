import gql from 'graphql-tag'
import graphqlClient from '../utils/graphql'

export const state = () => ( {
    email : undefined,
    cdn   : undefined,
} )

export const mutations = {
    setUser(state, user) {

        state.email = user.email
        state.cdn = user.cdn

    },

    resetUser(state) {

        state.email = undefined
        state.cdn = undefined

    },
}

export const actions = {
    async sendCode( { commit }, form) {

        return new Promise( (resolve, reject) => {

            commit('resetUser')

            graphqlClient.query( {
                query: gql`
                  query getRecoverCode($form: RecoverCodeInput!) {
                    getRecoverCode(form: $form) {
                        __typename
                    }
                  }
                `,
                variables   : { form },
                fetchPolicy : 'network-only',
            } )
                .then( ( { data: { getRecoverCode } } ) => {

                    if (getRecoverCode.__typename === 'Ok') {

                        commit('setUser', form)
                        resolve()

                    }
                    else { reject(getRecoverCode) }

                } )
                .catch( (error) => {

                    reject(error)

                } )

        } )

    },

    async changePassword( { commit }, form) {

        return new Promise( (resolve, reject) => {

            commit('resetUser')

            graphqlClient.mutate( {
                mutation: gql`
                  mutation changePasswordWithAuthCode($form: NewPasswordInput!) {
                    changePasswordWithAuthCode(form: $form) {
                        __typename
                    }
                  }
                `,
                variables: {
                    form: {
                        email    : form.email,
                        cdn      : form.cdn,
                        password : form.newPassword,
                        code     : form.code,
                    },
                },

                fetchPolicy: 'no-cache',
            } ).then( ( { data: { changePasswordWithAuthCode } } ) => {

                if (changePasswordWithAuthCode.__typename === 'Ok')
                    resolve()
                else
                    reject(changePasswordWithAuthCode)

            } ).catch( (error) => {

                reject(error)

            } )

        } )

    },
}
