import { PlayState } from '../play.reducer';
// import { PlayCollection } from '../../interfaces/collection.interface';

// export function removeSelectedCollectionReducer(
//   state: PlayState,
//   action
// ): PlayState {
//   return {
//     ...state,
//     selectedCollection: <Collection>{}
//   };
// }

export function updateSelectedCollectionReducer(
  state: PlayState,
  action
): PlayState {
  const collection = state.collections.find(c => c.service === action.payload);
  return {
    ...state,
    selectedCollection: collection ? collection : state.selectedCollection
  };
}

export function addCollectionLogReducer(state: PlayState, action): PlayState {
  return {
    ...state,
    logs: [...state.logs, ...action.payload]
  };
}

export function clearCollectionLogReducer(state: PlayState): PlayState {
  return {
    ...state,
    logs: []
  };
}
