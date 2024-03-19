import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useParse } from "../../context/parse";
import { ClipLoader } from "react-spinners";
import Input from "../Input/Input";
import { Object, Query } from "parse";
import { toast } from "react-toastify";

const EditOrder = () => {
    const param = useParams();
    const Parse = useParse();
    const [selectedOrder, setselectedOrder] = useState<Order>();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            setloading(true);
            const parseQuery = new Parse.Query("Orders");

            parseQuery.equalTo("objectId", param.id);

            setselectedOrder((await parseQuery.find())[0]);
            setloading(false);
        };
        fetchOrder();
    }, []);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        try {
            setloading(true);
            const query: Query = new Parse.Query("Orders");
            const order: Object = await query.get(`${selectedOrder?.id}`);

            const formdata = new FormData(e.target as any);
            order.set("orderName", formdata.get("orderName"));
            order.set("orderDetails", formdata.get("orderDetails"));
            order.set("Price", Number(formdata.get("Price")));

            const result = await order.save();
            setselectedOrder(result);
            console.log("Order updated", result);
            toast.success("Ordered updated Successfully");
        } catch (error: any) {
            console.error("Error while creating Order: ", error);
        } finally {
            setloading(false);
        }
    };
    return (
        <>
            {selectedOrder && !loading ? (
                <div className="container">
                    {" "}
                    <div className="max-w-80 mx-auto">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-center items-center mt-6 gap-3"
                        >
                            {" "}
                            <Input
                                name="orderName"
                                type="text"
                                placeholder="Enter the order name"
                                id="orderName"
                                defaultValue={
                                    selectedOrder.attributes.orderName
                                }
                            />
                            <Input
                                name="orderDetails"
                                type="text"
                                id="orderDetails"
                                placeholder="Enter the order details"
                                defaultValue={
                                    selectedOrder.attributes.orderDetails
                                }
                            />
                            <Input
                                name="Price"
                                type="number"
                                id="orderPrice"
                                defaultValue={selectedOrder.attributes.Price}
                            />
                            <button className="bg-mainColor font-bold border-2 loginBtn  border-mainColor hover:bg-white  hover:text-mainColor/90 text-white  rounded-md  duration-300 w-full  transition-colors p-2  mt-4 ">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="h-screen w-full flex justify-center items-center">
                    <ClipLoader loading={loading} />
                </div>
            )}
        </>
    );
};

export default EditOrder;
