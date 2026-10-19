import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getBaseUrl = () =>
  (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (
    { page = 1, limit = 7, search = "" } = {},
    { getState, rejectWithValue },
  ) => {
    try {
      const token = getState().auth.token;
      const headers = { Authorization: `Bearer ${token}` };
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
      });
      const response = await fetch(`${getBaseUrl()}/history?${params}`, {
        headers,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        return rejectWithValue(
          result?.message || "Gagal mengambil riwayat transaksi",
        );
      }

      return {
        transactions: Array.isArray(result.data)
          ? result.data.map((transaction) => ({
              ...transaction,
              amount: Number(transaction.amount) || 0,
            }))
          : [],
        meta: result.metadata || {},
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Gagal terhubung ke server backend",
      );
    }
  },
);

export const deleteHistory = createAsyncThunk(
  "history/deleteHistory",
  async (transactionId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(
        `${getBaseUrl()}/history/${encodeURIComponent(transactionId)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        return rejectWithValue(
          result?.message || "Gagal menghapus riwayat transaksi",
        );
      }
      return transactionId;
    } catch (error) {
      return rejectWithValue(
        error.message || "Gagal terhubung ke server backend",
      );
    }
  },
);

export const toggleFavorite = createAsyncThunk(
  "history/toggleFavorite",
  async (favoriteUserId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue("Sesi login tidak ditemukan.");
      }

      const response = await fetch(`${getBaseUrl()}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorite_user_id: favoriteUserId,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        return rejectWithValue(
          result?.message || "Gagal memperbarui favorite.",
        );
      }

      const isFavorite = result?.data?.is_favorite;

      if (typeof isFavorite !== "boolean") {
        return rejectWithValue(
          "Respons backend tidak memiliki status favorite.",
        );
      }

      return {
        favoriteUserId,
        isFavorite,
      };
    } catch {
      return rejectWithValue("Gagal terhubung ke server backend.");
    }
  },
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    transactions: [],
    meta: { current_page: 1, total_page: 0, total_data: 0 },
    loading: false,
    deleting: false,
    error: null,
    favoriteLoadingIds: [],
    favoriteError: null,
    favoriteStatusById: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.meta = action.payload.meta;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil riwayat transaksi";
      })
      .addCase(deleteHistory.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        state.deleting = false;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        );
      })
      .addCase(deleteHistory.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload || "Gagal menghapus riwayat transaksi";
      })
      .addCase(toggleFavorite.pending, (state, action) => {
        const id = action.meta.arg;

        if (!state.favoriteLoadingIds.includes(id)) {
          state.favoriteLoadingIds.push(id);
        }

        state.favoriteError = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { favoriteUserId, isFavorite } = action.payload;

        state.favoriteLoadingIds = state.favoriteLoadingIds.filter(
          (id) => id !== favoriteUserId,
        );

        state.favoriteStatusById[favoriteUserId] = isFavorite;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        const id = action.meta.arg;

        state.favoriteLoadingIds = state.favoriteLoadingIds.filter(
          (item) => item !== id,
        );

        state.favoriteError = action.payload || "Gagal memperbarui favorite.";
      });
  },
});

export default historySlice.reducer;
