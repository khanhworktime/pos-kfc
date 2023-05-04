import {useDispatch, useSelector} from "react-redux";
import {checkoutCart, pendingCart, selectCart} from "../../../../store/reducers/cartReducers.ts";
import {motion} from "framer-motion";
import IFood from "../../../../interfaces/foodInterface.ts";
import {BsCashCoin, BsFillCreditCard2FrontFill, BsQrCodeScan} from "react-icons/bs";
import {useState} from "react";

interface foodItemReceiptRenderProp {index: number, item: IFood}

const FoodItem = (props: foodItemReceiptRenderProp) => {
    const {index, item} = props
    return (
        <div className={"flex flex-row gap-2 justify-between w-full py-4 bg-sky-50 pr-4 pl-2 rounded transition-all border border-sky-50 hover:border-sky-400 active:border-sky-600 active:border-[5px]"}>
            <div className={"flex flex-row gap-2 "}>
            <div className={"rounded-full text-sky-700 text-sm font-semibold flex justify-center w-[30px] aspect-square items-center bg-blue-200"}>{index}</div>
            <div className={"font-semibold text-md"}>{item.name}</div>
            <div className={"font-semibold text-md text-sky-600"}>x{item.amount}</div>
            </div>
            <div className={"text-md font-semibold text-right"}>{(item.sale_price*item.amount).toLocaleString(undefined, {minimumFractionDigits: 2})} VND</div>
        </div>
    )
}

const Receipt = () => {
    const cart = useSelector(selectCart)
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "qr">("cash")

    return (
        <motion.div className={"bg-white h-full flex-col justify-between sticky top-0 pt-4 transition-all rounded border shadow-xl"}
            animate={{width: cart.state == "ready" ? "0" : "40vw", opacity: cart.state == "ready" ? "0" : "1", display: cart.state == "ready" ? "none" : "flex"}}
        >
            <div className={"receipt-top flex-grow-0 flex flex-col gap-4 h-[65%] relative px-2"}>
                <h2 className={"text-center"}>Receipt</h2>
                <hr/>
                <motion.div className={"flex flex-col gap-2 overflow-y-scroll h-[90%] px-2 py-4"}>
                    {
                        !cart.isEmpty && cart.items.map((food, i)=>(<FoodItem key={"receiptItem"+i} index={i+1} item={food}/>))
                    }
                </motion.div>
                <hr/>
            </div>

            <div className={"receipt-bottom flex flex-col justify-between flex-grow"}>
                <div className={"my-4 px-4"}>
                    <div className={"flex justify-between px-2"}>
                        <p className={"text-xl"}>Subtotal</p>
                        <p className={"text-xl"}>{(cart.subtotal).toLocaleString(undefined, {minimumFractionDigits: 2})} VND</p>
                    </div>
                    <div className={"flex justify-between px-2"}>
                        <p className={"text-2xl"}>Total</p>
                        <p className={"text-2xl font-semibold"}>{(cart.subtotal).toLocaleString(undefined, {minimumFractionDigits: 2})} VND</p>
                    </div>
                </div>
                <div className={"payment bg-blue-700 p-6 text-white rounded-b"}>
                    <em>Payment method</em>
                    <div className={"grid-cols-3 grid gap-2 text-xl my-2"}>
                        <div
                            className={"cursor-pointer"}
                            onClick={()=>setPaymentMethod("cash")}>
                            <div className={`p-3 flex-all-center rounded border-white border hover:bg-blue-50 hover:text-blue-400 transition-all ${paymentMethod == "cash" ? " bg-white text-blue-500 " : " "}`}>
                                <BsCashCoin/>
                            </div>
                            <motion.p className={"text-sm text-center"}
                                animate={{textDecoration: paymentMethod == "cash" ? "underline" : "none", fontWeight: paymentMethod == "cash" ? 600 : 300}}
                            >Cash</motion.p>
                        </div>
                        <div
                            className={"cursor-pointer"}
                            onClick={()=>setPaymentMethod("card")}>
                            <div className={`p-3 flex-all-center rounded border-white border hover:bg-blue-50 hover:text-blue-400 transition-all ${paymentMethod == "card" ? " bg-white text-blue-500 " : " "}`}>
                                <BsFillCreditCard2FrontFill/>
                            </div>
                            <motion.p className={"text-sm text-center"}
                                animate={{textDecoration: paymentMethod == "card" ? "underline" : "none", fontWeight: paymentMethod == "card" ? 600 : 300}}
                            >Card</motion.p>
                        </div>
                        <div
                            className={"cursor-pointer"}
                            onClick={()=>setPaymentMethod("qr")}>
                            <div className={`p-3 flex-all-center rounded border-white border hover:bg-blue-50 hover:text-blue-400 transition-all ${paymentMethod == "qr" ? " bg-white text-blue-500 " : " "}`}>
                                <BsQrCodeScan/>
                            </div>
                            <motion.p className={"text-sm text-center"}
                                animate={{textDecoration: paymentMethod == "qr" ? "underline" : "none", fontWeight: paymentMethod == "qr" ? 600 : 300}}
                            >E-Wallet</motion.p>
                        </div>
                    </div>
                    <motion.button
                        onClick={()=> {
                            if(cart.state == "pending") dispatch(checkoutCart(paymentMethod))
                            if(cart.state == "checkout") dispatch(pendingCart())
                        }}
                        className={"w-full bg-blue-100 hover:bg-white text-blue-900 p-3 mt-2 rounded text-xl transition-all"}>
                        {cart.state == "checkout" ? "Return" : "Place order"}</motion.button>
                </div>
            </div>

        </motion.div>
    );
};

export default Receipt;