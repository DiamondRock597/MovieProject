import { useCallback } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import * as yup from 'yup';

import { register } from "features/user/user.actions";
import { RootNavigationProp, RootStackRoutes } from "navigation/types";
import { useAppDispatch } from "store/hooks";

export enum RegisterFormValues {
    Email = 'email',
    Password = 'password',
    Name = 'name',
    Confirmation = 'confirmation',
}
export interface RegisterFormTypes {
    [RegisterFormValues.Email]: string;
    [RegisterFormValues.Name]: string;
    [RegisterFormValues.Password]: string;
    [RegisterFormValues.Confirmation]: string;
}

export const PASSWORD_RULES = {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password should have more than 6 symbols' },
    maxLength: { value: 16, message: 'Password should have less than 16 sybmols' },
};

const registerSchema = yup.object<RegisterFormTypes>().shape({
    [RegisterFormValues.Email]: yup.string().required('Email is required').email('Not correct format for email'),
    [RegisterFormValues.Name]: yup.string().required('Name is required'),
    [RegisterFormValues.Password]: yup.string().required('Password is required').min(6, 'Password should have more than 6 symbols').max(10, 'Password should have less than 10 symbols'),
    [RegisterFormValues.Confirmation]: yup.string().required('Password is required').min(6, 'Password should have more than 6 symbols').max(10, 'Password should have less than 10 symbols')
});

export const useRegister = () => {
    const navigation = useNavigation<RootNavigationProp>();

    const dispatch = useAppDispatch();
    const { control, handleSubmit, setError }: UseFormReturn<RegisterFormTypes> = useForm<RegisterFormTypes>({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            confirmation: '',
        },
    });

    const handleRegister = useCallback(
        ({ confirmation, password, name, email }: RegisterFormTypes) => {
            if (confirmation !== password) {
                setError(RegisterFormValues.Confirmation, { message: 'Passwords are not similar' });
                return;
            }

            dispatch(register({ name, password, confirmPassword: confirmation, email }));
        },
        [setError, dispatch]
    );

    const navigateToLogin = useCallback(() => navigation.navigate(RootStackRoutes.Login), [navigation]);

    const onSubmit = useCallback(() => handleSubmit(handleRegister)(), [handleRegister, handleSubmit]);

    return {
        onSubmit,
        control,
        navigateToLogin
    }
};