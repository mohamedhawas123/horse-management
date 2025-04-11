import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchHorses, fetchHorseById } from "./horsesAPI";
import {
  Horse,
  HorsesResponse,
} from "../../models/horse";

interface HorsesState {
  horses: Horse[];
  selectedHorse: Horse | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: HorsesState = {
  horses: [],
  selectedHorse: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

// Thunk: Fetch horses 
export const getHorses = createAsyncThunk(
  "horses/getAll",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      return await fetchHorses(page);
    } catch {
      return rejectWithValue("Failed to load horses.");
    }
  }
);

// Thunk: Fetch horse by ID
export const getHorseById = createAsyncThunk(
  "horses/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetchHorseById(id);
      console.log(response);
      return response.horse;
    } catch {
      return rejectWithValue("Failed to load horse details.");
    }
  }
);

const horsesSlice = createSlice({
  name: "horses",
  initialState,
  reducers: {
    clearSelectedHorse(state) {
      state.selectedHorse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHorses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getHorses.fulfilled,
        (state, action: PayloadAction<HorsesResponse>) => {
          state.loading = false;
          state.horses = action.payload.data.data;
          state.currentPage = action.payload.data.meta.current_page;
          state.totalPages = action.payload.data.meta.last_page;
        }
      )
      .addCase(getHorses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getHorseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getHorseById.fulfilled,
        (state, action: PayloadAction<Horse>) => {
          state.loading = false;
          state.selectedHorse = action.payload;
        }
      )
      .addCase(getHorseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedHorse } = horsesSlice.actions;
export default horsesSlice.reducer;
