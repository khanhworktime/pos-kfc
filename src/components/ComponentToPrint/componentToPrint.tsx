import * as React from "react";
import {foodListProps} from "../../pages/Validated/Home/Menu/foodList.tsx";
import IFood from "../../interfaces/foodInterface.ts";
import IReceipt from "../../interfaces/receiptInterface.ts";
import {LegacyRef} from "react";

type propsType = {
    receipt: IReceipt,
    ref: LegacyRef<ComponentToPrint>;
}
export class ComponentToPrint extends React.Component<propsType> {
    private ref: LegacyRef<ComponentToPrint> = React.createRef();
  constructor(props: propsType) {
    super(props);
    this.state = {receipt: props.receipt};
    this.ref = props.ref
  }


  render() {
    return (
      <div className="relativeCSS">
        <style type={"text/css"} media={"print"}>
            {`
            @page { size: 2.16in; }
            #invoice-POS {
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding: 0.1in;
  width: 100%;
  background: #FFF;
}
#invoice-POS ::selection {
  background: #f31544;
  color: #FFF;
}
#invoice-POS ::moz-selection {
  background: #f31544;
  color: #FFF;
}
#invoice-POS h1 {
  font-size: 1.5em;
  color: #222;
}
#invoice-POS h2 {
  font-size: 0.9em;
}
#invoice-POS h3 {
  font-size: 1.2em;
  font-weight: 300;
  line-height: 2em;
}
#invoice-POS p {
  font-size: 0.7em;
  color: #666;
  line-height: 1.2em;
}
#invoice-POS #top, #invoice-POS #mid, #invoice-POS #bot {
  /* Targets all id with 'col-' */
  border-bottom: 1px solid #EEE;
}
#invoice-POS #bot {
  min-height: 50px;
}
#invoice-POS .info {
  display: block;
  margin-left: 0;
}
#invoice-POS .title {
  float: right;
}
#invoice-POS .title p {
  text-align: right;
}
#invoice-POS table {
  width: 100%;
  border-collapse: collapse;
}
#invoice-POS .tabletitle {
  font-size: 0.5em;
  background: #EEE;
}
#invoice-POS .service {
  border-bottom: 1px solid #EEE;
}
#invoice-POS .item {
  width: 24mm;
}
#invoice-POS .itemtext {
  font-size: 0.5em;
}
#invoice-POS #legalcopy {
  margin-top: 5mm;
}`}
        </style>
          
  <div id="invoice-POS">
    
    <center id="top">
        <div className="info">
            <h2>KFC Chicken</h2>
        </div>
    </center>
    
    <div id="mid">
      <div className="info">
        <p>Contact Info</p>
        <p> 
            Address : Hoc Mon<br/>
            Email   : kfc.demo@gmail.com<br/>
            Phone   : (+84) 372 646 539<br/>
        </p>
      </div>
    </div>
    
    <div id="bot">
        <div id="table">
            <table>
                <tbody>
                <tr className="tabletitle">
                    <td className="item"><p>Item</p></td>
                    <td className="Hours"><p>Qty</p></td>
                    <td className="Rate"><p>Sub Total</p></td>
                </tr>
                {
                    this.props.receipt.foods.map((f)=>{
                        return (<tr className="service">
                                    <td className="tableitem"><p className="itemtext">{f.name}</p></td>
                                    <td className="tableitem"><p className="itemtext">{f.amount}</p></td>
                                    <td className="tableitem"><p className="itemtext">{f.sale_price.toLocaleString(undefined, {maximumFractionDigits: 2})} VND</p></td>
                                </tr>)
                    })
                }
                <tr className="tabletitle">
                    <td></td>
                    <td className="Rate"><p className={"text-md font-semibold"}>Total</p></td>
                    <td className="payment"><p className={"text-md"}>{this.props.receipt.total.toLocaleString(undefined, {maximumFractionDigits: 2})}</p></td>
                </tr>
                <tr className="tabletitle">
                    <td></td>
                    <td className="Rate"><p className={"text-md font-semibold"}>Payment method</p></td>
                    <td className="payment"><p className={"text-md"}>{this.props.receipt.paymentMethod == "qr" ? "Momo" : "Cash"}</p></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div id="legalcopy">
            <p className="legal text-sm"><strong>Thank you for your business!</strong></p>
        </div>
    </div>
    </div>
      </div>
    );
  }


}

export const FunctionalComponentToPrint = React.forwardRef((props:propsType, ref:LegacyRef<ComponentToPrint>) => {
  // eslint-disable-line max-len
  return <ComponentToPrint ref={ref} receipt={props.receipt}/>;
});
