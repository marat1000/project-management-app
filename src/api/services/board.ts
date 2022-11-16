import { $api } from 'api';
import { IBoard } from 'ts/interfaces';

export interface INewBoard {
  title: string;
  owner: string;
  users: string[];
}

// api returns all boards
const selectUserBoards = (boards: IBoard[], userId: string) => {
  return boards.filter((board) => {
    return board.owner === userId || board.users.includes(userId);
  });
};

export default class BoardService {
  static async createBoard(data: INewBoard) {
    const response = await $api.post<IBoard>(`boards`, data);
    return response;
  }

  static async loadUserBoards(userId: string) {
    const response = await $api.get<IBoard[]>(`boardsSet/${userId}`);
    return selectUserBoards(response.data, userId);
  }
}
