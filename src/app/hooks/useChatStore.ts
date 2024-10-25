import { CoreMessage } from "ai";
import { create } from "zustand";

export interface FileItem {
  fileType: string;
  fileName: string;
}
interface State {
  attachments: any | null;
  base64Images: string[] | null;
  messages: CoreMessage[];
}

interface Actions {
  setBase64Images: (base64Images: string[] | null) => void;
  setAttachments: (files: any | null) => void;
  setMessages: (fn: (messages: CoreMessage[]) => CoreMessage[]) => void;
}

const useChatStore = create<State & Actions>()((set) => ({
  attachments: [],
  base64Images: null,
  setBase64Images: (base64Images) => set({ base64Images }),
  setAttachments: (attachments) => set({ attachments }),
  messages: [],
  setMessages: (fn) => set((state) => ({ messages: fn(state.messages) })),
}));

export default useChatStore;
