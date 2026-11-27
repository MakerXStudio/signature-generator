import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import constants from './constants';
import type { Profile } from './types';

interface SignatureState {
  profile: Partial<Profile>;
}

const initialState: SignatureState = {
  profile: Object.entries(constants.placeholders).reduce<Partial<Profile>>(
    (result, item) => Object.assign(result, { [item[0]]: '' }),
    {}
  ),
};

export const signatureSlice = createSlice({
  name: 'Signature',
  initialState,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<{
        name: keyof Profile;
        value: Profile[keyof Profile];
      }>
    ) => {
      Object.assign(state.profile, {
        [action.payload.name]: action.payload.value,
      });
    },
  },
});

export const { updateProfile } = signatureSlice.actions;

export default signatureSlice.reducer;
