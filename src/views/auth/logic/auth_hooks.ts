import {useSnackbar} from "notistack";
import React, {useState} from "react";
import {UserContext, UserContextType} from "contexts/UserContext";
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import {User} from "./auth_types";
import {LazyQueryExecFunction, OperationVariables, useLazyQuery} from "@apollo/client";
import {LOGIN_QUERY} from "../../../services/graphql/auth";




type LoginPasswordType = (variables: {email: string, password: string}) => void

type UsePasswordLoginUser = () => [LazyQueryExecFunction<any, OperationVariables>, boolean]


export const usePasswordLoginUser: UsePasswordLoginUser = () => {
    const history = useHistory();
    const {login} = React.useContext(UserContext) as UserContextType
    const {t} = useTranslation();

    const [handleLogin, {loading}] = useLazyQuery(LOGIN_QUERY, {
        fetchPolicy: "no-cache",
        onError: (err) => {
            enqueueSnackbar(err.message ?? `${t('shared.internet_connexion_error')}`, {
                variant: 'error'
            })
        },
        onCompleted: (data) => {
            console.log("data", data);
            let {login: {user, Authorization}} = data;
            login({
                user,
                token: Authorization
            });
            history.push('/');
        }
    });
    const {enqueueSnackbar} = useSnackbar();


    return [handleLogin, loading]
}

//
// type UpdateProfileType = (payload: Partial<User>) => void
//
// type UseUpdateProfileUser = () => [
//     isLoading: boolean,
//     mutation: UpdateProfileType
// ];
//
//
// export const useUpdateProfileUser: UseUpdateProfileUser = () => {
//
//     const [loading, setLoading] = useState(false);
//     const {enqueueSnackbar} = useSnackbar();
//     const {login, auth} = React.useContext(UserContext) as UserContextType
//     const {t} = useTranslation();
//
//     const mutation: UpdateProfileType = async (payload) => {
//         if (!auth?.token) {
//             enqueueSnackbar(t('unable_to_update_profile'), {
//                 variant:'warning'
//             });
//             return;
//         }
//         setLoading(true);
//         return AuthService.update_userInfo(payload)
//             .then(async (res: any) => {
//                 const response = await res.json();
//                 const message = response?.message;
//                 const status = res.status === 200 || res.status === 201;
//                 if (status) {
//                     let {data} = response
//                     login({
//                         user: data,
//                         token: auth.token
//                     });
//                 }
//                 enqueueSnackbar(message, {
//                     variant: status ? 'success' : 'warning'
//                 });
//             })
//             .catch((err: any) => {
//                 enqueueSnackbar(`${t('shared.internet_connexion_error')}`, {
//                     variant: 'error'
//                 })
//             })
//             .finally(() => setLoading(false))
//     }
//     return [loading, mutation]
// }
//
//
// type ChangePasswordType = (
//     payload: { new_password: string, old_password: string },
//     onSuccess: () => void
// ) => void
//
// type UseChangePasswordUser = () => [
//     isLoading: boolean,
//     mutation: ChangePasswordType
// ];
//
//
// export const useChangePasswordUser: UseChangePasswordUser = () => {
//
//     const [loading, setLoading] = useState(false);
//     const {enqueueSnackbar} = useSnackbar();
//     const {t} = useTranslation();
//
//     const mutation: ChangePasswordType = async (payload, onSuccess) => {
//         setLoading(true);
//         return AuthService.update_password(payload)
//             .then(async (res: any) => {
//                 const status = res.status === 200 || res.status === 201;
//                 if (status) {
//                     onSuccess();
//                 }
//                 let {message} = await res.json();
//                 enqueueSnackbar(message, {
//                     variant: status ? 'success' : 'warning'
//                 });
//             })
//             .catch((err: any) => {
//                 enqueueSnackbar(`${t('shared.internet_connexion_error')}`, {
//                     variant: 'error'
//                 })
//             })
//             .finally(() => setLoading(false))
//     }
//     return [loading, mutation]
// }