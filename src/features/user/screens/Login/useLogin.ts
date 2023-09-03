import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { UseFormReturn, useForm } from "react-hook-form";

import { RootNavigationProp, RootStackRoutes } from "navigation/types";
import { useAppDispatch } from "store/hooks";
import { login } from "features/user/user.actions";

export enum LoginFormValues {
    Email = 'email',
    Password = 'password',
}

export interface LoginFormTypes {
    [LoginFormValues.Email]: string;
    [LoginFormValues.Password]: string;
}

export const useLogin = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const dispatch = useAppDispatch();

    const { control, handleSubmit }: UseFormReturn<LoginFormTypes> = useForm<LoginFormTypes>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = useCallback(({ email, password }: LoginFormTypes) => dispatch(login({ email, password })), [dispatch]);

    const onSubmit = useCallback(() => handleSubmit(handleLogin)(), [handleLogin, handleSubmit]);

    const navigateToRegister = useCallback(() => navigation.navigate(RootStackRoutes.Register), [navigation]);

    return {
        onSubmit,
        control,
        navigateToRegister
    }
};