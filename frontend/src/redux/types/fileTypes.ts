export const GET_FILE = "GET_FILE";
export const UPLOAD_STATUS = "UPLOAD_STATUS";
export const SET_LOADING = "SET_LOADING";

export interface FileFields {
  cid: string;
  sid: string;
  file: any[];
}

export interface FileState {
  loading: boolean;
  isUploaded: boolean;
}

interface getFile {
  type: typeof GET_FILE;
  payload: any;
}
interface uploadStatus {
  type: typeof UPLOAD_STATUS;
  isUploaded: boolean;
}
interface setLoading {
  type: typeof SET_LOADING;
  loading: boolean;
}


export type fileDispatchTypes = uploadStatus | setLoading | getFile;
