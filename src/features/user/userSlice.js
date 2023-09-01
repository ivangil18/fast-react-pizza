import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Thunk is used here as a middleware between the action and the store to be able to fetch the data needed to update the store
// creatAsyncThunk is provided by redux-toolkit and it takes the name of the action and the async function that will deal with the API containing the data.
// once the data is available it will process it and transform it as it is needed in the store
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    console.log(addressObj);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // payload of the fulfilled state
    return { position, address };
  },
);

const initialState = {
  userName: '',
  status: 'idle',
  address: '',
  position: {},
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  // these are reducers provided by thunk and needed to be handle in order to integrated with the slice
  // there are three cases to handle {pending: async functions are working, fulfilled: data is ready to be consummed, rejected: something bad happened during the thunk async function execution}
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.address = action.payload.address;
        state.position = action.payload.position;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error =
          'There was a problem getting your location, please make sure you fill this field';
        state.status = 'error';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
