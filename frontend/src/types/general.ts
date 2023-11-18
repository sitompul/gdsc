import { Dispatch, SetStateAction } from "react";

/**
 * Nullable type.
 */
export type Null<T> = null | T;

export type useStateType<T> = [T, Dispatch<SetStateAction<T>>];
