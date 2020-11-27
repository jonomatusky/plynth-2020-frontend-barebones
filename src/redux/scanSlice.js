import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'
import { resizeImage } from 'util/imageHandling'

let initialState = {
  imageUrl: null,
  scan: null,
  error: null,
  status: 'idle',
  foundPiece: null,
  isDirect: false,
  scanToken: null,
}

export const createScan = createAsyncThunk(
  'scans/createScan',
  async ({ headers, imageSrc }) => {
    console.log('scanning')
    let resizedImage = await resizeImage(imageSrc)

    let { signedUrl, imageFilepath } = await client.request({
      url: '/auth/sign-s3',
      method: 'POST',
      data: {
        fileName: resizedImage.name,
        fileType: resizedImage.type,
      },
    })

    await client.request({
      url: signedUrl,
      method: 'PUT',
      data: resizedImage,
    })

    const { scan, scanToken } = await client.request({
      headers,
      url: `/scans`,
      method: 'POST',
      data: { imageFilepath },
    })
    return { scan, scanToken }
  }
)

export const updateScan = createAsyncThunk(
  'scans/updateScan',
  async ({ headers, id, ...inputs }) => {
    const { scan } = await client.request({
      headers,
      url: `/scans/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return scan
  }
)

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    setImageUrl(state, action) {
      state.imageUrl = action.payload
      state.status = 'ready'
    },
    clearImageUrl(state, action) {
      state.imageUrl = null
    },
    clearScan(state, action) {
      state.scan = null
      state.foundPiece = null
      state.imageUrl = null
      state.status = 'idle'
      state.error = null
      state.isDirect = null
    },
    setScanStatus(state, action) {
      state.status = action.payload
    },
  },
  extraReducers: {
    [createScan.pending]: (state, action) => {
      state.status = 'loading'
    },
    [createScan.fulfilled]: (state, action) => {
      const { scan, scanToken } = action.payload
      state.scan = scan
      state.scanToken = scanToken
      state.foundPiece = scan.piece || null
      if ((scan.piece || {}).isDirect) {
        state.isDirect = true
        state.status = 'idle'
      }
      state.status = 'succeeded'
    },
    [createScan.rejected]: (state, action) => {
      state.error = action.error.message
      state.status = 'failed'
    },
  },
})

export const {
  setImageUrl,
  clearImageUrl,
  clearScan,
  setScanStatus,
} = scanSlice.actions

export default scanSlice.reducer
