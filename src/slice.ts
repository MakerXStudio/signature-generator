import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import constants from './constants';
import type { Profile } from './types';

type SignatureState = {
  profile: Profile;
};

const initialState: SignatureState = {
  profile: Object.keys(constants.placeholders).reduce(
    (result, key) => Object.assign(result, { [key]: '' }),
    {} as Profile
  ),
};

export const signatureSlice = createSlice({
  name: 'Signature',
  initialState,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<{ name: keyof Profile; value: string | boolean }>
    ) => {
      Object.assign(state.profile, {
        [action.payload.name]: action.payload.value,
      });
    },
  },
});

export const { updateProfile } = signatureSlice.actions;

export default signatureSlice.reducer;
