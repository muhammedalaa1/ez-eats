import { FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useParse } from "../../context/parse";
import Input from "../Input/Input";
import { toast } from "react-toastify";
const index = () => {
    const [loading, setloading] = useState(false);
    const Parse = useParse();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentUser = Parse.User.current();
        if (loading) return;
        setloading((prev) => !prev);
        const order = new Parse.Object("Orders");
        const formdata = new FormData(e.target as any);
        order.set("orderName", formdata.get("orderName"));
        order.set("orderDetails", formdata.get("orderDetails"));
        order.set("Price", Number(formdata.get("Price")));
        order.set("userName", currentUser.attributes.username);
        order.set("userId", currentUser.id);
        try {
            await order.save();
            toast.success("Order Created Succesfully");
        } catch (error: any) {
            toast.error("error happened");
        } finally {
            setloading(false);
        }
    };
    return (
        <>
            {loading ? (
                <div className="h-screen w-full flex justify-center items-center">
                    <ClipLoader loading={loading} />
                </div>
            ) : (
                <div className="container">
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
                            />
                            <Input
                                name="orderDetails"
                                type="text"
                                id="orderDetails"
                                placeholder="Enter the order details"
                            />
                            <Input
                                name="Price"
                                type="number"
                                defaultValue={0}
                                id="orderPrice"
                            />
                            <button className="bg-mainColor font-bold border-2 loginBtn  border-mainColor hover:bg-white  hover:text-mainColor/90 text-white  rounded-md  duration-300 w-full  transition-colors p-2  mt-4 ">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default index;
