import { TOrderItemProps } from "./TOrderItemProps";

export interface IModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order: TOrderItemProps[];
    handleFinishOrder: (id: string) => void;
}