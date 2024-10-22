import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const UssAppDispatch = () => useDispatch<AppDispatch>();
export const UssAppSelector: TypedUseSelectorHook<RootState> = useSelector;
