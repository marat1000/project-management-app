import { $api } from 'api';
import { IBoard, IBoardExtended } from 'ts/interfaces';

export interface INewBoard {
  title: string;
  owner: string;
  users: string[];
}

// api returns all boards
export const isUserHaveAccessToBoard = (board: IBoard, userId: string) => {
  return board.owner === userId || board.users.includes(userId);
};

const selectUserBoards = (boards: IBoard[], userId: string) => {
  return boards.filter((board) => isUserHaveAccessToBoard(board, userId));
};

const extendBoard = (board: IBoard): IBoardExtended => {
  return {
    ...board,
    isProcessed: false,
  };
};

const boardsAPIMiddleWare = (boards: IBoard[], userId: string) => {
  const userBoards = selectUserBoards(boards, userId);
  const extended = userBoards.map(extendBoard);

  return extended;
};

export default class BoardService {
  static async createBoard(data: INewBoard) {
    const response = await $api.post<IBoard>(`boards`, data);
    return extendBoard(response.data);
  }

  static async loadUserBoards(userId: string) {
    const response = await $api.get<IBoard[]>(`boardsSet/${userId}`);
    return boardsAPIMiddleWare(response.data, userId);
  }

  static async loadBoardData(boardID: string) {
    const response = await $api.get<IBoard>(`boards/${boardID}`);
    return extendBoard(response.data);
  }

  static async delete(boardID: string) {
    const response = await $api.delete<IBoard>(`boards/${boardID}`);
    return response.data._id;
  }

  static async update(data: IBoardExtended) {
    const sendData = {
      title: data.title,
      owner: data.owner,
      users: data.users,
    };

    const response = await $api.put<IBoard>(`boards/${data._id}`, sendData);
    return extendBoard(response.data);
  }
}
