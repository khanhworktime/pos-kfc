import {useDispatch, useSelector} from "react-redux";
import {clearCart, selectCart} from "../../../../store/reducers/cartReducers.ts";
import {motion} from "framer-motion";
import QRCode from "qrcode.react";
import {LegacyRef, useCallback, useEffect, useMemo, useRef, useState} from "react";
import useFetch, {fetchProps} from "../../../../Hooks/useFetch.ts";
import LoadingCover from "../../../../components/LoadingCover/loadingCover.tsx";
import {useReactToPrint} from "react-to-print";
import {ComponentToPrint} from "../../../../components/ComponentToPrint/componentToPrint.tsx";
import IFood from "../../../../interfaces/foodInterface.ts";
import IReceipt from "../../../../interfaces/receiptInterface.ts";


const PayInQr = () => {
    const cart = useSelector(selectCart)
    const dispatch  =useDispatch()

    const [fetchProps, setFetch] = useState<fetchProps>({
        method: "get",
        path: "/",
        fetchFor: "connect"
    })
    const {data, isLoading, isError} = useFetch(fetchProps);

    const qrValue = useMemo(()=>{
        return `2|99|0822223471|Mai Van Trong Nghia||0|0|${cart.subtotal}||transfer_myqr`
    }, [cart])

    const componentRef:LegacyRef<ComponentToPrint> = useRef(null);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current
  }, [componentRef.current]);


    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        onAfterPrint: ()=> {
            dispatch(clearCart())
        }
    })
    const confirmHandler = ()=> {
        setFetch({
            method: "post",
            path: "/sale/cart",
            fetchFor: "checkout",
            sendData: {
                foods: cart.items,
                cartId: cart.id,
                paymentMethod: cart.paymentMethod
            }
        })

        handlePrint();
    }
    const template:IReceipt = {
        state: "paid",
        paymentMethod: cart.paymentMethod,
        foods: cart.items,
        total: cart.subtotal
    }

    return (
        <motion.div
            className={"flex-col gap-4 flex-grow relative justify-center items-center"}
            animate={{
                visibility: cart.state == "checkout" ? "visible" : "hidden",
                opacity: cart.state == "checkout" ? 1 : 0,
                display: cart.state =="checkout" ? "flex" : "none"
        }}>
            <LoadingCover visible={isLoading}/>
            <div className={"hidden"}>
                <ComponentToPrint receipt={template} ref={componentRef}/>
            </div>
            <div className={"p-3 rounded bg-white shadow"}>
                <h3 className={"text-center"}>Scan to Pay</h3>
                <QRCode value={qrValue} id={"qrcode"} size={300} level={"H"}/>
                <button className={"bg-green-600 text-white rounded w-full mt-6 p-6 text-center text-2xl"}
                    onClick={confirmHandler}
                >
                    Confirm Paid
                </button>
            </div>
        </motion.div>
    );
};

export default PayInQr;