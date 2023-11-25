import { ServerError, IServerErrorData} from "./errors";

interface _IServerRES<T> {
	err: ServerError.NO_ERROR;
	payload: T;
};

interface _IServerErrorRES {
	err: Exclude <ServerError, ServerError.NO_ERROR>;
	payload: IServerErrorData;
}

export type IServerRES<T> =| _IServerRES<T> | _IServerErrorRES;