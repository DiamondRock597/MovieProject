import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadTokenFromStorage = createAsyncThunk('user/loadToken', async () => {
    const token = "strubg";

    return token || '';
})