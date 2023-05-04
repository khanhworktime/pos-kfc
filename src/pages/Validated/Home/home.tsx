import CategoryList from "./Menu/categoryList.tsx";
import Receipt from "./Receipt/receipt.tsx";
import Cashier from "./Cashier/cashier.tsx";

const Home = () => {
    return (
        <div className={"flex gap-4 py-4 h-full"}>
            <CategoryList/>
            <Receipt/>
            <Cashier/>
        </div>
    );
};

export default Home;