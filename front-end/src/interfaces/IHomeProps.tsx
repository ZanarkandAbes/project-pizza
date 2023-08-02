type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

export interface IHomeProps {
    orders: OrderProps[];
}