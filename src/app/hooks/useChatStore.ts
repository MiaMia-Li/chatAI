import { CoreMessage } from "ai";
import { create } from "zustand";

export interface FileItem {
  fileType: string;
  fileName: string;
}
interface State {
  files: FileItem[] | null;
  base64Images: string[] | null;
  messages: CoreMessage[];
}

interface Actions {
  setBase64Images: (base64Images: string[] | null) => void;
  setFiles: (files: FileItem[] | null) => void;
  setMessages: (fn: (messages: CoreMessage[]) => CoreMessage[]) => void;
}

const useChatStore = create<State & Actions>()((set) => ({
  files: null,
  base64Images: null,
  setBase64Images: (base64Images) => set({ base64Images }),
  setFiles: (files) => set({ files }),
  messages: [],
  setMessages: (fn) => set((state) => ({ messages: fn(state.messages) })),
}));

export default useChatStore;
