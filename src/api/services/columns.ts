import { $api } from 'api';
import { IColumn } from 'ts/interfaces';

export interface IColumnParams {
  title: string;
  order: number;
}

export interface IColumnError {
  statusCode: string;
  message: string;
}

export default class ColumnService {
  static loadAllColumns = async (boardID: string) => {
    console.log(boardID);
    const response = await $api.get<IColumn[]>(`boards/${boardID}/columns`);
    // if (response.status !== 200) throw new Error('Columns not found');
    return response.data;
  };

  static addColumn = async (boardID: string, columnParams: IColumnParams) => {
    const response = await $api.post(`boards/${boardID}/columns`, columnParams);
    if (response.status !== 200) throw new Error(response.data.message);
    return response.data as IColumn;
  };

  static deleteColumn = async (boardID: string, columnID: string) => {
    const response = await $api.delete(`boards/${boardID}/columns/${columnID}`);
    return response.data._id;
  };

  static updateColumn = async (
    boardID: string,
    columnID: string,
    {
      title,
      order,
    }: {
      title: string;
      order: number;
    }
  ) => {
    const response = await $api.put(`boards/${boardID}/columns/${columnID}`, { title, order });
    return response.data;
  };
}
