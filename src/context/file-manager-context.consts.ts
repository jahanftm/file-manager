import type { State } from "../types/context.type.ts";
import { v4 as uuidv4 } from "uuid";

export const initialState: State = {
  root: {
    id: uuidv4(),
    name: 'Root',
    type: 'folder',
    children: [],
  },
};