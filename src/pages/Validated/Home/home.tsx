import CategoryAndFood from "./Menu/categoryAndFood.tsx";
import Receipt from "./Receipt/receipt.tsx";
import PayInCash from "./Cashier/payInCash.tsx";
import {useSelector} from "react-redux";
import {selectCart} from "../../../store/reducers/cartReducers.ts";
import React from "react";
import PayInQr from "./Cashier/payInQr.tsx";

const Home = () => {
    const cart = useSelector(selectCart)
    return (
        <div className={"flex gap-4 py-4 h-full"}>
            <CategoryAndFood/>
            <Receipt/>
            {cart.paymentMethod == "cash" && <PayInCash/>}
            {cart.paymentMethod == "qr" && <PayInQr/>}
        </div>
    );
};

export default Home;