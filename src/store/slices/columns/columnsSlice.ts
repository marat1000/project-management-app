import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import ColumnService, { IColumnParams } from 'api/services/columns';
import { RootState } from 'store';
import { IColumn } from 'ts/interfaces';
import { boardsAdapter } from '../boards/boardsSlice';

// export interface IColumn {
//   _id: string;
//   title: string;
//   order: 1;
//   boardId: string;
// }

type Fetching = {
  isLoading: boolean;
  error: string;
};

interface IColumnsState {
  columns: IColumn[];
  fetching: Fetching;
}

const columnsAdapter = createEntityAdapter<IColumn>({
  selectId: (column) => column._id,
  sortComparer: (a, b) => a.order - b.order,
});

const columnSlice = createSlice({
  name: 'columns',
  initialState: columnsAdapter.getInitialState({
    fetching: {
      isLoading: false,
      error: '',
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumns.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(getColumns.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = 'error';
      // to watch this
    });

    builder.addCase(getColumns.fulfilled, (state, action) => {
      columnsAdapter.addMany(state, action.payload);
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });

    // add Column

    builder.addCase(addColumn.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(addColumn.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = 'error';
      // to watch this
    });

    builder.addCase(addColumn.fulfilled, (state, action) => {
      columnsAdapter.addOne(state, action.payload);
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });

    builder.addCase(deleteColumn.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(deleteColumn.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = 'error';
      // to watch this
    });

    builder.addCase(deleteColumn.fulfilled, (state, action) => {
      columnsAdapter.removeOne(state, action.payload);
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });

    builder.addCase(updateColumn.pending, (state) => {
      state.fetching.isLoading = true;
      state.fetching.error = '';
    });

    builder.addCase(updateColumn.rejected, (state, action) => {
      state.fetching.isLoading = false;
      state.fetching.error = 'error';
      // to watch this
    });

    builder.addCase(updateColumn.fulfilled, (state, action) => {
      columnsAdapter.updateOne(state, action.payload);
      // watch how update works
      state.fetching.isLoading = false;
      state.fetching.error = '';
    });
  },
});

export const getColumns = createAsyncThunk(
  'columns/getColumns',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = (await ColumnService.loadAllColumns(id)) || [];
      return data as IColumn[];
    } catch (error) {
      // pizdec idk how to handle normally this error
      const err = error as string;
      return rejectWithValue(err);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async ({ id, column }: { id: string; column: IColumnParams }, { rejectWithValue }) => {
    try {
      return await ColumnService.addColumn(id, column);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async ({ boardID, columnID }: { boardID: string; columnID: string }) => {
    const deletedColumnID = await ColumnService.deleteColumn(boardID, columnID);
    return deletedColumnID;
  }
);

export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({
    boardID,
    columnID,
    title,
    order,
  }: {
    boardID: string;
    columnID: string;
    title: string;
    order: number;
  }) => {
    try {
      return await ColumnService.updateColumn(boardID, columnID, { title, order });
    } catch (error) {
      // do something
    }
  }
);

const columnSelectors = columnsAdapter.getSelectors<RootState>((state) => state.columns);
export const selectColumns = columnSelectors.selectAll;

// export const selectColumns = (state: RootState) => state.columns.columns;

// export const { } = columnSlice.actions;

export default columnSlice.reducer;
